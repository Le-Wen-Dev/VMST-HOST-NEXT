import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import PocketBase from 'pocketbase';
import { createHmac } from 'crypto';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from .env (server-side). You can set WEBHOOK_ENV_PATH to choose another file.
dotenv.config({ path: process.env.WEBHOOK_ENV_PATH || '.env' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Student Voucher API
const JSON_FILE_PATH = path.join(__dirname, 'student-vouchers.json');

async function readStudentList() {
  try {
    const data = await fs.readFile(JSON_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    const defaultData = {
      voucher_code: 'VOVANMY2026',
      product_id: '',
      students: []
    };
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(defaultData, null, 2), 'utf8');
    return defaultData;
  }
}

async function writeStudentList(data) {
  await fs.writeFile(JSON_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// GET: Kiểm tra email có trong danh sách và đã sử dụng chưa
app.get('/api/student-vouchers/check/:email', async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).toLowerCase().trim();
    const data = await readStudentList();
    
    const student = data.students.find(s => s.email.toLowerCase() === email);
    
    if (!student) {
      return res.json({ 
        allowed: false, 
        used: false, 
        message: 'Email không nằm trong danh sách sinh viên được phép' 
      });
    }
    
    res.json({
      allowed: true,
      used: student.used || false,
      usedAt: student.usedAt || null,
      orderId: student.orderId || null,
      message: student.used ? 'Email này đã sử dụng voucher' : 'Email hợp lệ và chưa sử dụng'
    });
  } catch (error) {
    console.error('Error checking student email:', error);
    res.status(500).json({ error: 'Không thể kiểm tra email' });
  }
});

// POST: Đánh dấu email đã sử dụng voucher
app.post('/api/student-vouchers/mark-used', async (req, res) => {
  try {
    const { email, orderId } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email là bắt buộc' });
    }
    
    const normalizedEmail = email.toLowerCase().trim();
    const data = await readStudentList();
    
    const studentIndex = data.students.findIndex(s => s.email.toLowerCase() === normalizedEmail);
    
    if (studentIndex === -1) {
      return res.status(404).json({ error: 'Email không nằm trong danh sách sinh viên' });
    }
    
    const student = data.students[studentIndex];
    
    if (student.used) {
      return res.status(400).json({ error: 'Email này đã sử dụng voucher rồi' });
    }
    
    // Đánh dấu đã sử dụng
    data.students[studentIndex] = {
      ...student,
      used: true,
      usedAt: new Date().toISOString(),
      orderId: orderId || null
    };
    
    await writeStudentList(data);
    
    res.json({ 
      success: true, 
      message: 'Đã đánh dấu email đã sử dụng voucher',
      student: data.students[studentIndex]
    });
  } catch (error) {
    console.error('Error marking student as used:', error);
    res.status(500).json({ error: 'Không thể đánh dấu email đã sử dụng' });
  }
});

// GET: Lấy danh sách đầy đủ (admin only)
app.get('/api/student-vouchers/list', async (req, res) => {
  try {
    const data = await readStudentList();
    res.json(data);
  } catch (error) {
    console.error('Error reading student list:', error);
    res.status(500).json({ error: 'Không thể đọc danh sách sinh viên' });
  }
});

// POST: Thêm email vào danh sách (admin only)
app.post('/api/student-vouchers/add', async (req, res) => {
  try {
    const { emails } = req.body;
    
    if (!Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: 'Danh sách email không hợp lệ' });
    }
    
    const data = await readStudentList();
    
    const newEmails = emails
      .map(e => e.toLowerCase().trim())
      .filter(e => e && e.includes('@'))
      .filter(e => !data.students.some(s => s.email.toLowerCase() === e));
    
    newEmails.forEach(email => {
      data.students.push({
        email,
        used: false,
        usedAt: null,
        orderId: null
      });
    });
    
    await writeStudentList(data);
    
    res.json({ 
      success: true, 
      added: newEmails.length,
      message: `Đã thêm ${newEmails.length} email vào danh sách`
    });
  } catch (error) {
    console.error('Error adding students:', error);
    res.status(500).json({ error: 'Không thể thêm email vào danh sách' });
  }
});

// GET: Lấy thống kê
app.get('/api/student-vouchers/stats', async (req, res) => {
  try {
    const data = await readStudentList();
    const total = data.students.length;
    const used = data.students.filter(s => s.used).length;
    const available = total - used;
    
    res.json({
      total,
      used,
      available,
      voucher_code: data.voucher_code,
      product_id: data.product_id
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Không thể lấy thống kê' });
  }
});

// Import student voucher API
const studentVoucherRouter = require('./student-voucher-api');
app.use('/', studentVoucherRouter);

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

      // Kiểm tra nếu đơn hàng có sử dụng voucher sinh viên VOVANMY2026
      const ghiChu = orderRecord.ghi_chu_noi_bo || '';
      if (ghiChu.includes('VOVANMY2026')) {
        // Lấy email từ ghi chú
        const emailMatch = ghiChu.match(/Email:\s*([^\s|]+)/i);
        const customerEmail = emailMatch ? emailMatch[1].trim() : null;
        
        if (customerEmail) {
          try {
            // Đánh dấu email đã sử dụng voucher
            const data = await readStudentList();
            const normalizedEmail = customerEmail.toLowerCase().trim();
            const studentIndex = data.students.findIndex(s => s.email.toLowerCase() === normalizedEmail);
            
            if (studentIndex !== -1 && !data.students[studentIndex].used) {
              data.students[studentIndex] = {
                ...data.students[studentIndex],
                used: true,
                usedAt: new Date().toISOString(),
                orderId: orderId
              };
              await writeStudentList(data);
              console.log(`[student-voucher] Marked email ${customerEmail} as used for order ${orderId}`);
            }
          } catch (err) {
            console.error('[student-voucher] Error marking email as used:', err);
            // Không block webhook nếu lỗi
          }
        }
      }
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