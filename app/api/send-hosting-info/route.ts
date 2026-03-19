import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';
import path from 'path';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@vmst.host';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, maDonHang, tenGoi, ngayDatHang, ngayHetHan, hostUrl, hostUsername, hostPassword, hostDomain, thanhToan } = body;

    if (!to || !maDonHang) {
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
    }
    if (!SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({ ok: false, error: 'smtp_not_configured' }, { status: 500 });
    }

    // Load template
    const templatePath = path.join(process.cwd(), 'public', 'email-template-hosting-info.html');
    let html = await readFile(templatePath, 'utf-8');

    // Payment status display
    const paymentLabel = thanhToan === 'da_thanh_toan' ? 'Đã thanh toán' : 'Chờ thanh toán';
    const paymentBg = thanhToan === 'da_thanh_toan' ? '#f0fff4' : '#fffff0';
    const paymentColor = thanhToan === 'da_thanh_toan' ? '#276749' : '#975a16';

    // Replace placeholders
    html = html
      .replace(/\{\{MA_DON_HANG\}\}/g, maDonHang || '')
      .replace(/\{\{TEN_GOI\}\}/g, tenGoi || '')
      .replace(/\{\{NGAY_DAT_HANG\}\}/g, ngayDatHang || '')
      .replace(/\{\{NGAY_HET_HAN\}\}/g, ngayHetHan || '')
      .replace(/\{\{HOST_URL\}\}/g, hostUrl || '')
      .replace(/\{\{HOST_USERNAME\}\}/g, hostUsername || '')
      .replace(/\{\{HOST_PASSWORD\}\}/g, hostPassword || '')
      .replace(/\{\{HOST_DOMAIN\}\}/g, hostDomain || '')
      .replace(/\{\{THANH_TOAN\}\}/g, paymentLabel)
      .replace(/\{\{THANH_TOAN_BG\}\}/g, paymentBg)
      .replace(/\{\{THANH_TOAN_COLOR\}\}/g, paymentColor);

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"VMST Host" <${SMTP_FROM}>`,
      to,
      subject: `Thông tin đơn hàng ${maDonHang} - VMST Host`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[send-hosting-info] Error:', err.message);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
