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
"[project]/app/api/admin/users/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pb-admin.ts [app-route] (ecmascript)");
;
;
const USERS_COLLECTION = 'users';
async function GET(req) {
    try {
        const pb = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminPb"])();
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get('page') ?? 1);
        const perPage = Number(searchParams.get('perPage') ?? 50);
        const search = searchParams.get('search') || '';
        const vai_tro = searchParams.get('vai_tro') || '';
        const trang_thai = searchParams.get('trang_thai') || '';
        const id = searchParams.get('id') || '';
        // Single record lookup
        if (id) {
            const record = await pb.collection(USERS_COLLECTION).getOne(id);
            const pbUrl = process.env.PB_URL || ("TURBOPACK compile-time value", "https://api.vmst.host") || 'https://api.vmst.host';
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(mapUser(record, pb, pbUrl));
        }
        const filters = [];
        if (search.trim()) {
            const s = search.trim().replace(/"/g, '\\"');
            filters.push(`(email ~ "${s}" || name ~ "${s}")`);
        }
        if (vai_tro && vai_tro !== 'all') filters.push(`vai_tro = "${vai_tro}"`);
        if (trang_thai && trang_thai !== 'all') filters.push(`trang_thai = "${trang_thai}"`);
        const filter = filters.length ? filters.join(' && ') : undefined;
        const res = await pb.collection(USERS_COLLECTION).getList(page, perPage, {
            filter,
            sort: '-created'
        });
        const pbUrl = process.env.PB_URL || ("TURBOPACK compile-time value", "https://api.vmst.host") || 'https://api.vmst.host';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            items: res.items.map((r)=>mapUser(r, pb, pbUrl)),
            page: res.page,
            perPage: res.perPage,
            totalPages: res.totalPages,
            totalItems: res.totalItems
        });
    } catch (err) {
        console.error('[admin/users GET]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err?.message || 'Không thể tải danh sách người dùng'
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const pb = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminPb"])();
        const data = await req.json();
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('passwordConfirm', data.passwordConfirm);
        if (data.emailVisibility !== undefined) formData.append('emailVisibility', String(data.emailVisibility));
        if (data.verified !== undefined) formData.append('verified', String(data.verified));
        if (data.name) formData.append('name', data.name);
        if (data.bio) formData.append('bio', data.bio);
        if (data.vai_tro) formData.append('vai_tro', data.vai_tro);
        if (data.trang_thai) formData.append('trang_thai', data.trang_thai);
        if (data.so_luong_don_hang) formData.append('so_luong_don_hang', data.so_luong_don_hang);
        if (data.gia_tri_mua) formData.append('gia_tri_mua', data.gia_tri_mua);
        if (data.dang_nhap_lan_cuoi) formData.append('dang_nhap_lan_cuoi', data.dang_nhap_lan_cuoi);
        const record = await pb.collection(USERS_COLLECTION).create(formData);
        const pbUrl = process.env.PB_URL || ("TURBOPACK compile-time value", "https://api.vmst.host") || 'https://api.vmst.host';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(mapUser(record, pb, pbUrl), {
            status: 201
        });
    } catch (err) {
        console.error('[admin/users POST]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err?.message || 'Không thể tạo người dùng'
        }, {
            status: 500
        });
    }
}
async function PATCH(req) {
    try {
        const pb = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminPb"])();
        const { id, ...data } = await req.json();
        if (!id) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Missing id'
        }, {
            status: 400
        });
        const formData = new FormData();
        if (data.email) formData.append('email', data.email);
        if (data.emailVisibility !== undefined) formData.append('emailVisibility', String(data.emailVisibility));
        if (data.verified !== undefined) formData.append('verified', String(data.verified));
        if (data.name !== undefined) formData.append('name', data.name || '');
        if (data.bio !== undefined) formData.append('bio', data.bio || '');
        if (data.vai_tro !== undefined) formData.append('vai_tro', data.vai_tro || '');
        if (data.trang_thai !== undefined) formData.append('trang_thai', data.trang_thai || '');
        if (data.so_luong_don_hang !== undefined) formData.append('so_luong_don_hang', data.so_luong_don_hang || '0');
        if (data.gia_tri_mua !== undefined) formData.append('gia_tri_mua', data.gia_tri_mua || '0');
        if (data.dang_nhap_lan_cuoi !== undefined) formData.append('dang_nhap_lan_cuoi', data.dang_nhap_lan_cuoi || '');
        if (data.password && data.passwordConfirm) {
            formData.append('password', data.password);
            formData.append('passwordConfirm', data.passwordConfirm);
        }
        const record = await pb.collection(USERS_COLLECTION).update(id, formData);
        const pbUrl = process.env.PB_URL || ("TURBOPACK compile-time value", "https://api.vmst.host") || 'https://api.vmst.host';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(mapUser(record, pb, pbUrl));
    } catch (err) {
        console.error('[admin/users PATCH]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err?.message || 'Không thể cập nhật người dùng'
        }, {
            status: 500
        });
    }
}
async function DELETE(req) {
    try {
        const pb = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pb$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminPb"])();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Missing id'
        }, {
            status: 400
        });
        await pb.collection(USERS_COLLECTION).delete(id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    } catch (err) {
        console.error('[admin/users DELETE]', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err?.message || 'Không thể xóa người dùng'
        }, {
            status: 500
        });
    }
}
function mapUser(r, pb, pbUrl) {
    return {
        id: r.id,
        email: r.email || '',
        emailVisibility: r.emailVisibility,
        verified: r.verified,
        name: r.name || '',
        avatar: r.avatar ? pb.files.getUrl(r, r.avatar) : undefined,
        bio: r.bio || '',
        vai_tro: r.vai_tro || '',
        trang_thai: r.trang_thai || 'active',
        so_luong_don_hang: r.so_luong_don_hang || '0',
        gia_tri_mua: r.gia_tri_mua || '0',
        dang_nhap_lan_cuoi: r.dang_nhap_lan_cuoi || '',
        created: r.created,
        updated: r.updated,
        role: r.vai_tro || '',
        status: r.trang_thai || 'active',
        totalOrders: parseInt(r.so_luong_don_hang || '0'),
        totalSpent: parseFloat(r.gia_tri_mua || '0'),
        lastLogin: r.dang_nhap_lan_cuoi || ''
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__db6ff134._.js.map