import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import PocketBase from 'pocketbase';
import { createHmac, timingSafeEqual } from 'crypto';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { processOrder, registerDARoutes } from './da-middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: process.env.WEBHOOK_ENV_PATH || path.join(__dirname, '..', '.env.local') });

const app = express();

// SePay gửi raw JSON, cần giữ raw body để verify HMAC
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// === Config ===
const PORT = process.env.SEPAY_SERVER_PORT || 4000;
const PB_URL = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';
const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@vmst.host';
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'admin@!@#';
const SEPAY_SECRET_KEY = process.env.SEPAY_SECRET_KEY || '';

// === SMTP Config ===
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@vmst.host';

let mailTransporter = null;
if (SMTP_USER && SMTP_PASS) {
  mailTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  console.log(`[mail] SMTP configured: ${SMTP_HOST}:${SMTP_PORT} (${SMTP_USER})`);
} else {
  console.log('[mail] SMTP not configured — confirmation emails disabled');
}

// Load email template
let paymentConfirmedHtml = '';
(async () => {
  try {
    paymentConfirmedHtml = await fs.readFile(path.join(__dirname, '..', 'public', 'email-template-payment-confirmed.html'), 'utf-8');
    console.log('[mail] Payment confirmed template loaded');
  } catch {
    console.warn('[mail] Could not load email-template-payment-confirmed.html');
  }
})();

async function sendPaymentConfirmationEmail(customerEmail) {
  if (!mailTransporter || !customerEmail || !paymentConfirmedHtml) {
    console.log('[mail] Skip email:', !mailTransporter ? 'no SMTP' : !customerEmail ? 'no email' : 'no template');
    return;
  }
  try {
    await mailTransporter.sendMail({
      from: `"VMST Host" <${SMTP_FROM}>`,
      to: customerEmail,
      subject: 'Xác nhận thanh toán thành công - VMST Host',
      html: paymentConfirmedHtml,
    });
    console.log(`[mail] Confirmation sent to ${customerEmail}`);
  } catch (err) {
    console.error(`[mail] Failed to send to ${customerEmail}:`, err.message);
  }
}

// === PocketBase Admin Auth ===
async function getAdminPb() {
  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);
  try {
    await pb.collection('_superusers').authWithPassword(PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD);
    console.log('[pb] Superuser auth OK');
  } catch {
    try {
      await pb.admins.authWithPassword(PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD);
      console.log('[pb] Legacy admin auth OK');
    } catch (err) {
      console.error('[pb] All admin auth failed:', err.message);
    }
  }
  return pb;
}

// === HMAC Verification ===
function verifySePaySignature(rawBody, receivedChecksum) {
  if (!SEPAY_SECRET_KEY) return true; // skip in dev
  try {
    const expected = createHmac('sha256', SEPAY_SECRET_KEY).update(rawBody).digest('hex');
    return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(receivedChecksum, 'hex'));
  } catch {
    return false;
  }
}

// === Extract order code từ nội dung CK (regex) ===
function extractOrderCode(content) {
  const trimmed = content.trim().toUpperCase();
  if (/^[A-Z0-9]{4,20}$/.test(trimmed)) return trimmed;

  const parts = trimmed.split(/[\s.]+/);
  for (const part of parts) {
    if (/^[A-Z0-9]{6}$/.test(part) && /[A-Z]/.test(part) && /[0-9]/.test(part)) {
      if (/^MBVCB|^CT$|^GD$|^ACB$/.test(part)) continue;
      return part;
    }
  }

  const match = trimmed.match(/\b([A-Z][A-Z0-9]{3,7})\b/);
  if (match && !/^MBVCB|^CT$|^GD$/.test(match[1])) return match[1];

  return trimmed;
}

// === Health check ===
app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'sepay-webhook-server', time: new Date().toISOString() });
});

