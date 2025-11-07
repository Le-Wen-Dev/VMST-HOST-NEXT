import type { OrderRecord } from './orders';
import { createTicket, TicketDepartmentPB, TicketPriorityPB } from './tickets';

const ADMIN_EMAIL = (import.meta.env.ADMIN_NOTIFY_EMAIL as string) || 'lequelcm@gmail.com';
const WEBHOOK_BASE = (import.meta.env.VITE_WEBHOOK_BASE_URL as string) || '';

export interface NewOrderContext {
  customer?: { name?: string; email?: string; phone?: string; company?: string; domain?: string };
  items?: Array<{ name: string; duration?: string; price?: number }>;
  totals?: { subtotal?: number; discount?: number; total?: number };
}

function formatVnd(n?: number) {
  if (typeof n !== 'number') return '-';
  return `${n.toLocaleString('vi-VN')}₫`;
}

export async function notifyAdminNewOrder(order: OrderRecord, ctx: NewOrderContext = {}) {
  // 1) Create a high-priority ticket in PocketBase for Sales
  const subject = `Đơn hàng mới ${order.ma_don_hang || order.id}`;
  const lines: string[] = [];
  lines.push(`Mã đơn hàng: ${order.ma_don_hang || order.id}`);
  lines.push(`Giá trị: ${order.gia_tri || ctx.totals?.total ? formatVnd(ctx.totals?.total) : '-'}`);
  lines.push(`Trạng thái: ${order.trang_thai_su_dung || '-'}`);
  lines.push(`Thanh toán: ${order.thanh_toan || '-'}`);
  if (ctx.customer) {
    lines.push('--- Khách hàng ---');
    lines.push(`Họ tên: ${ctx.customer.name || '-'}`);
    lines.push(`Email: ${ctx.customer.email || '-'}`);
    lines.push(`SĐT: ${ctx.customer.phone || '-'}`);
    if (ctx.customer.company) lines.push(`Công ty: ${ctx.customer.company}`);
    if (ctx.customer.domain) lines.push(`Domain: ${ctx.customer.domain}`);
  }
  if (ctx.items?.length) {
    lines.push('--- Sản phẩm ---');
    ctx.items.forEach((it, i) => {
      lines.push(`${i + 1}. ${it.name} | thời hạn: ${it.duration || '-'} | giá: ${typeof it.price === 'number' ? formatVnd(it.price) : '-'}`);
    });
  }
  if (ctx.totals) {
    lines.push('--- Tổng kết ---');
    lines.push(`Tạm tính: ${formatVnd(ctx.totals.subtotal)}`);
    lines.push(`Giảm giá: ${formatVnd(ctx.totals.discount)}`);
    lines.push(`Thành tiền: ${formatVnd(ctx.totals.total)}`);
  }
  lines.push('');
  lines.push('Vui lòng soạn đơn và liên hệ khách hàng để kích hoạt dịch vụ.');

  try {
    await createTicket({
      tieu_de: subject,
      tin_nhan: lines.join('\n'),
      don_hang: order.id,
      khach_hang: order.khach_hang,
      bo_phan: 'sale' as TicketDepartmentPB,
      do_uu_tien: 'cao' as TicketPriorityPB,
      trang_thai: 'cho_tech_rep',
    });
  } catch (e) {
    console.warn('[notifyAdminNewOrder] createTicket failed:', e);
  }

  // 2) Try to send an email via webhook server (if running and configured)
  try {
    const url = WEBHOOK_BASE ? `${WEBHOOK_BASE.replace(/\/$/, '')}/api/notify-new-order` : '/api/notify-new-order';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: ADMIN_EMAIL,
        subject,
        text: lines.join('\n'),
        orderId: order.ma_don_hang || order.id,
      }),
    });
    if (!res.ok) {
      console.warn('[notifyAdminNewOrder] email webhook returned non-OK', res.status);
    }
  } catch (err) {
    console.warn('[notifyAdminNewOrder] email webhook call failed (server not running or misconfigured).');
  }
}