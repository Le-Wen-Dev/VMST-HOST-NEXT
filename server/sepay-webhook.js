import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import PocketBase from 'pocketbase';
import { createHmac } from 'crypto';
import nodemailer from 'nodemailer';

// Load env from .env (server-side). You can set WEBHOOK_ENV_PATH to choose another file.
dotenv.config({ path: process.env.WEBHOOK_ENV_PATH || '.env' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const PORT = process.env.PORT || 4000;
const PB_URL = process.env.PB_URL || process.env.VITE_PB_URL || 'http://127.0.0.1:8090';
const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || process.env.VITE_CONTACT_ADMIN_EMAIL || 'admin@vmst.host';
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || process.env.VITE_CONTACT_ADMIN_PASSWORD || 'admin@!@#';
const SEPAY_SECRET_KEY = process.env.SEPAY_SECRET_KEY || process.env.VITE_SEPAY_SECRET_KEY || '';
const ADMIN_NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || 'lequelcm@gmail.com';
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || 0);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

function generateSignature(data) {
  // Build canonical string: key=value&key=value sorted by keys
  const sortedKeys = Object.keys(data).filter(k => data[k] !== undefined && data[k] !== null).sort();
  const signatureString = sortedKeys.map(key => `${key}=${data[key]}`).join('&');
  if (!SEPAY_SECRET_KEY) return '';
  return createHmac('sha256', SEPAY_SECRET_KEY).update(signatureString).digest('hex');
}

async function ensureAdmin(pb) {
  if (pb.authStore.isValid) return;
  await pb.admins.authWithPassword(PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD);
}

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'sepay-webhook', time: new Date().toISOString() });
});

// Simple email notifier for new orders
app.post('/api/notify-new-order', async (req, res) => {
  try {
    const { to, subject, text } = req.body || {};
    const target = to || ADMIN_NOTIFY_EMAIL;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.log('[notify-new-order] SMTP not configured. Printing email to console instead.');
      console.log('To:', target);
      console.log('Subject:', subject);
      console.log('Text:\n', text);
      return res.json({ ok: true, simulated: true });
    }
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465, false for other ports
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.verify();
    await transporter.sendMail({ from: SMTP_USER, to: target, subject, text });
    return res.json({ ok: true });
  } catch (err) {
    console.error('[notify-new-order] failed:', err);
    return res.status(500).json({ ok: false, error: 'email_failed' });
  }
});

app.post('/api/payments/webhook', async (req, res) => {
  try {
    const payload = req.body || {};
    const { signature, ...data } = payload;

    // Verify signature (if secret is provided)
    if (SEPAY_SECRET_KEY) {
      const expected = generateSignature(data);
      if (!signature || signature !== expected) {
        return res.status(400).json({ ok: false, error: 'invalid_signature' });
      }
    }

    const status = String(data.status || '').toUpperCase();
    const orderId = String(data.orderId || '').trim();
    const amount = data.amount;

    if (!orderId) {
      return res.status(400).json({ ok: false, error: 'missing_orderId' });
    }

    // Update order in PocketBase
    const pb = new PocketBase(PB_URL);
    pb.autoCancellation(false);
    await ensureAdmin(pb);

    let orderRecord = null;
    try {
      orderRecord = await pb.collection('orders').getFirstListItem(`ma_don_hang = "${orderId}"`);
    } catch (e) {
      try {
        orderRecord = await pb.collection('orders').getOne(orderId);
      } catch (_) {
        orderRecord = null;
      }
    }

    if (!orderRecord) {
      return res.status(404).json({ ok: false, error: 'order_not_found', orderId });
    }

    // Only confirm when SUCCESS
    if (status === 'SUCCESS') {
      await pb.collection('orders').update(orderRecord.id, {
        thanh_toan: 'da_thanh_toan',
        trang_thai_su_dung: 'dang_su_dung',
        ghi_chu_noi_bo: `Auto-updated via SePay webhook at ${new Date().toISOString()} | amount=${amount}`
      });
    }

    return res.json({ ok: true, orderId, status, updated: status === 'SUCCESS' });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
});

app.listen(PORT, () => {
  console.log(`[sepay-webhook] listening on http://localhost:${PORT}`);
  console.log('Health check: GET /health');
  console.log('Webhook endpoint: POST /api/payments/webhook');
});