// === SePay Webhook — endpoint chính ===
app.post('/api/sepay', async (req, res) => {
  try {
    const rawBody = JSON.stringify(req.body);
    const checksum = req.headers['checksum'] || '';

    if (checksum && !verifySePaySignature(rawBody, checksum)) {
      console.warn('[SePay] Invalid signature');
      return res.status(401).json({ ok: false, error: 'invalid_signature' });
    }

    const payload = req.body;
    console.log('[SePay] Received:', JSON.stringify(payload));

    const amount = Number(payload.transferAmount || payload.amount || 0);
    const content = String(payload.content || payload.description || '').trim();
    const transactionId = String(payload.id || payload.transaction_id || payload.referenceCode || '');

    if (!content) return res.status(400).json({ ok: false, error: 'empty_content' });
    if (!amount || amount <= 0) {
      console.log('[SePay] Invalid amount:', amount);
      return res.status(400).json({ ok: false, error: 'invalid_amount' });
    }

    const pb = await getAdminPb();
    const contentUpper = content.toUpperCase();
    let orderRecord = null;
    let matchedCode = '';

    // Cách 1: Regex extraction
    const extracted = extractOrderCode(content);
    console.log(`[SePay] Extracted: "${extracted}"`);

    if (extracted) {
      try {
        orderRecord = await pb.collection('orders').getFirstListItem(`ma_don_hang = "${extracted}"`);
        matchedCode = extracted;
      } catch {
        try {
          orderRecord = await pb.collection('orders').getOne(extracted);
          matchedCode = extracted;
        } catch { orderRecord = null; }
      }
    }

    // Cách 2: Fallback — substring match với tất cả đơn chờ thanh toán
    if (!orderRecord) {
      console.log('[SePay] Regex failed, trying substring match...');
      try {
        const pending = await pb.collection('orders').getList(1, 200, {
          filter: 'thanh_toan = "cho_thanh_toan"',
        });
        for (const order of pending.items) {
          const code = (order.ma_don_hang || '').toUpperCase();
          if (code && contentUpper.includes(code)) {
            orderRecord = order;
            matchedCode = code;
            console.log(`[SePay] Substring match: "${code}"`);
            break;
          }
        }
      } catch (err) {
        console.error('[SePay] Error querying pending orders:', err.message);
      }
    }

    if (!orderRecord) {
      console.log(`[SePay] Order not found for: "${content}"`);
      return res.status(404).json({ ok: false, error: 'order_not_found', content });
    }

    console.log(`[SePay] Found order: ${orderRecord.id}, ma_don_hang: ${orderRecord.ma_don_hang}, gia_tri: ${orderRecord.gia_tri}`);

    // Check số tiền
    const orderAmount = parseFloat(String(orderRecord.gia_tri || '0').replace(/[^\d.]/g, ''));

    if (orderAmount > 0 && amount < orderAmount) {
      console.log(`[SePay] Amount mismatch: got ${amount}, expected ${orderAmount}`);
      await pb.collection('orders').update(orderRecord.id, {
        sepay: JSON.stringify({ amount, content, transaction_id: transactionId, warning: 'amount_mismatch', confirmed_at: new Date().toISOString() }),
        ghi_chu_noi_bo: `${orderRecord.ghi_chu_noi_bo || ''}\n[SePay] Nhận ${amount}đ (thiếu, cần ${orderAmount}đ) | TX: ${transactionId} | ${new Date().toISOString()}`.trim()
      });
      return res.json({ ok: true, orderCode: matchedCode, warning: 'amount_mismatch', received: amount, expected: orderAmount });
    }

    // Update đơn → đã thanh toán (KHÔNG set trang_thai_su_dung — để DA middleware xử lý)
    await pb.collection('orders').update(orderRecord.id, {
      thanh_toan: 'da_thanh_toan',
      sepay: JSON.stringify({ amount, content, transaction_id: transactionId, confirmed_at: new Date().toISOString() }),
      ghi_chu_noi_bo: `${orderRecord.ghi_chu_noi_bo || ''}\n[SePay] Xác nhận ${amount}đ | TX: ${transactionId} | ${new Date().toISOString()}`.trim()
    });

    console.log(`[SePay] Order ${matchedCode} → da_thanh_toan`);

    // Auto-provision DirectAdmin hosting (background, không block response)
    processOrder(orderRecord.id, pb).catch(err => {
      console.error(`[DA] Auto-provision failed for ${matchedCode}:`, err.message);
    });

    // Gửi email xác nhận thanh toán cho khách
    const ghiChu = orderRecord.ghi_chu_noi_bo || '';
    const emailMatch = ghiChu.match(/Email:\s*([^\s|]+)/i);
    const customerEmail = emailMatch ? emailMatch[1].trim() : '';
    sendPaymentConfirmationEmail(customerEmail).catch(() => {});

    return res.json({ ok: true, orderCode: matchedCode, amount, transactionId, updated: true });
  } catch (err) {
    console.error('[SePay] Error:', err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
});

// === Register DirectAdmin middleware routes ===
registerDARoutes(app, getAdminPb);

// === Start ===
app.listen(PORT, () => {
  console.log(`[sepay-server] Running on http://localhost:${PORT}`);
  console.log(`[sepay-server] PB_URL: ${PB_URL}`);
  console.log(`[sepay-server] Webhook: POST /api/sepay`);
  console.log(`[sepay-server] Health:  GET /health`);
});
