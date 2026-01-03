import { init, send } from '@emailjs/browser';

// EmailJS Configuration - Fixed values
const EMAILJS_SERVICE_ID = 'service_2hn9ch6';
const EMAILJS_TEMPLATE_ID = 'template_9lxzpgt';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'X9ipjr3nt4vcZwFhv';
const ADMIN_EMAIL = 'lequelcm@gmail.com';

// Initialize EmailJS (chỉ init một lần)
let initialized = false;
function ensureInitialized() {
  if (!initialized && EMAILJS_PUBLIC_KEY) {
    try {
      init(EMAILJS_PUBLIC_KEY);
      initialized = true;
      console.log('[EmailJS] Initialized with Public Key:', EMAILJS_PUBLIC_KEY.substring(0, 10) + '...');
    } catch (error) {
      console.error('[EmailJS] Failed to initialize:', error);
    }
  } else if (!EMAILJS_PUBLIC_KEY) {
    console.error('[EmailJS] Cannot initialize: Public Key is missing!');
  }
}

export interface OrderEmailData {
  orderId: string;
  orderCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  customerDomain?: string;
  items: Array<{ name: string; duration?: string; price: number }>;
  subtotal: number;
  discount: number;
  total: number;
  paymentStatus: string;
  orderStatus: string;
  note?: string;
}

/**
 * Gửi email thông báo đơn hàng mới cho admin qua EmailJS
 */
export async function sendOrderNotificationEmail(data: OrderEmailData): Promise<boolean> {
  console.log('[EmailJS] Starting to send order notification email...');
  console.log('[EmailJS] Configuration:', {
    SERVICE_ID: EMAILJS_SERVICE_ID,
    TEMPLATE_ID: EMAILJS_TEMPLATE_ID,
    HAS_PUBLIC_KEY: !!EMAILJS_PUBLIC_KEY,
    ADMIN_EMAIL: ADMIN_EMAIL
  });

  // Kiểm tra cấu hình EmailJS
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
    console.error('[EmailJS] Missing Service ID or Template ID:', {
      SERVICE_ID: EMAILJS_SERVICE_ID,
      TEMPLATE_ID: EMAILJS_TEMPLATE_ID
    });
    return false;
  }

  if (!EMAILJS_PUBLIC_KEY) {
    console.error('[EmailJS] Missing Public Key! Please set VITE_EMAILJS_PUBLIC_KEY in .env file');
    return false;
  }

  // Đảm bảo EmailJS đã được init
  ensureInitialized();
  console.log('[EmailJS] Initialized successfully');

  try {
    // Format danh sách sản phẩm
    const itemsList = data.items.map((item, index) => {
      const price = typeof item.price === 'number' ? item.price.toLocaleString('vi-VN') : '0';
      return `${index + 1}. ${item.name} - ${item.duration || 'N/A'} - ${price}₫`;
    }).join('\n');

    // Format thông tin đơn hàng
    const orderInfo = `
Mã đơn hàng: ${data.orderCode}
Giá trị: ${data.total.toLocaleString('vi-VN')}₫
Trạng thái: ${data.orderStatus}
Thanh toán: ${data.paymentStatus}

--- Thông tin khách hàng ---
Họ tên: ${data.customerName}
Email: ${data.customerEmail}
SĐT: ${data.customerPhone}
${data.customerCompany ? `Công ty: ${data.customerCompany}` : ''}
${data.customerDomain ? `Domain: ${data.customerDomain}` : ''}

--- Sản phẩm ---
${itemsList}

--- Tổng kết ---
Tạm tính: ${data.subtotal.toLocaleString('vi-VN')}₫
Giảm giá: ${data.discount.toLocaleString('vi-VN')}₫
Thành tiền: ${data.total.toLocaleString('vi-VN')}₫

${data.note ? `\nGhi chú: ${data.note}` : ''}

Vui lòng soạn đơn và liên hệ khách hàng để kích hoạt dịch vụ.
    `.trim();

    // Format ngày hiện tại
    const currentDate = new Date().toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Template parameters cho EmailJS
    // to_email: Email người nhận (fix cứng lequelcm@gmail.com)
    // email: Cũng cần set để template có thể dùng {{email}} nếu cần
    const templateParams = {
      email: ADMIN_EMAIL, // Email người nhận (dùng trong template {{email}})
      to_email: ADMIN_EMAIL, // Email người nhận (backup)
      to_name: 'Admin VMST Host',
      subject: `Đơn hàng mới ${data.orderCode} - VMST Host`,
      message: orderInfo,
      order_id: data.orderId,
      order_code: data.orderCode,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone,
      customer_company: data.customerCompany || '',
      customer_domain: data.customerDomain || '',
      subtotal_amount: `${data.subtotal.toLocaleString('vi-VN')}₫`,
      discount_amount: `${data.discount.toLocaleString('vi-VN')}₫`,
      total_amount: `${data.total.toLocaleString('vi-VN')}₫`,
      payment_status: data.paymentStatus,
      order_status: data.orderStatus,
      current_date: currentDate,
    };

    console.log('[EmailJS] Sending email with params:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      toEmail: ADMIN_EMAIL,
      orderCode: data.orderCode
    });

    // Gửi email qua EmailJS
    const response = await send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('[EmailJS] EmailJS response:', {
      status: response.status,
      text: response.text,
      statusText: response.statusText
    });

    if (response.status === 200) {
      console.log('[EmailJS] ✅ Email sent successfully to', ADMIN_EMAIL);
      return true;
    } else {
      console.error('[EmailJS] ❌ Email send failed with status:', response.status);
      return false;
    }
  } catch (error: any) {
    console.error('[EmailJS] ❌ Error sending email:', error);
    console.error('[EmailJS] Error details:', {
      message: error?.message,
      stack: error?.stack,
      response: error?.response
    });
    return false;
  }
}

/**
 * Kiểm tra xem EmailJS đã được cấu hình chưa
 */
export function isEmailJSConfigured(): boolean {
  return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
}

