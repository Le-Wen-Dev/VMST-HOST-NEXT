import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const ADMIN_NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || 'lequelcm@gmail.com';
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || 0);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text } = await req.json();
    const target = to || ADMIN_NOTIFY_EMAIL;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.log('[notify-new-order] SMTP not configured. Printing to console.');
      console.log('To:', target, 'Subject:', subject);
      return NextResponse.json({ ok: true, simulated: true });
    }
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.verify();
    await transporter.sendMail({ from: SMTP_USER, to: target, subject, text });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[notify-new-order] failed:', err);
    return NextResponse.json({ ok: false, error: 'email_failed' }, { status: 500 });
  }
}
