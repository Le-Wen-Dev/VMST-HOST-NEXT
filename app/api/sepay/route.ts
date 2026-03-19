import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAdminPb } from '@/lib/pb-admin';

/**
 * SePay Webhook Handler
 *
 * Flow:
 * 1. Khách chuyển khoản với nội dung = mã đơn hàng (VD: DH12345)
 * 2. SePay gửi webhook POST với payload: { amount, content, transaction_id, ... }
 * 3. Server verify HMAC → parse nội dung CK → tìm đơn → check số tiền → update trạng thái
 *
 * Webhook URL cần đăng ký trên SePay: https://vmst.host/api/sepay
 */

function verifySePaySignature(rawBody: string, receivedChecksum: string): boolean {
  const secret = process.env.SEPAY_SECRET_KEY;
  if (!secret) return true; // skip verification in dev if not configured
  try {
    const expected = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(receivedChecksum, 'hex')
    );
  } catch {
    return false;
  }
}

function extractOrderCode(content: string): string {
  const trimmed = content.trim().toUpperCase();

  // Pattern 1: Toàn bộ content là mã đơn (4-20 ký tự alphanumeric)
  if (/^[A-Z0-9]{4,20}$/.test(trimmed)) {
    return trimmed;
  }

  // Pattern 2: Tìm mã đơn 6 ký tự trong nội dung ngân hàng
  // VD: "MBVCB.13423758841.620144.TZ4YJ9.CT tu ..." → TZ4YJ9
  // Mã đơn hàng luôn là 6 ký tự uppercase alphanumeric
  const parts = trimmed.split(/[\s.]+/);
  for (const part of parts) {
    // Mã đơn hàng: đúng 6 ký tự, có cả chữ và số, không phải pattern ngân hàng
    if (/^[A-Z0-9]{6}$/.test(part) && /[A-Z]/.test(part) && /[0-9]/.test(part)) {
      // Bỏ qua các pattern ngân hàng phổ biến
      if (/^MBVCB|^CT$|^GD$|^ACB$/.test(part)) continue;
      return part;
    }
  }

  // Pattern 3: Fallback - tìm bất kỳ chuỗi 4-8 ký tự alphanumeric
  const match = trimmed.match(/\b([A-Z][A-Z0-9]{3,7})\b/);
  if (match) {
    const candidate = match[1];
    if (!/^MBVCB|^CT$|^GD$/.test(candidate)) {
      return candidate;
    }
  }

  return trimmed;
}

