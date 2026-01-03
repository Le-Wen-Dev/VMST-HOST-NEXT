import type { OrderRecord } from './orders';
import { createTicket, TicketDepartmentPB, TicketPriorityPB } from './tickets';
import { sendOrderNotificationEmail, isEmailJSConfigured } from './emailService';

const ADMIN_EMAIL = (import.meta.env.ADMIN_NOTIFY_EMAIL as string) || 'lequelcm@gmail.com';
const WEBHOOK_BASE = (import.meta.env.VITE_WEBHOOK_BASE_URL as string) || '';

/**
 * Lấy thông tin khách hàng từ order record (với expand)
 */
function extractCustomerFromOrder(order: OrderRecord & { expand?: any }): NewOrderContext['customer'] | null {
  // Thử lấy từ expand trước (nếu đã expand relation)
  const expandedCustomer = order.expand?.khach_hang;
  if (expandedCustomer) {
    return {
      name: expandedCustomer.name || expandedCustomer.ten || '',
      email: expandedCustomer.email || '',
      phone: expandedCustomer.phone || expandedCustomer.so_dien_thoai || expandedCustomer.sdt || '',
      company: expandedCustomer.company || expandedCustomer.cong_ty || '',
      domain: '', // Domain thường không có trong user record
    };
  }

  // Nếu không có expand, không thể lấy thông tin khách hàng
  return null;
}

/**
 * Lấy thông tin sản phẩm từ order record (với expand)
 */
function extractItemsFromOrder(order: OrderRecord & { expand?: any }): NewOrderContext['items'] {
  const expandedProducts = order.expand?.san_pham;
  if (!expandedProducts) return [];

  // Nếu là array
  if (Array.isArray(expandedProducts)) {
    return expandedProducts.map((p: any) => ({
      name: p?.ten_san_pham || p?.name || 'Sản phẩm',
      duration: '', // Không có trong product record
      price: parseFloat(p?.gia_ban || p?.price || '0'),
    }));
  }

  // Nếu là single object
  return [{
    name: expandedProducts?.ten_san_pham || expandedProducts?.name || 'Sản phẩm',
    duration: '',
    price: parseFloat(expandedProducts?.gia_ban || expandedProducts?.price || '0'),
  }];
}

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

  // 2) Gửi email qua EmailJS (ưu tiên)
  console.log('[notifyAdminNewOrder] Checking EmailJS configuration...');
  console.log('[notifyAdminNewOrder] isEmailJSConfigured:', isEmailJSConfigured());
  console.log('[notifyAdminNewOrder] hasCustomer:', !!ctx.customer);
  console.log('[notifyAdminNewOrder] Order data:', {
    id: order.id,
    ma_don_hang: order.ma_don_hang,
    hasExpand: !!order.expand
  });

  // Nếu không có customer từ context, thử lấy từ order expand
  let customerData = ctx.customer;
  if (!customerData && order.expand) {
    console.log('[notifyAdminNewOrder] Trying to extract customer from order expand...');
    customerData = extractCustomerFromOrder(order);
    if (customerData) {
      console.log('[notifyAdminNewOrder] ✅ Found customer from order expand:', customerData);
    } else {
      console.warn('[notifyAdminNewOrder] ⚠️ Could not extract customer from order');
    }
  }

  // Nếu không có items từ context, thử lấy từ order expand
  let itemsData = ctx.items;
  if (!itemsData && order.expand) {
    console.log('[notifyAdminNewOrder] Trying to extract items from order expand...');
    itemsData = extractItemsFromOrder(order);
    if (itemsData.length > 0) {
      console.log('[notifyAdminNewOrder] ✅ Found items from order expand:', itemsData);
    }
  }
  
  if (isEmailJSConfigured() && customerData) {
    console.log('[notifyAdminNewOrder] Attempting to send email via EmailJS...');
    try {
      const total = ctx.totals?.total || parseFloat(order.gia_tri?.replace(/[^\d]/g, '') || '0');
      const subtotal = ctx.totals?.subtotal || total;
      const discount = ctx.totals?.discount || 0;

      console.log('[notifyAdminNewOrder] Order data:', {
        orderId: order.id,
        orderCode: order.ma_don_hang || order.id,
        customerName: ctx.customer.name,
        total,
        subtotal,
        discount
      });

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
        console.log('[notifyAdminNewOrder] ✅ Email sent successfully via EmailJS');
        return; // Đã gửi email thành công, không cần gửi qua webhook
      } else {
        console.warn('[notifyAdminNewOrder] ⚠️ EmailJS returned false, email may not have been sent');
      }
    } catch (err) {
      console.error('[notifyAdminNewOrder] ❌ EmailJS failed with error:', err);
      console.error('[notifyAdminNewOrder] Error details:', {
        message: (err as any)?.message,
        stack: (err as any)?.stack
      });
    }
  } else {
    if (!isEmailJSConfigured()) {
      console.warn('[notifyAdminNewOrder] ⚠️ EmailJS not configured (missing Public Key?)');
      console.warn('[notifyAdminNewOrder] Please check VITE_EMAILJS_PUBLIC_KEY in .env file');
    }
    if (!customerData) {
      console.warn('[notifyAdminNewOrder] ⚠️ No customer data provided, cannot send email');
      console.warn('[notifyAdminNewOrder] Customer data:', {
        fromContext: !!ctx.customer,
        fromExpand: !!order.expand?.khach_hang
      });
    }
  }

  // 3) Fallback: Try to send an email via webhook server (chỉ khi EmailJS không hoạt động)
  // Bỏ qua webhook nếu EmailJS đã được cấu hình để tránh lỗi 404 không cần thiết
  if (!isEmailJSConfigured()) {
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
      // Chỉ log warning, không throw error vì đây là fallback
      console.warn('[notifyAdminNewOrder] email webhook call failed (server not running or misconfigured).');
    }
  }
}