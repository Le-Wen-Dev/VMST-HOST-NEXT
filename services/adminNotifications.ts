import type { OrderRecord } from '@/services/orders';
import { createTicket, TicketDepartmentPB, TicketPriorityPB } from '@/services/tickets';
import { sendOrderNotificationEmail, isEmailJSConfigured } from '@/services/emailService';

const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || 'lequelcm@gmail.com';

function extractCustomerFromOrder(order: OrderRecord & { expand?: any }): NewOrderContext['customer'] | null {
  const expandedCustomer = order.expand?.khach_hang;
  if (expandedCustomer) {
    return {
      name: expandedCustomer.name || expandedCustomer.ten || '',
      email: expandedCustomer.email || '',
      phone: expandedCustomer.phone || expandedCustomer.so_dien_thoai || expandedCustomer.sdt || '',
      company: expandedCustomer.company || expandedCustomer.cong_ty || '',
      domain: '',
    };
  }
  return null;
}

function extractItemsFromOrder(order: OrderRecord & { expand?: any }): NewOrderContext['items'] {
  const expandedProducts = order.expand?.san_pham;
  if (!expandedProducts) return [];
  if (Array.isArray(expandedProducts)) {
    return expandedProducts.map((p: any) => ({
      name: p?.ten_san_pham || p?.name || 'Sản phẩm',
      duration: '',
      price: parseFloat(p?.gia_ban || p?.price || '0'),
    }));
  }
  return [{
    name: expandedProducts?.ten_san_pham || expandedProducts?.name || 'Sản phẩm',
    duration: '',
    price: parseFloat(expandedProducts?.gia_ban || expandedProducts?.price || '0'),
  }];
}

export interface NewOrderContext {
  customer?: { name?: string; email?: string; phone?: string; company?: string; domain?: string };
  items?: Array<{ name: string; duration?: string; price: number }>;
  totals?: { subtotal?: number; discount?: number; total?: number };
}

function formatVnd(n?: number) {
  if (typeof n !== 'number') return '-';
  return `${n.toLocaleString('vi-VN')}₫`;
}

export async function notifyAdminNewOrder(order: OrderRecord, ctx: NewOrderContext = {}) {
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

  console.log('[notifyAdminNewOrder] Checking EmailJS configuration...');
  console.log('[notifyAdminNewOrder] isEmailJSConfigured:', isEmailJSConfigured());
  console.log('[notifyAdminNewOrder] hasCustomer:', !!ctx.customer);

  let customerData = ctx.customer;
  if (!customerData && order.expand) {
    customerData = extractCustomerFromOrder(order) ?? undefined;
  }

  let itemsData = ctx.items;
  if (!itemsData && order.expand) {
    itemsData = extractItemsFromOrder(order);
  }

  if (isEmailJSConfigured() && customerData) {
    try {
      const total = ctx.totals?.total || parseFloat(order.gia_tri?.replace(/[^\d]/g, '') || '0');
      const subtotal = ctx.totals?.subtotal || total;
      const discount = ctx.totals?.discount || 0;

      const emailSent = await sendOrderNotificationEmail({
        orderId: order.id,
        orderCode: order.ma_don_hang || order.id,
        customerName: customerData.name || 'N/A',
        customerEmail: customerData.email || 'N/A',
        customerPhone: customerData.phone || 'N/A',
        customerCompany: customerData.company,
        customerDomain: customerData.domain,
        items: itemsData || [],
        subtotal,
        discount,
        total,
        paymentStatus: order.thanh_toan || 'cho_thanh_toan',
        orderStatus: order.trang_thai_su_dung || 'tat_tam_thoi',
        note: order.ghi_chu_noi_bo,
      });

      if (emailSent) {
        console.log('[notifyAdminNewOrder] Email sent successfully via EmailJS');
        return;
      } else {
        console.warn('[notifyAdminNewOrder] EmailJS returned false, email may not have been sent');
      }
    } catch (err) {
      console.error('[notifyAdminNewOrder] EmailJS failed with error:', err);
    }
  } else {
    if (!isEmailJSConfigured()) {
      console.warn('[notifyAdminNewOrder] EmailJS not configured (missing NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?)');
    }
    if (!customerData) {
      console.warn('[notifyAdminNewOrder] No customer data provided, cannot send email');
    }
  }

  // Fallback: send via API route (only when EmailJS not configured)
  if (!isEmailJSConfigured()) {
    try {
      const res = await fetch('/api/notify-new-order', {
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
}