export async function POST(req: NextRequest) {
  try {
    // Đọc raw body để verify HMAC trước khi parse JSON
    const rawBody = await req.text();
    const checksum = req.headers.get('Checksum') || req.headers.get('checksum') || '';

    if (checksum && !verifySePaySignature(rawBody, checksum)) {
      console.warn('[SePay Webhook] Invalid signature');
      return NextResponse.json({ ok: false, error: 'invalid_signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    console.log('[SePay Webhook] Received payload:', JSON.stringify(payload));

    const amount = Number(payload.transferAmount || payload.amount || 0);
    const content = String(payload.content || payload.description || '').trim();
    const transactionId = String(payload.id || payload.transaction_id || payload.transactionId || payload.referenceCode || '');

    if (!content) {
      console.log('[SePay Webhook] Empty content, skipping');
      return NextResponse.json({ ok: false, error: 'empty_content' }, { status: 400 });
    }

    if (!amount || amount <= 0) {
      console.log('[SePay Webhook] Invalid amount:', amount);
      return NextResponse.json({ ok: false, error: 'invalid_amount' }, { status: 400 });
    }

    // Bước 1: Tìm đơn hàng — thử regex extraction trước, fallback sang substring match
    const pb = await getAdminPb();
    const contentUpper = content.toUpperCase();

    let orderRecord: any = null;
    let matchedCode = '';

    // Cách 1: Thử extract mã đơn bằng regex
    const extractedCode = extractOrderCode(content);
    console.log(`[SePay Webhook] Extracted code: "${extractedCode}" from content: "${content}"`);

    if (extractedCode) {
      try {
        orderRecord = await pb.collection('orders').getFirstListItem(
          `ma_don_hang = "${extractedCode}"`
        );
        matchedCode = extractedCode;
      } catch {
        try {
          orderRecord = await pb.collection('orders').getOne(extractedCode);
          matchedCode = extractedCode;
        } catch {
          orderRecord = null;
        }
      }
    }

    // Cách 2: Fallback — lấy tất cả đơn chờ thanh toán, check substring match
    if (!orderRecord) {
      console.log(`[SePay Webhook] Regex extraction failed, trying substring match against pending orders...`);
      try {
        const pendingOrders = await pb.collection('orders').getList(1, 200, {
          filter: `thanh_toan = "cho_thanh_toan"`,
        });
        for (const order of pendingOrders.items) {
          const code = (order.ma_don_hang || '').toUpperCase();
          if (code && contentUpper.includes(code)) {
            orderRecord = order;
            matchedCode = code;
            console.log(`[SePay Webhook] Substring match found: "${code}" in content`);
            break;
          }
        }
      } catch (err) {
        console.error('[SePay Webhook] Error querying pending orders:', err);
      }
    }

    if (!orderRecord) {
      console.log(`[SePay Webhook] Order not found for content: "${content}"`);
      return NextResponse.json({ ok: false, error: 'order_not_found', content }, { status: 404 });
    }

    console.log(`[SePay Webhook] Found order: ${orderRecord.id}, ma_don_hang: ${orderRecord.ma_don_hang}, gia_tri: ${orderRecord.gia_tri}`);

    // Bước 3: Check số tiền
    const orderAmount = parseFloat(String(orderRecord.gia_tri || '0').replace(/[^\d.]/g, ''));

    if (orderAmount > 0 && amount < orderAmount) {
      console.log(`[SePay Webhook] Amount mismatch: received ${amount}, expected ${orderAmount}`);
      // Vẫn ghi nhận giao dịch nhưng không auto-confirm nếu thiếu tiền
      await pb.collection('orders').update(orderRecord.id, {
        sepay: JSON.stringify({ amount, content, transaction_id: transactionId, warning: 'amount_mismatch', confirmed_at: new Date().toISOString() }),
        ghi_chu_noi_bo: `${orderRecord.ghi_chu_noi_bo || ''}\n[SePay] Nhận ${amount.toLocaleString('vi-VN')}đ (thiếu so với đơn ${orderAmount.toLocaleString('vi-VN')}đ) | TX: ${transactionId} | ${new Date().toISOString()}`.trim()
      });
      return NextResponse.json({
        ok: true,
        orderCode: matchedCode,
        warning: 'amount_mismatch',
        received: amount,
        expected: orderAmount,
        updated: false
      });
    }

    // Bước 4: Update trạng thái đơn hàng → đã thanh toán
    const sepayData = {
      amount,
      content,
      transaction_id: transactionId,
      confirmed_at: new Date().toISOString(),
    };

    await pb.collection('orders').update(orderRecord.id, {
      thanh_toan: 'da_thanh_toan',
      trang_thai_su_dung: 'dang_su_dung',
      sepay: JSON.stringify(sepayData),
      ghi_chu_noi_bo: `${orderRecord.ghi_chu_noi_bo || ''}\n[SePay] Xác nhận thanh toán ${amount.toLocaleString('vi-VN')}đ | TX: ${transactionId} | ${new Date().toISOString()}`.trim()
    });

    console.log(`[SePay Webhook] Order ${matchedCode} updated to da_thanh_toan`);

    // Kiểm tra voucher sinh viên VOVANMY2026
    const ghiChu = orderRecord.ghi_chu_noi_bo || '';
    if (ghiChu.includes('VOVANMY2026')) {
      const emailMatch = ghiChu.match(/Email:\s*([^\s|]+)/i);
      const customerEmail = emailMatch ? emailMatch[1].trim() : null;
      if (customerEmail) {
        try {
          const normalizedEmail = customerEmail.toLowerCase().trim();
          const students = await pb.collection('student_vouchers').getList(1, 1, {
            filter: `email = "${normalizedEmail}" && used = false`
          });
          if (students.items.length > 0) {
            await pb.collection('student_vouchers').update(students.items[0].id, {
              used: true,
              usedAt: new Date().toISOString(),
              orderId: matchedCode
            });
            console.log(`[SePay Webhook] Student voucher marked used for ${customerEmail}`);
          }
        } catch (err) {
          console.error('[SePay Webhook] Error marking student voucher:', err);
        }
      }
    }

    return NextResponse.json({
      ok: true,
      orderCode: matchedCode,
      amount,
      transactionId,
      updated: true
    });
  } catch (err) {
    console.error('[SePay Webhook] Error:', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
