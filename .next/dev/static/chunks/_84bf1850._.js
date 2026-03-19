(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/services/orders.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildOrderEmail",
    ()=>buildOrderEmail,
    "createMyOrder",
    ()=>createMyOrder,
    "createOrder",
    ()=>createOrder,
    "deleteOrder",
    ()=>deleteOrder,
    "listMyOrders",
    ()=>listMyOrders,
    "listOrders",
    ()=>listOrders,
    "updateOrder",
    ()=>updateOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-client] (ecmascript)");
;
;
const ORDERS_COLLECTION = 'orders';
function generateOrderCode() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
}
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function listOrders(params) {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.perPage) qs.set('perPage', String(params.perPage));
    if (params?.thanh_toan) qs.set('thanh_toan', params.thanh_toan);
    if (params?.trang_thai_su_dung) qs.set('trang_thai_su_dung', params.trang_thai_su_dung);
    if (params?.search) qs.set('search', params.search);
    if (params?.expand) qs.set('expand', params.expand);
    const res = await fetch(`/api/admin/orders?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách đơn hàng');
    return res.json();
}
async function createOrder(input) {
    const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo đơn hàng');
    return res.json();
}
async function updateOrder(id, data) {
    const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật đơn hàng');
    return res.json();
}
async function deleteOrder(id) {
    const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa đơn hàng');
}
async function listMyOrders(params) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.isValid || !__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.model?.id) {
        return {
            items: [],
            page: 1,
            perPage: params?.perPage ?? 20,
            totalPages: 0,
            totalItems: 0
        };
    }
    const userId = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.model.id;
    const qs = new URLSearchParams();
    qs.set('page', String(params?.page ?? 1));
    qs.set('perPage', String(params?.perPage ?? 20));
    qs.set('search', userId);
    if (params?.expand) qs.set('expand', params.expand);
    const res = await fetch(`/api/admin/orders?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách đơn hàng');
    return res.json();
}
async function createMyOrder(input) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.isValid || !__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.model?.id) {
        throw new Error('Bạn cần đăng nhập để tạo đơn hàng');
    }
    const payload = {
        ...input
    };
    if (!payload.khach_hang) payload.khach_hang = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.model.id;
    if (!payload.ma_don_hang || !String(payload.ma_don_hang).trim()) payload.ma_don_hang = generateOrderCode();
    if (!payload.trang_thai_su_dung) payload.trang_thai_su_dung = 'tat_tam_thoi';
    if (!payload.thanh_toan) payload.thanh_toan = 'cho_thanh_toan';
    [
        'server',
        'ngay_het_han',
        'gia_tri',
        'hoa_hong_cho_aff',
        'host_url',
        'host_username',
        'host_password',
        'ghi_chu_noi_bo'
    ].forEach((k)=>{
        if (payload[k] !== undefined && String(payload[k]).trim() === '') delete payload[k];
    });
    if (payload.san_pham !== undefined) {
        if (Array.isArray(payload.san_pham)) {
            payload.san_pham = payload.san_pham.filter((id)=>typeof id === 'string' && id.trim() !== '');
            if (payload.san_pham.length === 0) delete payload.san_pham;
        } else if (typeof payload.san_pham === 'string' && payload.san_pham.trim() === '') {
            delete payload.san_pham;
        }
    }
    // Use admin API route to create order (orders collection may restrict direct user create)
    const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err?.error || 'Không thể tạo đơn hàng');
    }
    return res.json();
}
function buildOrderEmail(order) {
    const subject = `Thông tin đơn hàng ${order.ma_don_hang || order.id}`;
    const lines = [
        `Xin chào ${order.customerName || ''},`,
        '',
        'Thông tin đơn hàng của bạn:',
        `- Mã đơn hàng: ${order.ma_don_hang || order.id}`,
        `- Trạng thái sử dụng: ${order.trang_thai_su_dung || '-'}`,
        `- Thanh toán: ${order.thanh_toan || '-'}`,
        `- Giá trị: ${order.gia_tri || '-'}`,
        `- Sản phẩm: ${order.san_pham || '-'}`,
        `- Server: ${order.server || '-'}`,
        `- Ngày hết hạn: ${order.ngay_het_han || '-'}`,
        '',
        'Thông tin truy cập dịch vụ:',
        `- URL: ${order.host_url || '-'}`,
        `- Username: ${order.host_username || '-'}`,
        `- Password: ${order.host_password || '-'}`,
        '',
        'Nếu bạn cần hỗ trợ, vui lòng phản hồi email này hoặc liên hệ hotline 0832575905.',
        'Trân trọng,',
        'VMST.HOST'
    ];
    return {
        subject,
        body: lines.join('\n')
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/products.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createProduct",
    ()=>createProduct,
    "deleteProduct",
    ()=>deleteProduct,
    "listProducts",
    ()=>listProducts,
    "updateProduct",
    ()=>updateProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-client] (ecmascript)");
;
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function listProducts(params) {
    const { page = 1, perPage = 20, status, search } = params || {};
    const filters = [];
    if (status && status !== 'all') filters.push(`trang_thai = "${status}"`);
    if (search) {
        const s = search.replace(/"/g, '\\"');
        filters.push(`(ten_san_pham ~ "${s}" || danh_muc ~ "${s}")`);
    }
    const filter = filters.length ? filters.join(' && ') : undefined;
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('products').getList(page, perPage, {
        filter,
        sort: '-created'
    });
    return {
        items: res.items,
        page: res.page,
        perPage: res.perPage,
        totalPages: res.totalPages,
        totalItems: res.totalItems
    };
}
async function createProduct(input) {
    const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo sản phẩm');
    return res.json();
}
async function updateProduct(id, data) {
    const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...data
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật sản phẩm');
    return res.json();
}
async function deleteProduct(id) {
    const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa sản phẩm');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/tickets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTicket",
    ()=>createTicket,
    "deleteTicket",
    ()=>deleteTicket,
    "listTickets",
    ()=>listTickets,
    "mapPriorityToLabel",
    ()=>mapPriorityToLabel,
    "mapStatusToLabel",
    ()=>mapStatusToLabel,
    "updateTicket",
    ()=>updateTicket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-client] (ecmascript)");
;
function mapPriorityToLabel(p) {
    switch(p){
        case 'thap':
            return 'Thấp';
        case 'trung_binh':
            return 'Trung bình';
        case 'cao':
            return 'Cao';
        default:
            return String(p);
    }
}
function mapStatusToLabel(s) {
    switch(s){
        case 'cho_tech_rep':
            return 'Chờ kỹ thuật phản hồi';
        case 'cho_khach_rep':
            return 'Chờ khách phản hồi';
        case 'dong_ticket':
            return 'Đóng ticket';
        default:
            return String(s);
    }
}
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function createTicket(input) {
    const res = await fetch('/api/admin/tickets', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo ticket');
    return res.json();
}
async function listTickets(params = {}) {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.perPage) qs.set('perPage', String(params.perPage));
    if (params.status) qs.set('status', params.status);
    if (params.department) qs.set('department', params.department);
    if (params.priority) qs.set('priority', params.priority);
    if (params.userId) qs.set('userId', params.userId);
    if (params.search) qs.set('search', params.search);
    const res = await fetch(`/api/admin/tickets?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách ticket');
    return res.json();
}
async function updateTicket(id, data) {
    const res = await fetch('/api/admin/tickets', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...data
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật ticket');
    return res.json();
}
async function deleteTicket(id) {
    const res = await fetch(`/api/admin/tickets?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa ticket');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/emailService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isEmailJSConfigured",
    ()=>isEmailJSConfigured,
    "sendOrderNotificationEmail",
    ()=>sendOrderNotificationEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emailjs$2f$browser$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@emailjs/browser/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emailjs$2f$browser$2f$es$2f$methods$2f$init$2f$init$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@emailjs/browser/es/methods/init/init.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emailjs$2f$browser$2f$es$2f$methods$2f$send$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@emailjs/browser/es/methods/send/send.js [app-client] (ecmascript)");
;
const EMAILJS_SERVICE_ID = 'service_2hn9ch6';
const EMAILJS_TEMPLATE_ID = 'template_9lxzpgt';
const EMAILJS_PUBLIC_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'X9ipjr3nt4vcZwFhv';
const ADMIN_EMAIL = 'lequelcm@gmail.com';
let initialized = false;
function ensureInitialized() {
    if (!initialized && EMAILJS_PUBLIC_KEY) {
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emailjs$2f$browser$2f$es$2f$methods$2f$init$2f$init$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["init"])(EMAILJS_PUBLIC_KEY);
            initialized = true;
            console.log('[EmailJS] Initialized with Public Key:', EMAILJS_PUBLIC_KEY.substring(0, 10) + '...');
        } catch (error) {
            console.error('[EmailJS] Failed to initialize:', error);
        }
    } else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
async function sendOrderNotificationEmail(data) {
    console.log('[EmailJS] Starting to send order notification email...');
    console.log('[EmailJS] Configuration:', {
        SERVICE_ID: EMAILJS_SERVICE_ID,
        TEMPLATE_ID: EMAILJS_TEMPLATE_ID,
        HAS_PUBLIC_KEY: !!EMAILJS_PUBLIC_KEY,
        ADMIN_EMAIL: ADMIN_EMAIL
    });
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    ensureInitialized();
    console.log('[EmailJS] Initialized successfully');
    try {
        const itemsList = data.items.map((item, index)=>{
            const price = typeof item.price === 'number' ? item.price.toLocaleString('vi-VN') : '0';
            return `${index + 1}. ${item.name} - ${item.duration || 'N/A'} - ${price}₫`;
        }).join('\n');
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
        const currentDate = new Date().toLocaleString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        const templateParams = {
            email: ADMIN_EMAIL,
            to_email: ADMIN_EMAIL,
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
            current_date: currentDate
        };
        console.log('[EmailJS] Sending email with params:', {
            serviceId: EMAILJS_SERVICE_ID,
            templateId: EMAILJS_TEMPLATE_ID,
            toEmail: ADMIN_EMAIL,
            orderCode: data.orderCode
        });
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emailjs$2f$browser$2f$es$2f$methods$2f$send$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["send"])(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('[EmailJS] EmailJS response:', {
            status: response.status,
            text: response.text
        });
        if (response.status === 200) {
            console.log('[EmailJS] Email sent successfully to', ADMIN_EMAIL);
            return true;
        } else {
            console.error('[EmailJS] Email send failed with status:', response.status);
            return false;
        }
    } catch (error) {
        console.error('[EmailJS] Error sending email:', error);
        console.error('[EmailJS] Error details:', {
            message: error?.message,
            stack: error?.stack,
            response: error?.response
        });
        return false;
    }
}
function isEmailJSConfigured() {
    return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/adminNotifications.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "notifyAdminNewOrder",
    ()=>notifyAdminNewOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$tickets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/tickets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$emailService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/emailService.ts [app-client] (ecmascript)");
;
;
const ADMIN_EMAIL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.ADMIN_NOTIFY_EMAIL || 'lequelcm@gmail.com';
function extractCustomerFromOrder(order) {
    const expandedCustomer = order.expand?.khach_hang;
    if (expandedCustomer) {
        return {
            name: expandedCustomer.name || expandedCustomer.ten || '',
            email: expandedCustomer.email || '',
            phone: expandedCustomer.phone || expandedCustomer.so_dien_thoai || expandedCustomer.sdt || '',
            company: expandedCustomer.company || expandedCustomer.cong_ty || '',
            domain: ''
        };
    }
    return null;
}
function extractItemsFromOrder(order) {
    const expandedProducts = order.expand?.san_pham;
    if (!expandedProducts) return [];
    if (Array.isArray(expandedProducts)) {
        return expandedProducts.map((p)=>({
                name: p?.ten_san_pham || p?.name || 'Sản phẩm',
                duration: '',
                price: parseFloat(p?.gia_ban || p?.price || '0')
            }));
    }
    return [
        {
            name: expandedProducts?.ten_san_pham || expandedProducts?.name || 'Sản phẩm',
            duration: '',
            price: parseFloat(expandedProducts?.gia_ban || expandedProducts?.price || '0')
        }
    ];
}
function formatVnd(n) {
    if (typeof n !== 'number') return '-';
    return `${n.toLocaleString('vi-VN')}₫`;
}
async function notifyAdminNewOrder(order, ctx = {}) {
    const subject = `Đơn hàng mới ${order.ma_don_hang || order.id}`;
    const lines = [];
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
        ctx.items.forEach((it, i)=>{
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$tickets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTicket"])({
            tieu_de: subject,
            tin_nhan: lines.join('\n'),
            don_hang: order.id,
            khach_hang: order.khach_hang,
            bo_phan: 'sale',
            do_uu_tien: 'cao',
            trang_thai: 'cho_tech_rep'
        });
    } catch (e) {
        console.warn('[notifyAdminNewOrder] createTicket failed:', e);
    }
    console.log('[notifyAdminNewOrder] Checking EmailJS configuration...');
    console.log('[notifyAdminNewOrder] isEmailJSConfigured:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$emailService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmailJSConfigured"])());
    console.log('[notifyAdminNewOrder] hasCustomer:', !!ctx.customer);
    let customerData = ctx.customer;
    if (!customerData && order.expand) {
        customerData = extractCustomerFromOrder(order) ?? undefined;
    }
    let itemsData = ctx.items;
    if (!itemsData && order.expand) {
        itemsData = extractItemsFromOrder(order);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$emailService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmailJSConfigured"])() && customerData) {
        try {
            const total = ctx.totals?.total || parseFloat(order.gia_tri?.replace(/[^\d]/g, '') || '0');
            const subtotal = ctx.totals?.subtotal || total;
            const discount = ctx.totals?.discount || 0;
            const emailSent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$emailService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendOrderNotificationEmail"])({
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
                note: order.ghi_chu_noi_bo
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
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$emailService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmailJSConfigured"])()) {
            console.warn('[notifyAdminNewOrder] EmailJS not configured (missing NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?)');
        }
        if (!customerData) {
            console.warn('[notifyAdminNewOrder] No customer data provided, cannot send email');
        }
    }
    // Fallback: send via API route (only when EmailJS not configured)
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$emailService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmailJSConfigured"])()) {
        try {
            const res = await fetch('/api/notify-new-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: ADMIN_EMAIL,
                    subject,
                    text: lines.join('\n'),
                    orderId: order.ma_don_hang || order.id
                })
            });
            if (!res.ok) {
                console.warn('[notifyAdminNewOrder] email webhook returned non-OK', res.status);
            }
        } catch (err) {
            console.warn('[notifyAdminNewOrder] email webhook call failed (server not running or misconfigured).');
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/vouchers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateVoucherDiscount",
    ()=>calculateVoucherDiscount,
    "createVoucher",
    ()=>createVoucher,
    "deleteVoucher",
    ()=>deleteVoucher,
    "getVoucherByCode",
    ()=>getVoucherByCode,
    "getVoucherById",
    ()=>getVoucherById,
    "listVouchers",
    ()=>listVouchers,
    "updateVoucher",
    ()=>updateVoucher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-client] (ecmascript)");
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
}
async function listVouchers(params) {
    const qs = new URLSearchParams();
    if (params?.page) qs.set('page', String(params.page));
    if (params?.perPage) qs.set('perPage', String(params.perPage));
    if (params?.sort) qs.set('sort', params.sort);
    if (params?.filter) qs.set('filter', params.filter);
    const res = await fetch(`/api/admin/vouchers?${qs}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách voucher');
    return res.json();
}
async function getVoucherById(id) {
    const res = await fetch(`/api/admin/vouchers?id=${encodeURIComponent(id)}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể lấy thông tin voucher');
    return res.json();
}
async function getVoucherByCode(code) {
    try {
        const records = await listVouchers({
            filter: `code_giam_gia = "${code.toUpperCase()}"`,
            perPage: 1
        });
        return records.items.length > 0 ? records.items[0] : null;
    } catch  {
        return null;
    }
}
async function createVoucher(input) {
    const res = await fetch('/api/admin/vouchers', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo voucher');
    return res.json();
}
async function updateVoucher(id, input) {
    const res = await fetch('/api/admin/vouchers', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
            id,
            ...input
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật voucher');
    return res.json();
}
async function deleteVoucher(id) {
    const res = await fetch(`/api/admin/vouchers?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa voucher');
}
function calculateVoucherDiscount(voucher, subtotal) {
    const minOrder = parseFloat(voucher.don_toi_thieu || '0');
    if (subtotal < minOrder) {
        return {
            isValid: false,
            discount: 0,
            error: `Đơn hàng tối thiểu ${minOrder.toLocaleString('vi-VN')}₫`
        };
    }
    const totalQty = parseInt(voucher.so_luong || '0');
    const usedQty = parseInt(voucher.da_dung || '0');
    if (usedQty >= totalQty && totalQty > 0) {
        return {
            isValid: false,
            discount: 0,
            error: 'Mã voucher đã hết lượt sử dụng'
        };
    }
    let discount = 0;
    const giaTri = voucher.gia_tri || '0';
    if (giaTri.includes('%')) {
        discount = subtotal * parseFloat(giaTri.replace('%', '')) / 100;
    } else {
        discount = parseFloat(giaTri);
    }
    discount = Math.min(discount, subtotal);
    return {
        isValid: true,
        discount
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/studentVouchers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addStudentEmails",
    ()=>addStudentEmails,
    "checkStudentEmail",
    ()=>checkStudentEmail,
    "getStudentList",
    ()=>getStudentList,
    "getStudentVoucherStats",
    ()=>getStudentVoucherStats,
    "markStudentEmailUsed",
    ()=>markStudentEmailUsed
]);
// API routes are relative in Next.js — no base URL needed
const API_BASE = '';
async function checkStudentEmail(email) {
    try {
        const response = await fetch(`${API_BASE}/api/student-vouchers/check/${encodeURIComponent(email)}`);
        if (!response.ok) {
            throw new Error('Không thể kiểm tra email');
        }
        return await response.json();
    } catch (error) {
        console.error('Error checking student email:', error);
        throw new Error(error?.message || 'Không thể kiểm tra email');
    }
}
async function markStudentEmailUsed(email, orderId) {
    try {
        const response = await fetch(`${API_BASE}/api/student-vouchers/mark-used`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                orderId
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.error || 'Không thể đánh dấu email đã sử dụng');
        }
    } catch (error) {
        console.error('Error marking student email as used:', error);
        throw new Error(error?.message || 'Không thể đánh dấu email đã sử dụng');
    }
}
async function getStudentList() {
    try {
        const response = await fetch(`${API_BASE}/api/student-vouchers/list`);
        if (!response.ok) {
            throw new Error('Không thể lấy danh sách sinh viên');
        }
        return await response.json();
    } catch (error) {
        console.error('Error getting student list:', error);
        throw new Error(error?.message || 'Không thể lấy danh sách sinh viên');
    }
}
async function addStudentEmails(emails) {
    try {
        const response = await fetch(`${API_BASE}/api/student-vouchers/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emails
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.error || 'Không thể thêm email vào danh sách');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding student emails:', error);
        throw new Error(error?.message || 'Không thể thêm email vào danh sách');
    }
}
async function getStudentVoucherStats() {
    try {
        const response = await fetch(`${API_BASE}/api/student-vouchers/stats`);
        if (!response.ok) {
            throw new Error('Không thể lấy thống kê');
        }
        return await response.json();
    } catch (error) {
        console.error('Error getting stats:', error);
        throw new Error(error?.message || 'Không thể lấy thống kê');
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(main)/checkout/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckoutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/orders.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/products.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$adminNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/adminNotifications.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$vouchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/vouchers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$studentVouchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/studentVouchers.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
function CheckoutPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isLoggedIn, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { showError, showWarning, showSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { cart, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        phone: '',
        company: '',
        domain: ''
    });
    const [voucherCode, setVoucherCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [appliedVoucher, setAppliedVoucher] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [voucherError, setVoucherError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isApplyingVoucher, setIsApplyingVoucher] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localCart, setLocalCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(cart);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setLocalCart(cart.map((item)=>({
                ...item,
                basePrice: item.basePrice || item.plan.price.monthly,
                months: item.months || 1,
                price: (item.basePrice || item.plan.price.monthly) * (item.months || 1)
            })));
    }, [
        cart
    ]);
    const subtotal = localCart.reduce((sum, item)=>{
        const basePrice = item.basePrice || item.plan.price.monthly;
        const months = item.months || 1;
        return sum + basePrice * months;
    }, 0);
    const handleApplyVoucher = async ()=>{
        if (!voucherCode.trim()) {
            setVoucherError('Vui lòng nhập mã voucher');
            return;
        }
        setIsApplyingVoucher(true);
        setVoucherError('');
        try {
            const voucher = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$vouchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVoucherByCode"])(voucherCode.trim());
            if (!voucher) {
                setVoucherError('Mã voucher không hợp lệ');
                setAppliedVoucher(null);
                return;
            }
            if (voucher.code_giam_gia.toUpperCase() === 'VOVANMY2026') {
                if (!isLoggedIn || !user?.email) {
                    setVoucherError('Vui lòng đăng nhập để sử dụng voucher sinh viên');
                    setAppliedVoucher(null);
                    return;
                }
                try {
                    const checkResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$studentVouchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkStudentEmail"])(user.email);
                    if (!checkResult.allowed) {
                        setVoucherError('Email của bạn không nằm trong danh sách sinh viên được phép sử dụng voucher này');
                        setAppliedVoucher(null);
                        return;
                    }
                    if (checkResult.used) {
                        setVoucherError('Email này đã sử dụng voucher rồi. Mỗi sinh viên chỉ được sử dụng 1 lần.');
                        setAppliedVoucher(null);
                        return;
                    }
                } catch (error) {
                    console.error('Error checking student email:', error);
                    setVoucherError('Không thể kiểm tra quyền sử dụng voucher. Vui lòng thử lại.');
                    setAppliedVoucher(null);
                    return;
                }
            }
            if (voucher.code_giam_gia.toUpperCase() === 'THAYVOVANMY2026' || voucher.id === 'ec9g4exsuulzloe') {
                const ALLOWED_PRODUCT_ID = 'r0oxf1j3clqha2g';
                const invalidProducts = [];
                for (const item of localCart){
                    let productId = null;
                    if (item.plan.id && item.plan.id !== item.plan.name) {
                        productId = item.plan.id;
                    } else {
                        try {
                            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listProducts"])({
                                perPage: 5,
                                search: item.plan.name
                            });
                            const exact = res.items.find((p)=>p.ten_san_pham.trim().toLowerCase() === item.plan.name.trim().toLowerCase());
                            if (exact) productId = exact.id;
                        } catch (err) {
                            console.warn('Không thể lấy product_id:', err);
                        }
                    }
                    if (!productId || productId !== ALLOWED_PRODUCT_ID) {
                        invalidProducts.push(item.plan.name);
                    }
                }
                if (invalidProducts.length > 0) {
                    setVoucherError(`Voucher này chỉ áp dụng cho sản phẩm cụ thể. Vui lòng xóa các sản phẩm khác khỏi giỏ hàng.`);
                    setAppliedVoucher(null);
                    return;
                }
            }
            const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$vouchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateVoucherDiscount"])(voucher, subtotal);
            if (!validation.isValid) {
                setVoucherError(validation.error || 'Mã voucher không hợp lệ');
                setAppliedVoucher(null);
                return;
            }
            setAppliedVoucher(voucher);
            setVoucherError('');
        } catch (error) {
            console.error('Error applying voucher:', error);
            setVoucherError(error?.message || 'Không thể áp dụng voucher');
            setAppliedVoucher(null);
        } finally{
            setIsApplyingVoucher(false);
        }
    };
    const handleRemoveVoucher = ()=>{
        setAppliedVoucher(null);
        setVoucherCode('');
        setVoucherError('');
    };
    const discount = appliedVoucher ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$vouchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateVoucherDiscount"])(appliedVoucher, subtotal).discount : 0;
    const total = Math.max(0, subtotal - discount);
    const handleCheckout = async (e)=>{
        e.preventDefault();
        if (!isLoggedIn) {
            showWarning('Vui lòng đăng ký tài khoản và đăng nhập để mua hàng.');
            router.push('/login');
            return;
        }
        if (!formData.name || !formData.email || !formData.phone || !formData.domain) {
            showError('Vui lòng điền đầy đủ thông tin bắt buộc (bao gồm tên miền).');
            return;
        }
        setIsProcessing(true);
        try {
            const itemsSummary = localCart.map((ci)=>{
                const basePrice = ci.basePrice || ci.plan.price.monthly;
                const months = ci.months || 1;
                const finalPrice = basePrice * months;
                return `${ci.plan.name} - ${finalPrice.toLocaleString('vi-VN')}₫ - ${ci.duration || `${months} tháng`}`;
            }).join('; ');
            const productIds = [];
            for (const ci of localCart){
                try {
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listProducts"])({
                        perPage: 5,
                        search: ci.plan.name
                    });
                    const exact = res.items.find((p)=>p.ten_san_pham.trim().toLowerCase() === ci.plan.name.trim().toLowerCase());
                    if (exact) productIds.push(exact.id);
                } catch (err) {
                    console.warn('Không thể lấy sản phẩm để liên kết đơn:', err);
                }
            }
            if (appliedVoucher && (appliedVoucher.code_giam_gia.toUpperCase() === 'THAYVOVANMY2026' || appliedVoucher.id === 'ec9g4exsuulzloe')) {
                const ALLOWED_PRODUCT_ID = 'r0oxf1j3clqha2g';
                const invalidProducts = productIds.filter((id)=>id !== ALLOWED_PRODUCT_ID);
                if (invalidProducts.length > 0 || productIds.length === 0 || !productIds.every((id)=>id === ALLOWED_PRODUCT_ID)) {
                    showError('Voucher này chỉ áp dụng cho sản phẩm cụ thể. Vui lòng xóa các sản phẩm khác khỏi giỏ hàng.');
                    setIsProcessing(false);
                    return;
                }
            }
            if (appliedVoucher) {
                try {
                    const currentUsed = parseInt(appliedVoucher.da_dung || '0');
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$vouchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateVoucher"])(appliedVoucher.id, {
                        da_dung: String(currentUsed + 1)
                    });
                } catch (err) {
                    console.warn('Failed to update voucher usage count:', err);
                }
            }
            const voucherInfo = appliedVoucher ? ` | Voucher: ${appliedVoucher.code_giam_gia} (Giảm: ${discount.toLocaleString('vi-VN')}₫)` : '';
            const createdOrder = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMyOrder"])({
                gia_tri: String(total),
                thanh_toan: total === 0 ? 'da_thanh_toan' : 'cho_thanh_toan',
                trang_thai_su_dung: total === 0 ? 'dang_su_dung' : 'tat_tam_thoi',
                san_pham: productIds.length ? productIds : undefined,
                ghi_chu_noi_bo: `Khách: ${formData.name} | Email: ${formData.email} | Phone: ${formData.phone} | Domain: ${formData.domain || ''} | Sản phẩm: ${itemsSummary}${voucherInfo} | Tạm tính: ${subtotal.toLocaleString('vi-VN')}₫ | Giảm giá: ${discount.toLocaleString('vi-VN')}₫ | Tổng: ${total.toLocaleString('vi-VN')}₫`
            });
            const orderId = createdOrder.ma_don_hang || createdOrder.id;
            if (appliedVoucher && appliedVoucher.code_giam_gia.toUpperCase() === 'VOVANMY2026' && user?.email) {
                if (total === 0) {
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$studentVouchers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markStudentEmailUsed"])(user.email, orderId);
                        console.log(`[student-voucher] Marked email ${user.email} as used for free order ${orderId}`);
                    } catch (err) {
                        console.warn('[student-voucher] Failed to mark email as used:', err);
                    }
                }
            }
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$adminNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyAdminNewOrder"])(createdOrder, {
                    customer: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        company: formData.company,
                        domain: formData.domain
                    },
                    items: localCart.map((ci)=>{
                        const basePrice = ci.basePrice || ci.plan.price.monthly;
                        const months = ci.months || 1;
                        const finalPrice = basePrice * months;
                        return {
                            name: ci.plan.name,
                            duration: ci.duration || `${months} tháng`,
                            price: finalPrice
                        };
                    }),
                    totals: {
                        subtotal,
                        discount,
                        total
                    }
                });
            } catch (err) {
                console.warn('Admin notification failed (non-blocking):', err);
            }
            clearCart();
            showSuccess('Vui lòng đợi trong giây lát, sản phẩm sẽ được khởi tạo và gửi qua email cho bạn.');
            router.push('/payment-qr?orderId=' + orderId + '&amount=' + total);
        } catch (error) {
            console.error('Create order error:', error);
            showError('Đã có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.');
        } finally{
            setIsProcessing(false);
        }
    };
    if (cart.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-gray-900",
                            children: "Giỏ hàng trống"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/checkout/page.tsx",
                            lineNumber: 279,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-gray-600",
                            children: "Vui lòng thêm sản phẩm vào giỏ hàng"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/checkout/page.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push('/'),
                            className: "mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors",
                            children: "Quay lại trang chủ"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/checkout/page.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/checkout/page.tsx",
                    lineNumber: 278,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/checkout/page.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(main)/checkout/page.tsx",
            lineNumber: 276,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 py-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-gray-900 mb-8",
                    children: "Thanh toán"
                }, void 0, false, {
                    fileName: "[project]/app/(main)/checkout/page.tsx",
                    lineNumber: 296,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid lg:grid-cols-3 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl shadow-md p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-gray-900 mb-4",
                                            children: "Thông tin khách hàng"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                            lineNumber: 301,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleCheckout,
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                                            children: [
                                                                "Họ và tên ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-red-500",
                                                                    children: "*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                    lineNumber: 305,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            required: true,
                                                            value: formData.name,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    name: e.target.value
                                                                }),
                                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid md:grid-cols-2 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                                    children: [
                                                                        "Email ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-red-500",
                                                                            children: "*"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                            lineNumber: 319,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                    lineNumber: 318,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "email",
                                                                    required: true,
                                                                    value: formData.email,
                                                                    onChange: (e)=>setFormData({
                                                                            ...formData,
                                                                            email: e.target.value
                                                                        }),
                                                                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                    lineNumber: 321,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                                    children: [
                                                                        "Số điện thoại ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-red-500",
                                                                            children: "*"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                            lineNumber: 332,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                    lineNumber: 331,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "tel",
                                                                    required: true,
                                                                    value: formData.phone,
                                                                    onChange: (e)=>setFormData({
                                                                            ...formData,
                                                                            phone: e.target.value
                                                                        }),
                                                                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                    lineNumber: 334,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 330,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                                            children: "Công ty"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: formData.company,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    company: e.target.value
                                                                }),
                                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                                            children: [
                                                                "Tên miền ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-red-500",
                                                                    children: "*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                    lineNumber: 356,
                                                                    columnNumber: 30
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 355,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            required: true,
                                                            value: formData.domain,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    domain: e.target.value
                                                                }),
                                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                                                            placeholder: "example.com"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                    lineNumber: 354,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                            lineNumber: 302,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                    lineNumber: 300,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl shadow-md p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-gray-900 mb-4",
                                            children: "Phương thức thanh toán"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                            lineNumber: 371,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border-2 border-blue-500 bg-blue-50 p-4 flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center ring-1 ring-blue-300",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                                                className: "h-6 w-6 text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                lineNumber: 376,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 375,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-gray-900 font-semibold",
                                                                    children: "VietQR"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                    lineNumber: 379,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-gray-600 text-sm",
                                                                    children: "Quét mã QR để thanh toán"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                    lineNumber: 380,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 378,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-6 w-6 rounded-full border border-blue-400 bg-white flex items-center justify-center text-blue-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                    lineNumber: 383,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                            lineNumber: 373,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-sm text-gray-500",
                                            children: "Sau khi tạo đơn, hệ thống sẽ chuyển tới trang hiển thị VietQR để bạn quét và thanh toán."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                            lineNumber: 387,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                    lineNumber: 370,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/checkout/page.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-md p-6 sticky top-4 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold text-gray-900",
                                        children: "Tóm tắt đơn hàng"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                lineNumber: 396,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold",
                                                children: "Phương thức thanh toán: VietQR"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: localCart.map((item, index)=>{
                                            const basePrice = item.basePrice || item.plan.price.monthly;
                                            const months = item.months || 1;
                                            const currentPrice = basePrice * months;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-b pb-4 last:border-b-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold text-gray-900",
                                                                        children: item.plan.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                        lineNumber: 410,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-600 text-xs mt-1",
                                                                        children: [
                                                                            "Đơn giá: ",
                                                                            basePrice.toLocaleString(),
                                                                            "₫/tháng"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                        lineNumber: 411,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                lineNumber: 409,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-gray-900",
                                                                children: [
                                                                    currentPrice.toLocaleString(),
                                                                    "₫"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                lineNumber: 413,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-xs font-semibold text-gray-700 mb-1",
                                                                children: "Thời gian sử dụng"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                lineNumber: 416,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: months,
                                                                onChange: (e)=>{
                                                                    const newMonths = parseInt(e.target.value);
                                                                    const newPrice = basePrice * newMonths;
                                                                    const updatedCart = [
                                                                        ...localCart
                                                                    ];
                                                                    updatedCart[index] = {
                                                                        ...updatedCart[index],
                                                                        months: newMonths,
                                                                        price: newPrice,
                                                                        basePrice: basePrice,
                                                                        duration: newMonths === 1 ? '1 tháng' : newMonths === 3 ? '3 tháng' : newMonths === 6 ? '6 tháng' : newMonths === 12 ? '1 năm' : `${newMonths} tháng`
                                                                    };
                                                                    setLocalCart(updatedCart);
                                                                },
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: 1,
                                                                        children: "1 tháng"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                        lineNumber: 436,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: 3,
                                                                        children: "3 tháng"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                        lineNumber: 437,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: 6,
                                                                        children: "6 tháng"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                        lineNumber: 438,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: 12,
                                                                        children: "1 năm (12 tháng)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                        lineNumber: 439,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                lineNumber: 419,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500 mt-1",
                                                                children: [
                                                                    "Tổng: ",
                                                                    currentPrice.toLocaleString(),
                                                                    "₫ (",
                                                                    basePrice.toLocaleString(),
                                                                    "₫ × ",
                                                                    months,
                                                                    " tháng)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                lineNumber: 441,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                        lineNumber: 415,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                lineNumber: 407,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t pt-4",
                                        children: !appliedVoucher ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                            className: "h-5 w-5 text-gray-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 454,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: voucherCode,
                                                            onChange: (e)=>setVoucherCode(e.target.value.toUpperCase()),
                                                            onKeyPress: (e)=>e.key === 'Enter' && handleApplyVoucher(),
                                                            placeholder: "Nhập mã giảm giá",
                                                            disabled: isApplyingVoucher,
                                                            className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 455,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: handleApplyVoucher,
                                                            disabled: isApplyingVoucher || !voucherCode.trim(),
                                                            className: "bg-[#034CC9] text-white px-4 py-2 rounded-lg hover:bg-[#0B2B6F] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-semibold",
                                                            children: isApplyingVoucher ? 'Đang kiểm tra...' : 'Áp dụng'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 464,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 21
                                                }, this),
                                                voucherError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-red-600 flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            className: "h-3 w-3 mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 474,
                                                            columnNumber: 25
                                                        }, this),
                                                        voucherError
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                    lineNumber: 473,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                            lineNumber: 452,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-green-50 border border-green-200 rounded-lg p-3 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                    className: "h-4 w-4 text-green-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                    lineNumber: 483,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-green-800 font-semibold",
                                                                    children: [
                                                                        'Mã "',
                                                                        appliedVoucher.code_giam_gia,
                                                                        '" đã được áp dụng'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                    lineNumber: 484,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: handleRemoveVoucher,
                                                            className: "text-red-600 hover:text-red-800 transition-colors",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                                lineNumber: 492,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                                            lineNumber: 488,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 21
                                                }, this),
                                                appliedVoucher.ten_chien_dich && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-green-700",
                                                    children: appliedVoucher.ten_chien_dich
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/checkout/page.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/checkout/page.tsx",
                                            lineNumber: 480,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                        lineNumber: 450,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t pt-4 space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Tạm tính"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            subtotal.toLocaleString(),
                                                            "₫"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, this),
                                            discount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-green-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Giảm giá"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                        lineNumber: 509,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "-",
                                                            discount.toLocaleString(),
                                                            "₫"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                        lineNumber: 510,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                lineNumber: 508,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-xl font-bold text-gray-900 pt-3 border-t",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Tổng cộng"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                        lineNumber: 514,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            total.toLocaleString(),
                                                            "₫"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                                lineNumber: 513,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                        lineNumber: 502,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCheckout,
                                        disabled: isProcessing,
                                        className: "w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed",
                                        children: isProcessing ? 'Đang xử lý...' : 'Tạo đơn và xác nhận'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/checkout/page.tsx",
                                        lineNumber: 519,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/checkout/page.tsx",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/checkout/page.tsx",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/checkout/page.tsx",
                    lineNumber: 298,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/checkout/page.tsx",
            lineNumber: 295,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/checkout/page.tsx",
        lineNumber: 294,
        columnNumber: 5
    }, this);
}
_s(CheckoutPage, "0Cb7/3BbBzvEJqF3ySngb0mRWRQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CheckoutPage;
var _c;
__turbopack_context__.k.register(_c, "CheckoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_84bf1850._.js.map