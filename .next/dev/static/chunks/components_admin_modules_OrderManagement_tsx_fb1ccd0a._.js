(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/admin/modules/OrderManagement.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderManagement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x-circle.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/orders.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/products.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$servers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/servers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/users.ts [app-client] (ecmascript)");
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
function parseGhiChu(raw) {
    if (!raw || !raw.includes('|')) return null;
    const parts = raw.split('|').map((s)=>s.trim());
    const get = (prefix)=>{
        const p = parts.find((s)=>s.toLowerCase().startsWith(prefix.toLowerCase()));
        return p ? p.slice(p.indexOf(':') + 1).trim() : '';
    };
    // Parse "Sản phẩm: Wordpress Max 1 - 300.000₫ - 3 tháng"
    const spRaw = get('Sản phẩm');
    let sanPham = '', giaSanPham = '', soThang = 0;
    if (spRaw) {
        const spParts = spRaw.split(' - ').map((s)=>s.trim());
        sanPham = spParts[0] || '';
        giaSanPham = spParts[1] || '';
        const monthMatch = spRaw.match(/(\d+)\s*tháng/);
        if (monthMatch) soThang = parseInt(monthMatch[1], 10);
    }
    // Parse "Voucher: KHANHBANG5GB (Giảm: 100.000₫)"
    const voucherRaw = get('Voucher');
    let voucher = '', giamGiaVoucher = '';
    if (voucherRaw) {
        const vMatch = voucherRaw.match(/^(.+?)\s*\(Giảm:\s*(.+?)\)$/);
        if (vMatch) {
            voucher = vMatch[1].trim();
            giamGiaVoucher = vMatch[2].trim();
        } else {
            voucher = voucherRaw;
        }
    }
    return {
        khach: get('Khách'),
        email: get('Email'),
        phone: get('Phone'),
        domain: get('Domain'),
        sanPham,
        giaSanPham,
        soThang,
        voucher,
        giamGiaVoucher,
        tamTinh: get('Tạm tính'),
        giamGia: get('Giảm giá'),
        tong: get('Tổng')
    };
}
function generatePassword(length = 16) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
    const arr = new Uint8Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b)=>chars[b % chars.length]).join('');
}
function formatVND(value) {
    const num = typeof value === 'string' ? parseInt(value.replace(/[^\d]/g, ''), 10) : value;
    if (!num || isNaN(num)) return '0';
    return num.toLocaleString('vi-VN');
}
function calcExpiryDate(createdStr, months) {
    if (!createdStr || !months) return '';
    const d = new Date(createdStr);
    if (isNaN(d.getTime())) return '';
    d.setMonth(d.getMonth() + months);
    return d.toISOString().slice(0, 19).replace('T', ' ') + '.000Z';
}
function OrderManagement() {
    _s();
    // Filters
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [orderStatusFilter, setOrderStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [paymentStatusFilter, setPaymentStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    // Pagination and data
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [perPage, setPerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalItems, setTotalItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [productOptions, setProductOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [serverOptions, setServerOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userOptions, setUserOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // CRUD modals
    const [showFormModal, setShowFormModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDeleteModal, setShowDeleteModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedOrder, setSelectedOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Form fields
    const [maDonHang, setMaDonHang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [serverId, setServerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sanPhamId, setSanPhamId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [khachHangId, setKhachHangId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [thanhToan, setThanhToan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('cho_thanh_toan');
    const [trangThaiSuDung, setTrangThaiSuDung] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pending');
    const [giaTri, setGiaTri] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hoaHongChoAff, setHoaHongChoAff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [ngayHetHan, setNgayHetHan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hostUrl, setHostUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hostUsername, setHostUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hostPassword, setHostPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [ghiChuNoiBo, setGhiChuNoiBo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderManagement.useEffect": ()=>{
            const refresh = {
                "OrderManagement.useEffect.refresh": async ()=>{
                    try {
                        setLoading(true);
                        setError(null);
                        const expandCandidates = [
                            'san_pham,server,khach_hang',
                            'san_pham,server',
                            'san_pham',
                            ''
                        ];
                        let res = null;
                        let lastErr = null;
                        for (const ex of expandCandidates){
                            try {
                                res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listOrders"])({
                                    page,
                                    perPage,
                                    thanh_toan: paymentStatusFilter,
                                    trang_thai_su_dung: orderStatusFilter,
                                    search: searchTerm,
                                    expand: ex || undefined
                                });
                                lastErr = null;
                                break;
                            } catch (err) {
                                lastErr = err;
                                if (err?.status !== 400) break;
                            }
                        }
                        if (!res) throw lastErr || new Error('Không thể tải danh sách đơn hàng');
                        const mapped = (res.items || []).map({
                            "OrderManagement.useEffect.refresh.mapped": (r)=>({
                                    id: r.id,
                                    ma_don_hang: r.ma_don_hang || r.id,
                                    server: r.server,
                                    thanh_toan: r.thanh_toan,
                                    trang_thai_su_dung: r.trang_thai_su_dung,
                                    san_pham: r.san_pham,
                                    ngay_het_han: r.ngay_het_han,
                                    khach_hang: r.khach_hang,
                                    gia_tri: r.gia_tri,
                                    hoa_hong_cho_aff: r.hoa_hong_cho_aff,
                                    host_url: r.host_url,
                                    host_username: r.host_username,
                                    host_password: r.host_password,
                                    ghi_chu_noi_bo: r.ghi_chu_noi_bo,
                                    createdDate: (r.ngay_dat_hang || r.created_at || r.created || '').slice(0, 19).replace('T', ' '),
                                    expand: r.expand,
                                    _raw: r
                                })
                        }["OrderManagement.useEffect.refresh.mapped"]);
                        setOrders(mapped);
                        setPage(res.page);
                        setPerPage(res.perPage);
                        setTotalPages(res.totalPages);
                        setTotalItems(res.totalItems);
                    } catch (err) {
                        console.error('Load orders failed', err?.status, err?.message, err?.response);
                        setError(err?.message || 'Không thể tải danh sách đơn hàng');
                    } finally{
                        setLoading(false);
                    }
                }
            }["OrderManagement.useEffect.refresh"];
            refresh();
        }
    }["OrderManagement.useEffect"], [
        page,
        perPage,
        orderStatusFilter,
        paymentStatusFilter,
        searchTerm
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderManagement.useEffect": ()=>{
            const loadRelations = {
                "OrderManagement.useEffect.loadRelations": async ()=>{
                    try {
                        const [prodRes, srvRes, usrRes] = await Promise.all([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listProducts"])({
                                perPage: 50
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$servers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listServers"])({
                                perPage: 50
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listUsers"])({
                                perPage: 50
                            })
                        ]);
                        setProductOptions((prodRes.items || []).map({
                            "OrderManagement.useEffect.loadRelations": (p)=>({
                                    id: p.id,
                                    name: p.ten_san_pham
                                })
                        }["OrderManagement.useEffect.loadRelations"]));
                        setServerOptions((srvRes.items || []).map({
                            "OrderManagement.useEffect.loadRelations": (s)=>({
                                    id: s.id,
                                    label: `${s.ten || s.nha_cung_cap || ''}${s.ip ? ` - ${s.ip}` : ''}`.trim()
                                })
                        }["OrderManagement.useEffect.loadRelations"]));
                        setUserOptions((usrRes.items || []).map({
                            "OrderManagement.useEffect.loadRelations": (u)=>({
                                    id: u.id,
                                    label: `${u.ten || u.name || ''} (${u.email || ''})`.trim(),
                                    email: u.email
                                })
                        }["OrderManagement.useEffect.loadRelations"]));
                    } catch (e) {
                        console.error('Load relation options failed', e);
                    }
                }
            }["OrderManagement.useEffect.loadRelations"];
            loadRelations();
        }
    }["OrderManagement.useEffect"], []);
    const filteredOrders = orders.filter((order)=>{
        const s = searchTerm.toLowerCase();
        const matchesSearch = (order.ma_don_hang || '').toLowerCase().includes(s) || (order.gia_tri || '').toLowerCase().includes(s) || (order.host_url || '').toLowerCase().includes(s) || (order.host_username || '').toLowerCase().includes(s);
        const matchesOrderStatus = orderStatusFilter === 'all' || order.trang_thai_su_dung === orderStatusFilter;
        const matchesPaymentStatus = paymentStatusFilter === 'all' || order.thanh_toan === paymentStatusFilter;
        return matchesSearch && matchesOrderStatus && matchesPaymentStatus;
    });
    const sortedOrders = [
        ...filteredOrders
    ].sort((a, b)=>{
        const normalize = (v)=>typeof v === 'string' ? v.replace(' ', 'T') : v;
        const ta = new Date(normalize(a._raw?.ngay_dat_hang || a.ngay_dat_hang || a._raw?.created_at || a.created_at || a._raw?.created || a.created)).getTime() || 0;
        const tb = new Date(normalize(b._raw?.ngay_dat_hang || b.ngay_dat_hang || b._raw?.created_at || b.created_at || b._raw?.created || b.created)).getTime() || 0;
        return tb - ta;
    });
    const getOrderStatusColor = (status)=>{
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'confirmed': 'bg-blue-100 text-blue-800',
            'processing': 'bg-purple-100 text-purple-800',
            'active': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800',
            'tat_tam_thoi': 'bg-gray-100 text-gray-800',
            'dang_su_dung': 'bg-green-100 text-green-800',
            'het_han_su_dung': 'bg-red-100 text-red-800',
            'da_huy': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };
    const getPaymentStatusColor = (status)=>{
        const colors = {
            'unpaid': 'bg-red-100 text-red-800',
            'paid': 'bg-green-100 text-green-800',
            'partial': 'bg-yellow-100 text-yellow-800',
            'refunded': 'bg-purple-100 text-purple-800',
            'payback': 'bg-orange-100 text-orange-800',
            'cho_thanh_toan': 'bg-red-100 text-red-800',
            'da_thanh_toan': 'bg-green-100 text-green-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };
    const paymentStatusLabel = (s)=>{
        const labels = {
            'cho_thanh_toan': 'Chưa thanh toán',
            'da_thanh_toan': 'Đã thanh toán',
            'partial': 'Thanh toán 1 phần',
            'refunded': 'Đã hoàn tiền',
            'payback': 'Tính payback'
        };
        return labels[s] || s;
    };
    const handleCreate = ()=>{
        setSelectedOrder(null);
        setMaDonHang('');
        setServerId('');
        setSanPhamId('');
        setKhachHangId('');
        setThanhToan('cho_thanh_toan');
        setTrangThaiSuDung('dang_su_dung');
        setGiaTri('');
        setHoaHongChoAff('');
        setNgayHetHan('');
        setHostUrl('');
        setHostUsername('');
        setHostPassword('');
        setGhiChuNoiBo('');
        setShowFormModal(true);
    };
    const handleEdit = (order)=>{
        setSelectedOrder(order);
        setMaDonHang(order.ma_don_hang || '');
        setServerId(order.server || '');
        setSanPhamId(order.san_pham || '');
        setKhachHangId(order.khach_hang || '');
        setThanhToan(order.thanh_toan || 'cho_thanh_toan');
        setTrangThaiSuDung(order.trang_thai_su_dung || 'dang_su_dung');
        setGiaTri(order.gia_tri || '');
        setHoaHongChoAff(order.hoa_hong_cho_aff || '');
        setGhiChuNoiBo(order.ghi_chu_noi_bo || '');
        // Parse ghi_chu_noi_bo for smart auto-fill
        const parsed = parseGhiChu(order.ghi_chu_noi_bo || '');
        // Host URL: use existing or pre-fill from domain
        if (order.host_url) {
            setHostUrl(order.host_url);
        } else if (parsed?.domain) {
            setHostUrl(`https://${parsed.domain}`);
        } else {
            setHostUrl('https://');
        }
        // Host Username: use existing or extract email prefix
        if (order.host_username) {
            setHostUsername(order.host_username);
        } else if (parsed?.email) {
            setHostUsername(parsed.email.split('@')[0]);
        } else {
            setHostUsername('');
        }
        // Host Password: use existing or generate random 16 chars
        if (order.host_password) {
            setHostPassword(order.host_password);
        } else {
            setHostPassword(generatePassword(16));
        }
        // Ngày hết hạn: use existing or auto-calculate from created + months
        if (order.ngay_het_han) {
            setNgayHetHan(order.ngay_het_han);
        } else if (parsed?.soThang) {
            const createdAt = order._raw?.ngay_dat_hang || order._raw?.created_at || order._raw?.created || '';
            setNgayHetHan(calcExpiryDate(createdAt, parsed.soThang));
        } else {
            setNgayHetHan('');
        }
        setShowFormModal(true);
    };
    const handleDelete = (order)=>{
        setSelectedOrder(order);
        setShowDeleteModal(true);
    };
    const handleSave = async ()=>{
        try {
            const payload = {
                ma_don_hang: maDonHang.trim(),
                server: serverId || undefined,
                san_pham: sanPhamId || undefined,
                khach_hang: khachHangId || undefined,
                thanh_toan: thanhToan || undefined,
                trang_thai_su_dung: trangThaiSuDung || undefined,
                gia_tri: giaTri || undefined,
                hoa_hong_cho_aff: hoaHongChoAff || undefined,
                ngay_het_han: ngayHetHan || undefined,
                host_url: hostUrl || undefined,
                host_username: hostUsername || undefined,
                host_password: hostPassword || undefined,
                ghi_chu_noi_bo: ghiChuNoiBo || undefined
            };
            if (selectedOrder) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateOrder"])(selectedOrder.id, payload);
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createOrder"])(payload);
            }
            setShowFormModal(false);
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listOrders"])({
                page,
                perPage,
                thanh_toan: paymentStatusFilter,
                trang_thai_su_dung: orderStatusFilter,
                search: searchTerm
            });
            setOrders((res.items || []).map((r)=>({
                    id: r.id,
                    ma_don_hang: r.ma_don_hang || r.id,
                    server: r.server,
                    thanh_toan: r.thanh_toan,
                    trang_thai_su_dung: r.trang_thai_su_dung,
                    san_pham: r.san_pham,
                    ngay_het_han: r.ngay_het_han,
                    khach_hang: r.khach_hang,
                    gia_tri: r.gia_tri,
                    hoa_hong_cho_aff: r.hoa_hong_cho_aff,
                    host_url: r.host_url,
                    host_username: r.host_username,
                    host_password: r.host_password,
                    ghi_chu_noi_bo: r.ghi_chu_noi_bo,
                    createdDate: (r.ngay_dat_hang || r.created_at || r.created || '').slice(0, 19).replace('T', ' '),
                    _raw: r
                })));
        } catch (err) {
            console.error('Save order failed', err);
            alert('Lưu đơn hàng thất bại');
        }
    };
    const formatProductLabel = (order)=>{
        const p = order.expand?.san_pham || order.san_pham;
        if (!p) return '-';
        return p?.ten_san_pham || p?.name || String(p);
    };
    const formatServerLabel = (order)=>{
        const s = order.expand?.server || order.server;
        if (!s) return '-';
        const name = s?.ten || s?.name || s?.hostname || s?.nha_cung_cap || '';
        const ip = s?.ip || '';
        return `${name}${ip ? ` - ${ip}` : ''}`.trim() || ip || '-';
    };
    const normalizeUrl = (u)=>{
        if (!u) return '';
        if (/^https?:\/\//i.test(u)) return u;
        return `https://${u}`;
    };
    const copyToClipboard = async (text, type)=>{
        try {
            await navigator.clipboard.writeText(text);
            alert(`Đã copy ${type} vào clipboard`);
        } catch (e) {
            console.error('Copy failed', e);
            alert('Không thể copy vào clipboard');
        }
    };
    const formatCustomerLabel = (order)=>{
        const u = order.expand?.khach_hang || order.khach_hang;
        if (!u) return '-';
        const name = u?.ten || u?.name || '';
        const email = u?.email || '';
        const phone = u?.phone || u?.so_dien_thoai || u?.sdt || '';
        const parts = [
            name,
            email,
            phone
        ].filter(Boolean);
        return parts.join(' | ');
    };
    const toDate = (s)=>{
        const d = s ? new Date(s) : null;
        return d && !isNaN(d.getTime()) ? d : null;
    };
    const formatExpireDiff = (created, expired)=>{
        const c = toDate(created);
        const e = toDate(expired);
        if (!c || !e) return expired || '-';
        let months = (e.getFullYear() - c.getFullYear()) * 12 + (e.getMonth() - c.getMonth());
        if (e.getDate() < c.getDate()) months -= 1;
        const years = Math.floor(months / 12);
        const remainMonths = months % 12;
        const parts = [];
        if (years > 0) parts.push(`${years} năm`);
        if (remainMonths > 0) parts.push(`${remainMonths} tháng`);
        if (!parts.length) parts.push('0 tháng');
        return `${parts.join(' ')} (tới ${e.toLocaleDateString()})`;
    };
    const paymentOptions = [
        {
            value: 'cho_thanh_toan',
            label: 'Chưa thanh toán'
        },
        {
            value: 'da_thanh_toan',
            label: 'Đã thanh toán'
        },
        {
            value: 'partial',
            label: 'Thanh toán 1 phần'
        },
        {
            value: 'refunded',
            label: 'Đã hoàn tiền'
        },
        {
            value: 'payback',
            label: 'Tính payback'
        }
    ];
    const usageOptions = [
        {
            value: 'tat_tam_thoi',
            label: 'Tắt tạm thời'
        },
        {
            value: 'dang_su_dung',
            label: 'Đang sử dụng'
        },
        {
            value: 'het_han_su_dung',
            label: 'Hết hạn sử dụng'
        },
        {
            value: 'da_huy',
            label: 'Đã hủy'
        }
    ];
    const handleChangePayment = async (order, newValue)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateOrder"])(order.id, {
                thanh_toan: newValue
            });
            setOrders((prev)=>prev.map((o)=>o.id === order.id ? {
                        ...o,
                        thanh_toan: newValue
                    } : o));
        } catch (e) {
            console.error('Update payment failed', e);
            alert('Cập nhật trạng thái thanh toán thất bại');
        }
    };
    const handleChangeUsage = async (order, newValue)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateOrder"])(order.id, {
                trang_thai_su_dung: newValue
            });
            setOrders((prev)=>prev.map((o)=>o.id === order.id ? {
                        ...o,
                        trang_thai_su_dung: newValue
                    } : o));
        } catch (e) {
            console.error('Update usage status failed', e);
            alert('Cập nhật trạng thái đơn thất bại');
        }
    };
    const sendEmailToCustomer = (order)=>{
        const email = order.expand?.khach_hang?.email || order.khach_hang?.email || '';
        if (!email) {
            alert('Không tìm thấy email khách hàng');
            return;
        }
        const { subject, body } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildOrderEmail"])(order);
        const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
    };
    const handleConfirmDelete = async ()=>{
        try {
            if (selectedOrder?.id) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteOrder"])(selectedOrder.id);
                setSelectedOrder(null);
                setShowDeleteModal(false);
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listOrders"])({
                    page,
                    perPage,
                    thanh_toan: paymentStatusFilter,
                    trang_thai_su_dung: orderStatusFilter,
                    search: searchTerm
                });
                setOrders((res.items || []).map((r)=>({
                        id: r.id,
                        ma_don_hang: r.ma_don_hang || r.id,
                        server: r.server,
                        thanh_toan: r.thanh_toan,
                        trang_thai_su_dung: r.trang_thai_su_dung,
                        san_pham: r.san_pham,
                        ngay_het_han: r.ngay_het_han,
                        khach_hang: r.khach_hang,
                        gia_tri: r.gia_tri,
                        hoa_hong_cho_aff: r.hoa_hong_cho_aff,
                        host_url: r.host_url,
                        host_username: r.host_username,
                        host_password: r.host_password,
                        ghi_chu_noi_bo: r.ghi_chu_noi_bo,
                        createdDate: (r.ngay_dat_hang || r.created || '').slice(0, 19).replace('T', ' '),
                        expand: r.expand,
                        _raw: r
                    })));
            }
        } catch (err) {
            console.error('Delete order failed', err);
            alert('Xóa đơn hàng thất bại');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-gray-900",
                                children: "Quản lý Đơn hàng"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 530,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mt-1",
                                children: "Theo dõi và xử lý đơn hàng của khách hàng"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 531,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCreate,
                        className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 534,
                                columnNumber: 11
                            }, this),
                            "Tạo đơn hàng"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 533,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                lineNumber: 528,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-semibold",
                        children: "Không thể tải dữ liệu đơn hàng"
                    }, void 0, false, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 541,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm mt-1 break-words",
                        children: String(error)
                    }, void 0, false, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 542,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs mt-2 text-red-600",
                        children: "Gợi ý: kiểm tra cấu hình PB_URL và kết nối PocketBase."
                    }, void 0, false, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 543,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                lineNumber: 540,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-6 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>{
                            setPaymentStatusFilter('all');
                            setPage(1);
                        },
                        className: `bg-white rounded-xl shadow-md p-6 border-l-4 cursor-pointer transition transform hover:scale-[1.01] ${paymentStatusFilter === 'all' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-blue-500'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 text-sm mb-1",
                                children: "Tất cả thanh toán"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 551,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-3xl font-bold text-gray-900",
                                children: orders.length
                            }, void 0, false, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 552,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 547,
                        columnNumber: 9
                    }, this),
                    [
                        'cho_thanh_toan',
                        'da_thanh_toan',
                        'partial',
                        'refunded',
                        'payback'
                    ].map((pstat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>{
                                setPaymentStatusFilter((cur)=>cur === pstat ? 'all' : pstat);
                                setPage(1);
                            },
                            className: `bg-white rounded-xl shadow-md p-6 border-l-4 cursor-pointer transition transform hover:scale-[1.01] ${paymentStatusFilter === pstat ? 'border-blue-600 ring-2 ring-blue-100' : 'border-blue-500'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 text-sm mb-1",
                                    children: paymentStatusLabel(pstat)
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                    lineNumber: 560,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-3xl font-bold text-gray-900",
                                    children: orders.filter((o)=>o.thanh_toan === pstat).length
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                    lineNumber: 561,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, pstat, true, {
                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                            lineNumber: 555,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                lineNumber: 546,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-lg p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 571,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Tìm kiếm mã đơn, giá trị, host...",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value),
                                        className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 572,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 570,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: orderStatusFilter,
                                onChange: (e)=>{
                                    setOrderStatusFilter(e.target.value);
                                    setPage(1);
                                },
                                className: "px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "all",
                                        children: "Tất cả trạng thái đơn"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 585,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "pending",
                                        children: "Chờ xử lý"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 586,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "confirmed",
                                        children: "Đã xác nhận"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 587,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "processing",
                                        children: "Đang xử lý"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 588,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "active",
                                        children: "Hoạt động"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 589,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "cancelled",
                                        children: "Đã hủy"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 590,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 580,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: paymentStatusFilter,
                                onChange: (e)=>{
                                    setPaymentStatusFilter(e.target.value);
                                    setPage(1);
                                },
                                className: "px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "all",
                                        children: "Tất cả thanh toán"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 597,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "cho_thanh_toan",
                                        children: "Chưa thanh toán"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 598,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "da_thanh_toan",
                                        children: "Đã thanh toán"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 599,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "partial",
                                        children: "Thanh toán 1 phần"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 600,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "refunded",
                                        children: "Đã hoàn tiền"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 601,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "payback",
                                        children: "Tính payback"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 602,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 592,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 569,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-gradient-to-r from-blue-50 to-indigo-50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase",
                                                children: "Đơn hàng"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 610,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase",
                                                children: "Server"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 611,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase",
                                                children: "Trạng thái"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 612,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase",
                                                children: "Thanh toán"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 613,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase",
                                                children: "Thông tin host"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 614,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase",
                                                children: "Ngày tạo"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 615,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase",
                                                children: "Hết hạn"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 616,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase",
                                                children: "Khách hàng"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 617,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase",
                                                children: "Giá trị"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 618,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase",
                                                children: "Hành động"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 619,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 609,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                    lineNumber: 608,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-gray-200",
                                    children: [
                                        sortedOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "hover:bg-blue-50 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-bold text-gray-900 font-mono",
                                                                    children: order.ma_don_hang
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                    lineNumber: 627,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-600 mt-1",
                                                                    children: [
                                                                        "SP: ",
                                                                        formatProductLabel(order)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                    lineNumber: 628,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                            lineNumber: 626,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 625,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-semibold text-gray-900",
                                                            children: formatServerLabel(order)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                            lineNumber: 632,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 631,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: order.trang_thai_su_dung || '',
                                                            onChange: (e)=>handleChangeUsage(order, e.target.value),
                                                            className: `px-3 py-1 rounded-full text-xs font-semibold border ${getOrderStatusColor(order.trang_thai_su_dung)}`,
                                                            children: usageOptions.map((op)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: op.value,
                                                                    children: op.label
                                                                }, op.value, false, {
                                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                    lineNumber: 641,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                            lineNumber: 635,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 634,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: order.thanh_toan || '',
                                                            onChange: (e)=>handleChangePayment(order, e.target.value),
                                                            className: `px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentStatusColor(order.thanh_toan)}`,
                                                            children: paymentOptions.map((op)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: op.value,
                                                                    children: op.label
                                                                }, op.value, false, {
                                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                    lineNumber: 652,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                            lineNumber: 646,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 645,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-xs text-gray-900",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        "URL: ",
                                                                        order.host_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: normalizeUrl(order.host_url),
                                                                            target: "_blank",
                                                                            rel: "noopener noreferrer",
                                                                            className: "text-blue-600 hover:underline",
                                                                            children: order.host_url
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                            lineNumber: 660,
                                                                            columnNumber: 27
                                                                        }, this) : '-',
                                                                        order.host_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>copyToClipboard(order.host_url, 'url'),
                                                                            className: "ml-2 p-1 text-gray-600 hover:text-blue-600",
                                                                            title: "Copy URL",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                                lineNumber: 668,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                            lineNumber: 667,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                    lineNumber: 658,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                "User: ",
                                                                                order.host_username || '-'
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                            lineNumber: 673,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        order.host_username && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>copyToClipboard(order.host_username, 'username'),
                                                                            className: "p-1 text-gray-600 hover:text-blue-600",
                                                                            title: "Copy user",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                                lineNumber: 676,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                            lineNumber: 675,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                    lineNumber: 672,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                "Pass: ",
                                                                                order.host_password || '-'
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                            lineNumber: 681,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        order.host_password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>copyToClipboard(order.host_password, 'password'),
                                                                            className: "p-1 text-gray-600 hover:text-blue-600",
                                                                            title: "Copy mật khẩu",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                                lineNumber: 684,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                            lineNumber: 683,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                    lineNumber: 680,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                            lineNumber: 657,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 656,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-sm text-gray-600",
                                                        children: order.createdDate
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 690,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-sm text-gray-600",
                                                        children: formatExpireDiff(order._raw?.ngay_dat_hang || order._raw?.created_at || order._raw?.created, order.ngay_het_han)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 691,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-600",
                                                                children: formatCustomerLabel(order)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                lineNumber: 694,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                            lineNumber: 693,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-bold text-gray-900",
                                                            children: order.gia_tri ? `${formatVND(order.gia_tri)}₫` : '-'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                            lineNumber: 698,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 697,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors",
                                                                    onClick: ()=>sendEmailToCustomer(order),
                                                                    title: "Gửi email",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                        lineNumber: 703,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                    lineNumber: 702,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors",
                                                                    onClick: ()=>handleEdit(order),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                        lineNumber: 706,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                    lineNumber: 705,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors",
                                                                    onClick: ()=>handleDelete(order),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                        lineNumber: 709,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                                    lineNumber: 708,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                            lineNumber: 701,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 700,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, order.id, true, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 624,
                                                columnNumber: 17
                                            }, this)),
                                        sortedOrders.length === 0 && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 10,
                                                className: "px-4 py-6 text-center text-gray-500",
                                                children: "Không có đơn hàng"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 717,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 716,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                    lineNumber: 622,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                            lineNumber: 607,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 606,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: [
                                    "Tổng: ",
                                    totalItems,
                                    " bản ghi"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 725,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                        className: "px-3 py-2 border rounded",
                                        children: "Trước"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 727,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: [
                                            "Trang ",
                                            page,
                                            "/",
                                            totalPages || 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 728,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((p)=>totalPages ? Math.min(totalPages, p + 1) : p + 1),
                                        className: "px-3 py-2 border rounded",
                                        children: "Sau"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 729,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: perPage,
                                        onChange: (e)=>{
                                            setPerPage(Number(e.target.value));
                                            setPage(1);
                                        },
                                        className: "px-2 py-2 border rounded text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 10,
                                                children: "10"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 731,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 20,
                                                children: "20"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 732,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: 50,
                                                children: "50"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 733,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 730,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 726,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 724,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                lineNumber: 568,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showFormModal,
                onClose: ()=>setShowFormModal(false),
                title: selectedOrder ? 'Sửa đơn hàng' : 'Tạo đơn hàng',
                size: "lg",
                children: [
                    selectedOrder && (()=>{
                        const parsed = parseGhiChu(ghiChuNoiBo);
                        if (!parsed) return null;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide",
                                    children: "Thông tin đơn hàng (từ ghi chú)"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                    lineNumber: 746,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 md:grid-cols-3 gap-3 text-sm",
                                    children: [
                                        parsed.khach && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Khách:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 748,
                                                    columnNumber: 39
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: parsed.khach
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 748,
                                                    columnNumber: 85
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 748,
                                            columnNumber: 34
                                        }, this),
                                        parsed.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Email:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 749,
                                                    columnNumber: 39
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: parsed.email
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 749,
                                                    columnNumber: 85
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 749,
                                            columnNumber: 34
                                        }, this),
                                        parsed.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "SĐT:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 39
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: parsed.phone
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 83
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 750,
                                            columnNumber: 34
                                        }, this),
                                        parsed.domain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Domain:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 751,
                                                    columnNumber: 40
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-blue-600",
                                                    children: parsed.domain
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 751,
                                                    columnNumber: 87
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 751,
                                            columnNumber: 35
                                        }, this),
                                        parsed.sanPham && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Sản phẩm:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 752,
                                                    columnNumber: 41
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: parsed.sanPham
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 752,
                                                    columnNumber: 90
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 752,
                                            columnNumber: 36
                                        }, this),
                                        parsed.soThang > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Thời hạn:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 753,
                                                    columnNumber: 45
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: [
                                                        parsed.soThang,
                                                        " tháng"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 753,
                                                    columnNumber: 94
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 753,
                                            columnNumber: 40
                                        }, this),
                                        parsed.voucher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Voucher:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 754,
                                                    columnNumber: 41
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-purple-600",
                                                    children: parsed.voucher
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 754,
                                                    columnNumber: 89
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 754,
                                            columnNumber: 36
                                        }, this),
                                        parsed.tamTinh && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Tạm tính:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 755,
                                                    columnNumber: 41
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: parsed.tamTinh
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 755,
                                                    columnNumber: 90
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 755,
                                            columnNumber: 36
                                        }, this),
                                        parsed.giamGia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Giảm giá:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 756,
                                                    columnNumber: 41
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-red-600",
                                                    children: [
                                                        "-",
                                                        parsed.giamGia
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 756,
                                                    columnNumber: 90
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 756,
                                            columnNumber: 36
                                        }, this),
                                        parsed.tong && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Tổng:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 757,
                                                    columnNumber: 38
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-green-700 text-base",
                                                    children: parsed.tong
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 757,
                                                    columnNumber: 83
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 757,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                    lineNumber: 747,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                            lineNumber: 745,
                            columnNumber: 13
                        }, this);
                    })(),
                    selectedOrder?._raw?.sepay && (()=>{
                        const sepay = selectedOrder._raw.sepay;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 769,
                                            columnNumber: 17
                                        }, this),
                                        " Thông tin thanh toán SePay"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                    lineNumber: 768,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-3 text-sm",
                                    children: [
                                        sepay.content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Nội dung CK:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 774,
                                                    columnNumber: 21
                                                }, this),
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "bg-white px-2 py-1 rounded border text-sm font-mono",
                                                    children: sepay.content
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 775,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>copyToClipboard(sepay.content, 'url'),
                                                    className: "ml-2 p-1 text-gray-500 hover:text-blue-600 inline-flex",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                        lineNumber: 776,
                                                        columnNumber: 150
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 776,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 773,
                                            columnNumber: 19
                                        }, this),
                                        sepay.amount != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Số tiền:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 779,
                                                    columnNumber: 47
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-green-700",
                                                    children: [
                                                        formatVND(sepay.amount),
                                                        "₫"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 779,
                                                    columnNumber: 95
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 779,
                                            columnNumber: 42
                                        }, this),
                                        sepay.transaction_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Mã GD:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 780,
                                                    columnNumber: 47
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono",
                                                    children: sepay.transaction_id
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 780,
                                                    columnNumber: 93
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 780,
                                            columnNumber: 42
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500",
                                                    children: "Trạng thái:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 782,
                                                    columnNumber: 19
                                                }, this),
                                                ' ',
                                                selectedOrder.thanh_toan === 'da_thanh_toan' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-1 text-green-700 font-semibold",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                            lineNumber: 784,
                                                            columnNumber: 101
                                                        }, this),
                                                        "Đã thanh toán"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 784,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-1 text-red-600 font-semibold",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                            lineNumber: 785,
                                                            columnNumber: 99
                                                        }, this),
                                                        "Chưa thanh toán"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                            lineNumber: 781,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                    lineNumber: 771,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                            lineNumber: 767,
                            columnNumber: 13
                        }, this);
                    })(),
                    selectedOrder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 flex flex-wrap gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-500",
                                        children: "Thanh toán:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 797,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-3 py-1.5 rounded-full text-xs font-bold ${getPaymentStatusColor(thanhToan)}`,
                                        children: paymentStatusLabel(thanhToan)
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 798,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 796,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-500",
                                        children: "Sử dụng:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 803,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-3 py-1.5 rounded-full text-xs font-bold ${getOrderStatusColor(trangThaiSuDung)}`,
                                        children: usageOptions.find((o)=>o.value === trangThaiSuDung)?.label || trangThaiSuDung
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 804,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 802,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 795,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Mã đơn hàng (tự sinh nếu bỏ trống)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 813,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: maDonHang,
                                        onChange: (e)=>setMaDonHang(e.target.value),
                                        className: "w-full px-3 py-2 border rounded",
                                        placeholder: "Bỏ trống để hệ thống tự tạo"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 814,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 812,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Khách hàng"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 817,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: khachHangId,
                                        onChange: (e)=>setKhachHangId(e.target.value),
                                        className: "w-full px-3 py-2 border rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "-- Chọn khách hàng --"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 819,
                                                columnNumber: 15
                                            }, this),
                                            userOptions.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: u.id,
                                                    children: u.label
                                                }, u.id, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 821,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 818,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 816,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Sản phẩm"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 826,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: sanPhamId,
                                        onChange: (e)=>setSanPhamId(e.target.value),
                                        className: "w-full px-3 py-2 border rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "-- Chọn sản phẩm --"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 828,
                                                columnNumber: 15
                                            }, this),
                                            productOptions.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: p.id,
                                                    children: p.name
                                                }, p.id, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 830,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 827,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 825,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Server"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 835,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: serverId,
                                        onChange: (e)=>setServerId(e.target.value),
                                        className: "w-full px-3 py-2 border rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "-- Chọn server --"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 837,
                                                columnNumber: 15
                                            }, this),
                                            serverOptions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: s.id,
                                                    children: s.label
                                                }, s.id, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 839,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 836,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 834,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Thanh toán"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 844,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: thanhToan,
                                        onChange: (e)=>setThanhToan(e.target.value),
                                        className: `w-full px-3 py-2 border rounded font-semibold ${getPaymentStatusColor(thanhToan)}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "cho_thanh_toan",
                                                children: "Chưa thanh toán"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 846,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "da_thanh_toan",
                                                children: "Đã thanh toán"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 847,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "da_kich_hoat",
                                                children: "Đã kích hoạt"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 848,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "tam_giu",
                                                children: "Tạm giữ"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 849,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "da_huy",
                                                children: "Đã hủy"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 850,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "da_hoan_tien",
                                                children: "Đã hoàn tiền"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 851,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "het_han",
                                                children: "Hết hạn"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 852,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 845,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 843,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Trạng thái sử dụng"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 856,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: trangThaiSuDung,
                                        onChange: (e)=>setTrangThaiSuDung(e.target.value),
                                        className: `w-full px-3 py-2 border rounded font-semibold ${getOrderStatusColor(trangThaiSuDung)}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "dang_su_dung",
                                                children: "Đang sử dụng"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 858,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "het_han_su_dung",
                                                children: "Hết hạn sử dụng"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 859,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "tat_tam_thoi",
                                                children: "Tắt tạm thời"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 860,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bi_khoa_vinh_vien",
                                                children: "Bị khóa vĩnh viễn"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 861,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 857,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 855,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Giá trị"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 865,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: giaTri,
                                                onChange: (e)=>setGiaTri(e.target.value),
                                                className: "w-full px-3 py-2 border rounded pr-12"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 867,
                                                columnNumber: 15
                                            }, this),
                                            giaTri && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500",
                                                children: [
                                                    formatVND(giaTri),
                                                    "₫"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 868,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 866,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 864,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Hoa hồng AFF"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 872,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: hoaHongChoAff,
                                        onChange: (e)=>setHoaHongChoAff(e.target.value),
                                        className: "w-full px-3 py-2 border rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 873,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 871,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Ngày hết hạn"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 876,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: ngayHetHan,
                                        onChange: (e)=>setNgayHetHan(e.target.value),
                                        className: "w-full px-3 py-2 border rounded",
                                        placeholder: "2022-01-01 10:00:00.000Z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 877,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 875,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:col-span-2 border-t pt-4 mt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide",
                                    children: "Thông tin Host"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                    lineNumber: 882,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 881,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Host URL"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 885,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: hostUrl,
                                                onChange: (e)=>setHostUrl(e.target.value),
                                                className: "flex-1 px-3 py-2 border rounded font-mono text-sm",
                                                placeholder: "https://"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 887,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>copyToClipboard(hostUrl, 'url'),
                                                className: "px-3 py-2 border rounded text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                                                title: "Copy URL",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 888,
                                                    columnNumber: 208
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 888,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 886,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 884,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Host Username"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 892,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: hostUsername,
                                                onChange: (e)=>setHostUsername(e.target.value),
                                                className: "flex-1 px-3 py-2 border rounded font-mono text-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 894,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>copyToClipboard(hostUsername, 'username'),
                                                className: "px-3 py-2 border rounded text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                                                title: "Copy username",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 895,
                                                    columnNumber: 223
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 895,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 893,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 891,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Host Password"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 899,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: hostPassword,
                                                onChange: (e)=>setHostPassword(e.target.value),
                                                className: "flex-1 px-3 py-2 border rounded font-mono text-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 901,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setHostPassword(generatePassword(16));
                                                },
                                                className: "px-3 py-2 border rounded text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors",
                                                title: "Tạo mật khẩu mới",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 902,
                                                    columnNumber: 231
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 902,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>copyToClipboard(hostPassword, 'password'),
                                                className: "px-3 py-2 border rounded text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                                                title: "Copy password",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                    lineNumber: 903,
                                                    columnNumber: 223
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                                lineNumber: 903,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 900,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 898,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Copy tất cả"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 907,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>copyToClipboard(`URL: ${hostUrl}\nUsername: ${hostUsername}\nPassword: ${hostPassword}`, 'url'),
                                        className: "w-full px-3 py-2 border-2 border-dashed border-blue-300 rounded text-blue-600 hover:bg-blue-50 font-semibold text-sm transition-colors",
                                        children: "Copy URL + User + Pass"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 908,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 906,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Ghi chú nội bộ"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 918,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: ghiChuNoiBo,
                                        onChange: (e)=>setGhiChuNoiBo(e.target.value),
                                        rows: 4,
                                        className: "w-full px-3 py-2 border rounded text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                        lineNumber: 919,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 917,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 811,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-3 mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowFormModal(false),
                                className: "px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold transition-colors",
                                children: "Hủy"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 923,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                className: "px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2",
                                children: "Lưu"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                                lineNumber: 924,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                        lineNumber: 922,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                lineNumber: 739,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmModal"], {
                isOpen: showDeleteModal,
                onClose: ()=>setShowDeleteModal(false),
                onConfirm: handleConfirmDelete,
                title: "Xóa đơn hàng",
                message: "Bạn có chắc chắn muốn xóa đơn hàng này?",
                confirmText: "Xóa",
                cancelText: "Hủy",
                type: "danger"
            }, void 0, false, {
                fileName: "[project]/components/admin/modules/OrderManagement.tsx",
                lineNumber: 930,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/admin/modules/OrderManagement.tsx",
        lineNumber: 527,
        columnNumber: 5
    }, this);
}
_s(OrderManagement, "pg5NrYH9HnXzjj3jHZwbwTQnysg=");
_c = OrderManagement;
var _c;
__turbopack_context__.k.register(_c, "OrderManagement");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_admin_modules_OrderManagement_tsx_fb1ccd0a._.js.map