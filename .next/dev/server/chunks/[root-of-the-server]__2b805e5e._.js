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
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@vmst.host';
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'admin@!@#';
// Singleton — cache admin PB client + token across requests
let cachedPb = null;
let authPromise = null;
async function authenticatePb() {
    const pb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](PB_URL);
    pb.autoCancellation(false);
    try {
        await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    } catch  {
        try {
            await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        } catch  {
            console.error('[pb-admin] All admin auth methods failed');
        }
    }
    return pb;
}
function createAdminPb() {
    const pb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](PB_URL);
    pb.autoCancellation(false);
    return pb;
}
async function getAdminPb() {
    if (cachedPb && cachedPb.authStore.isValid) {
        return cachedPb;
    }
    // Deduplicate concurrent auth calls
    if (!authPromise) {
        authPromise = authenticatePb().then((pb)=>{
            cachedPb = pb;
            authPromise = null;
            return pb;
        }).catch((err)=>{
            authPromise = null;
            throw err;
        });
    }
    return authPromise;
}
}),
"[project]/app/api/admin/orders/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pb-admin.ts [app-route] (ecmascript)");
;
;
const ORDERS_COLLECTION = 'orders';
async function PATCH(req, { params }) {
    try {
        const { id } = await params;
        const pb = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminPb"])();
        const data = await req.json();
        const payload = {
            ...data
        };
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
        const record = await pb.collection(ORDERS_COLLECTION).update(id, payload);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(record);
    } catch (err) {
        console.error('[admin/orders PATCH]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err?.message || 'Không thể cập nhật đơn hàng'
        }, {
            status: 500
        });
    }
}
async function DELETE(_req, { params }) {
    try {
        const { id } = await params;
        const pb = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminPb"])();
        await pb.collection(ORDERS_COLLECTION).delete(id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    } catch (err) {
        console.error('[admin/orders DELETE]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err?.message || 'Không thể xóa đơn hàng'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2b805e5e._.js.map