module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/pb-admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminPb",
    ()=>createAdminPb,
    "getAdminPb",
    ()=>getAdminPb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pocketbase/dist/pocketbase.es.mjs [app-route] (ecmascript)");
;
;
const PB_URL = process.env.PB_URL || ("TURBOPACK compile-time value", "https://api.vmst.host") || 'https://api.vmst.host';
function createAdminPb() {
    const pb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](PB_URL);
    pb.autoCancellation(false);
    return pb;
}
async function getAdminPb() {
    return createAdminPb();
}
}),
"[project]/app/api/admin/orders/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pb-admin.ts [app-route] (ecmascript)");
;
;
const ORDERS_COLLECTION = 'orders';
function generateOrderCode() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
}
async function GET(req) {
    try {
        const pb = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminPb"])();
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get('page') ?? 1);
        const perPage = Number(searchParams.get('perPage') ?? 20);
        const thanh_toan = searchParams.get('thanh_toan') || '';
        const trang_thai_su_dung = searchParams.get('trang_thai_su_dung') || '';
        const search = searchParams.get('search') || '';
        const expand = searchParams.get('expand') || undefined;
        const filters = [];
        if (thanh_toan && thanh_toan !== 'all') filters.push(`thanh_toan = "${thanh_toan}"`);
        if (trang_thai_su_dung && trang_thai_su_dung !== 'all') filters.push(`trang_thai_su_dung = "${trang_thai_su_dung}"`);
        if (search) {
            const s = search.replace(/"/g, '\\"');
            // If search looks like a PocketBase record ID (15 chars alphanumeric), filter by khach_hang relation
            if (/^[a-z0-9]{15}$/.test(s)) {
                filters.push(`khach_hang = "${s}"`);
            } else {
                filters.push(`(ma_don_hang ~ "${s}" || gia_tri ~ "${s}" || host_url ~ "${s}" || host_username ~ "${s}")`);
            }
        }
        const filter = filters.length ? filters.join(' && ') : undefined;
        const res = await pb.collection(ORDERS_COLLECTION).getList(page, perPage, {
            filter,
            sort: '-ngay_dat_hang',
            expand
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            items: res.items,
            page: res.page,
            perPage: res.perPage,
            totalPages: res.totalPages,
            totalItems: res.totalItems
        });
    } catch (err) {
        console.error('[admin/orders GET]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err?.message || 'Không thể tải danh sách đơn hàng'
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const pb = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminPb"])();
        const input = await req.json();
        const payload = {
            ...input
        };
        if (!payload.ma_don_hang || !String(payload.ma_don_hang).trim()) {
            payload.ma_don_hang = generateOrderCode();
        }
        if (!payload.trang_thai_su_dung) payload.trang_thai_su_dung = 'tat_tam_thoi';
        if (!payload.thanh_toan) payload.thanh_toan = 'cho_thanh_toan';
        [
            'server',
            'khach_hang',
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
        const record = await pb.collection(ORDERS_COLLECTION).create(payload);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(record, {
            status: 201
        });
    } catch (err) {
        console.error('[admin/orders POST]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err?.message || 'Không thể tạo đơn hàng'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e55e8f51._.js.map