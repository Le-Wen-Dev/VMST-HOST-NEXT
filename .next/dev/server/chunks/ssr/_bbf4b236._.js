module.exports = [
"[project]/services/products.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
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
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].collection('products').getList(page, perPage, {
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
}),
"[project]/services/blogs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBlog",
    ()=>createBlog,
    "deleteBlog",
    ()=>deleteBlog,
    "getBlogById",
    ()=>getBlogById,
    "getBlogBySlug",
    ()=>getBlogBySlug,
    "getBlogImageUrl",
    ()=>getBlogImageUrl,
    "listBlogs",
    ()=>listBlogs,
    "toSlug",
    ()=>toSlug,
    "updateBlog",
    ()=>updateBlog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-ssr] (ecmascript)");
;
;
async function listBlogs(params = {}) {
    const { page = 1, perPage = 10, search, categoryId, authorId, status, sort = '-created', expand } = params;
    const filters = [];
    if (search) {
        const s = search.replace(/'/g, "\\'");
        filters.push(`(tieu_de~"${s}" || mo_ta_ngan~"${s}" || slug~"${s}")`);
    }
    if (categoryId) filters.push(`danh_muc='${categoryId}'`);
    if (authorId) filters.push(`tac_gia='${authorId}'`);
    if (status) filters.push(`trang_thai='${status}'`);
    const filter = filters.length ? filters.join(' && ') : undefined;
    return await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].collection('blogs').getList(page, perPage, {
        filter,
        sort,
        expand
    });
}
async function getBlogById(id, expand) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].collection('blogs').getOne(id, {
        expand
    });
}
async function getBlogBySlug(slug, expand) {
    const records = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pb"].collection('blogs').getList(1, 1, {
        filter: `slug='${slug}'`,
        expand
    });
    return records.items[0] || null;
}
function toSlug(input) {
    return input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}
// Admin write functions — proxy through /api/admin/blogs
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    return token ? {
        Authorization: `Bearer ${token}`
    } : {};
}
async function createBlog(data) {
    const payload = {
        ...data
    };
    if (!payload.slug && data.tieu_de) payload.slug = toSlug(data.tieu_de);
    const needsForm = payload.thumbnail instanceof File || payload.avatar instanceof File;
    if (needsForm) {
        const fd = new FormData();
        Object.keys(payload).forEach((key)=>{
            const val = payload[key];
            if (val === undefined || val === null) return;
            if ((key === 'thumbnail' || key === 'avatar') && val instanceof File) {
                fd.append(key, val);
            } else {
                fd.append(key, String(val));
            }
        });
        const res = await fetch('/api/admin/blogs', {
            method: 'POST',
            headers: authHeaders(),
            body: fd
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo blog');
        return res.json();
    }
    const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
            ...authHeaders(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo blog');
    return res.json();
}
async function updateBlog(id, data) {
    const payload = {
        ...data
    };
    if (payload.tieu_de && !payload.slug) payload.slug = toSlug(payload.tieu_de);
    const needsForm = payload.thumbnail instanceof File || payload.avatar instanceof File;
    if (needsForm) {
        const fd = new FormData();
        fd.append('id', id);
        Object.keys(payload).forEach((key)=>{
            const val = payload[key];
            if (val === undefined || val === null) return;
            if ((key === 'thumbnail' || key === 'avatar') && val instanceof File) {
                fd.append(key, val);
            } else {
                fd.append(key, String(val));
            }
        });
        const res = await fetch('/api/admin/blogs', {
            method: 'PATCH',
            headers: authHeaders(),
            body: fd
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật blog');
        return res.json();
    }
    const res = await fetch('/api/admin/blogs', {
        method: 'PATCH',
        headers: {
            ...authHeaders(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            ...payload
        })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật blog');
    return res.json();
}
async function deleteBlog(id) {
    const res = await fetch(`/api/admin/blogs?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa blog');
}
function getBlogImageUrl(record) {
    const filename = record?.thumbnail || record?.avatar || '';
    if (!filename) return '';
    if (/^https?:\/\//.test(filename)) return filename;
    const base = ("TURBOPACK compile-time value", "https://api.vmst.host") || 'https://api.vmst.host';
    return `${base.replace(/\/$/, '')}/api/files/blogs/${record.id}/${filename}`;
}
}),
"[project]/utils/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Common formatting helpers
__turbopack_context__.s([
    "formatMoneyVN",
    ()=>formatMoneyVN
]);
function formatMoneyVN(value) {
    if (value === null || value === undefined) return '';
    const num = typeof value === 'string' ? Number(value) : value;
    if (!isFinite(num)) return String(value);
    try {
        return new Intl.NumberFormat('vi-VN').format(num);
    } catch  {
        // Fallback: simple grouping
        return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
}
}),
"[project]/components/SeoContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SeoContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
// ---------- Defaults ----------
const DEFAULT_LINKS = [
    {
        href: '/wordpress-hosting',
        label: 'Hosting WordPress giá rẻ'
    },
    {
        href: '/business-hosting',
        label: 'VPS & Hosting doanh nghiệp'
    },
    {
        href: '/email-domain',
        label: 'Email doanh nghiệp'
    },
    {
        href: '/pricing',
        label: 'Bảng giá dịch vụ'
    },
    {
        href: '/advisor',
        label: 'Tư vấn chọn gói'
    },
    {
        href: '/blog',
        label: 'Blog & Hướng dẫn'
    },
    {
        href: '/contact',
        label: 'Liên hệ tư vấn'
    },
    {
        href: '/support',
        label: 'Trung tâm hỗ trợ'
    }
];
const DEFAULT_TESTIMONIALS = [
    {
        name: 'Anh Tuấn',
        role: 'CEO, Công ty TechViet',
        initials: 'AT',
        text: 'Website công ty chạy nhanh hơn hẳn sau khi chuyển sang VMST Host. Tốc độ load dưới 1 giây, Google PageSpeed đạt 95+. Rất hài lòng!'
    },
    {
        name: 'Chị Hương',
        role: 'Chủ shop Shopee',
        initials: 'CH',
        text: 'Hosting giá rẻ nhưng chất lượng không hề rẻ. Website bán hàng của tôi chạy mượt mà, không bao giờ bị down. Hỗ trợ kỹ thuật rất nhanh.'
    },
    {
        name: 'Anh Đức',
        role: 'Freelancer Developer',
        initials: 'AD',
        text: 'Đã dùng nhiều hosting khác nhau, VMST Host là nơi tôi gắn bó lâu nhất. SSD NVMe thực sự nhanh, DirectAdmin dễ dùng, giá hợp lý.'
    }
];
const DEFAULT_TRUST = [
    {
        icon: '⚡',
        title: 'Tốc độ tải < 1 giây',
        desc: 'SSD NVMe + OpenLiteSpeed cho TTFB dưới 200ms, PageSpeed 90+'
    },
    {
        icon: '📱',
        title: 'Tối ưu Mobile',
        desc: 'Responsive hoàn hảo, Core Web Vitals đạt chuẩn Google trên mọi thiết bị'
    },
    {
        icon: '🔒',
        title: 'Bảo mật toàn diện',
        desc: 'SSL miễn phí, Imunify360, CloudLinux cách ly tài khoản'
    },
    {
        icon: '🔄',
        title: 'Backup tự động',
        desc: 'Sao lưu hàng ngày, khôi phục 1-click, không lo mất dữ liệu'
    },
    {
        icon: '📞',
        title: 'Hỗ trợ 24/7',
        desc: 'Đội ngũ kỹ thuật Việt Nam, phản hồi trong 15 phút qua chat & hotline'
    },
    {
        icon: '🌐',
        title: 'Uptime 99.9%',
        desc: 'Cam kết SLA, hoàn tiền nếu downtime vượt mức cho phép'
    }
];
// ---------- Sub-components ----------
function TrustSection({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 bg-gradient-to-b from-slate-50 to-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-center text-gray-900 mb-2",
                    children: "Tại sao chọn VMST Host?"
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-500 mb-8 text-sm",
                    children: "Trải nghiệm hosting chuyên nghiệp với công nghệ hiện đại nhất"
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-3 gap-4",
                    children: items.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-3xl block mb-2",
                                    children: t.icon
                                }, void 0, false, {
                                    fileName: "[project]/components/SeoContent.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-gray-900 text-sm mb-1",
                                    children: t.title
                                }, void 0, false, {
                                    fileName: "[project]/components/SeoContent.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-xs leading-relaxed",
                                    children: t.desc
                                }, void 0, false, {
                                    fileName: "[project]/components/SeoContent.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/SeoContent.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/SeoContent.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SeoContent.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
function TestimonialSection({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-center text-gray-900 mb-2",
                    children: "Khách hàng nói gì về VMST Host?"
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-500 mb-8 text-sm",
                    children: "Hơn 500+ khách hàng đã tin tưởng sử dụng dịch vụ"
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-3 gap-6",
                    children: items.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-50 rounded-xl p-6 border border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold",
                                            children: t.initials
                                        }, void 0, false, {
                                            fileName: "[project]/components/SeoContent.tsx",
                                            lineNumber: 98,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold text-gray-900 text-sm",
                                                    children: t.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SeoContent.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-500 text-xs",
                                                    children: t.role
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SeoContent.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/SeoContent.tsx",
                                            lineNumber: 101,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SeoContent.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 text-sm leading-relaxed italic",
                                    children: [
                                        "“",
                                        t.text,
                                        "”"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SeoContent.tsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-0.5 mt-3",
                                    children: [
                                        ...Array(5)
                                    ].map((_, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-yellow-400 text-sm",
                                            children: "★"
                                        }, j, false, {
                                            fileName: "[project]/components/SeoContent.tsx",
                                            lineNumber: 109,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/SeoContent.tsx",
                                    lineNumber: 107,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/SeoContent.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/SeoContent.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SeoContent.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
function FaqSection({ faqs }) {
    const [openIdx, setOpenIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 bg-slate-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-center text-gray-900 mb-2",
                    children: "Câu hỏi thường gặp"
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-500 mb-8 text-sm",
                    children: "Giải đáp nhanh các thắc mắc phổ biến"
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: faqs.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg border border-gray-200 overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setOpenIdx(openIdx === i ? null : i),
                                    className: "w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-900 text-sm pr-4",
                                            children: f.q
                                        }, void 0, false, {
                                            fileName: "[project]/components/SeoContent.tsx",
                                            lineNumber: 138,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-400 text-lg flex-shrink-0",
                                            children: openIdx === i ? '−' : '+'
                                        }, void 0, false, {
                                            fileName: "[project]/components/SeoContent.tsx",
                                            lineNumber: 139,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/SeoContent.tsx",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, this),
                                openIdx === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3",
                                    children: f.a
                                }, void 0, false, {
                                    fileName: "[project]/components/SeoContent.tsx",
                                    lineNumber: 144,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/SeoContent.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/SeoContent.tsx",
            lineNumber: 124,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SeoContent.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
function ArticleSection({ article, title }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const preview = article.replace(/<[^>]*>/g, '').slice(0, 200);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto px-4",
            children: [
                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-gray-900 mb-6",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this),
                expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "prose prose-sm max-w-none text-gray-700 leading-relaxed prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md",
                    dangerouslySetInnerHTML: {
                        __html: article
                    }
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 text-sm leading-relaxed",
                    children: [
                        preview,
                        "..."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 176,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setExpanded(!expanded),
                    className: "mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1",
                    children: expanded ? 'Thu gọn ▲' : 'Xem thêm ▼'
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 180,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/SeoContent.tsx",
            lineNumber: 162,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SeoContent.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
function LinksSection({ links }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-10 bg-slate-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-bold text-gray-900 mb-4 text-center",
                    children: "Khám phá thêm dịch vụ"
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap justify-center gap-3",
                    children: links.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: l.href,
                            className: "px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors",
                            children: l.label
                        }, i, false, {
                            fileName: "[project]/components/SeoContent.tsx",
                            lineNumber: 200,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/SeoContent.tsx",
                    lineNumber: 198,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/SeoContent.tsx",
            lineNumber: 194,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SeoContent.tsx",
        lineNumber: 193,
        columnNumber: 5
    }, this);
}
function SeoContent({ article, articleTitle, faqs, testimonials = DEFAULT_TESTIMONIALS, links = DEFAULT_LINKS, trustItems = DEFAULT_TRUST }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-16 border-t border-gray-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TrustSection, {
                items: trustItems
            }, void 0, false, {
                fileName: "[project]/components/SeoContent.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TestimonialSection, {
                items: testimonials
            }, void 0, false, {
                fileName: "[project]/components/SeoContent.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FaqSection, {
                faqs: faqs
            }, void 0, false, {
                fileName: "[project]/components/SeoContent.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArticleSection, {
                article: article,
                title: articleTitle
            }, void 0, false, {
                fileName: "[project]/components/SeoContent.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LinksSection, {
                links: links
            }, void 0, false, {
                fileName: "[project]/components/SeoContent.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SeoContent.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, this);
}
}),
"[project]/data/seo-articles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SEO article data for each public page
// Each page gets a unique ~1500-word article + FAQs
__turbopack_context__.s([
    "seoData",
    ()=>seoData
]);
const seoData = {
    home: {
        articleTitle: 'Hosting Việt Nam Giá Rẻ Tốc Độ Cao — Tại Sao VMST Host Là Lựa Chọn Hàng Đầu?',
        article: `
<p>Trong thời đại số hóa, <strong>hosting chất lượng cao</strong> là nền tảng quyết định sự thành công của mọi website. Dù bạn đang xây dựng blog cá nhân, website bán hàng online hay hệ thống quản lý doanh nghiệp, việc chọn đúng nhà cung cấp hosting sẽ ảnh hưởng trực tiếp đến tốc độ tải trang, trải nghiệm người dùng và thứ hạng SEO trên Google.</p>

<h2>Hosting Giá Rẻ Không Có Nghĩa Là Chất Lượng Thấp</h2>
<p>Nhiều người thường nghĩ rằng <strong>hosting giá rẻ</strong> đồng nghĩa với tốc độ chậm, hay bị down và hỗ trợ kém. Tuy nhiên, với công nghệ hiện đại như <strong>SSD NVMe</strong>, <strong>OpenLiteSpeed</strong> và <strong>CloudLinux</strong>, VMST Host chứng minh rằng bạn hoàn toàn có thể sở hữu hosting tốc độ cao với chi phí hợp lý.</p>

<img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" alt="Server hosting hiện đại tốc độ cao" style="width:100%;border-radius:12px;margin:16px 0" />

<p>Với mức giá chỉ từ <strong>29.000đ/tháng</strong>, bạn đã có thể sở hữu gói hosting WordPress với đầy đủ tính năng: SSL miễn phí, email theo tên miền, backup tự động hàng ngày và bảng điều khiển DirectAdmin dễ sử dụng.</p>

<h2>Tốc Độ Tải Trang — Yếu Tố Sống Còn Cho SEO</h2>
<p>Google đã chính thức xác nhận rằng <strong>tốc độ tải trang</strong> là một trong những yếu tố xếp hạng quan trọng. Theo nghiên cứu, 53% người dùng mobile sẽ rời trang nếu thời gian tải vượt quá 3 giây. VMST Host cam kết <strong>TTFB dưới 200ms</strong> và <strong>PageSpeed Score 90+</strong> cho mọi gói hosting.</p>

<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Tối ưu tốc độ website PageSpeed" style="width:100%;border-radius:12px;margin:16px 0" />

<h3>Core Web Vitals — Tiêu Chuẩn Mới Của Google</h3>
<p>Từ năm 2021, Google đưa <strong>Core Web Vitals</strong> vào thuật toán xếp hạng. Ba chỉ số quan trọng bao gồm:</p>
<ul>
<li><strong>LCP (Largest Contentful Paint)</strong>: Thời gian hiển thị nội dung lớn nhất — dưới 2.5 giây</li>
<li><strong>FID (First Input Delay)</strong>: Thời gian phản hồi tương tác đầu tiên — dưới 100ms</li>
<li><strong>CLS (Cumulative Layout Shift)</strong>: Độ ổn định bố cục trang — dưới 0.1</li>
</ul>
<p>Tất cả gói hosting tại VMST Host đều được tối ưu để đạt chuẩn Core Web Vitals, giúp website của bạn có lợi thế cạnh tranh trên kết quả tìm kiếm.</p>

<h2>Tối Ưu Mobile — Xu Hướng Không Thể Bỏ Qua</h2>
<p>Hơn 70% lưu lượng truy cập internet tại Việt Nam đến từ thiết bị di động. Một website không tối ưu cho mobile sẽ mất đi phần lớn khách hàng tiềm năng. VMST Host cung cấp hosting với <strong>HTTP/3</strong>, <strong>Brotli compression</strong> và <strong>CDN tích hợp</strong> để đảm bảo website tải nhanh trên mọi thiết bị.</p>

<img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" alt="Website tối ưu mobile responsive" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Bảo Mật Website — Ưu Tiên Hàng Đầu</h2>
<p>An ninh mạng là mối quan tâm lớn của mọi chủ website. VMST Host trang bị hệ thống bảo mật đa lớp:</p>
<ul>
<li><strong>SSL/TLS miễn phí</strong> — Mã hóa dữ liệu truyền tải, tăng uy tín với Google</li>
<li><strong>Imunify360</strong> — Phát hiện và ngăn chặn malware, brute force tự động</li>
<li><strong>CloudLinux</strong> — Cách ly tài khoản, một website bị tấn công không ảnh hưởng website khác</li>
<li><strong>Firewall WAF</strong> — Chặn các cuộc tấn công SQL injection, XSS, DDoS</li>
</ul>

<h2>Backup Tự Động — An Tâm Dữ Liệu</h2>
<p>Mất dữ liệu website là cơn ác mộng của mọi chủ doanh nghiệp. VMST Host thực hiện <strong>backup tự động hàng ngày</strong> và lưu trữ trong 7 ngày. Bạn có thể khôi phục website chỉ với 1 click từ bảng điều khiển DirectAdmin, không cần kiến thức kỹ thuật.</p>

<h2>Hỗ Trợ Kỹ Thuật 24/7 Bằng Tiếng Việt</h2>
<p>Khác với nhiều nhà cung cấp hosting quốc tế, VMST Host có đội ngũ kỹ thuật <strong>người Việt Nam</strong>, hỗ trợ qua chat, hotline và email. Thời gian phản hồi trung bình chỉ <strong>15 phút</strong>, giúp bạn giải quyết mọi vấn đề nhanh chóng mà không gặp rào cản ngôn ngữ.</p>

<h2>So Sánh VMST Host Với Các Nhà Cung Cấp Khác</h2>
<p>Khi so sánh với các nhà cung cấp hosting phổ biến tại Việt Nam, VMST Host nổi bật ở các điểm:</p>
<ul>
<li>Giá thành cạnh tranh nhất phân khúc — từ 29.000đ/tháng</li>
<li>SSD NVMe thay vì SSD SATA thông thường — nhanh gấp 6 lần</li>
<li>OpenLiteSpeed thay vì Apache — xử lý đồng thời tốt hơn 10 lần</li>
<li>Hỗ trợ tiếng Việt 24/7 — không phải chờ đợi timezone khác</li>
<li>Cam kết uptime 99.9% với SLA rõ ràng</li>
</ul>

<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Dashboard quản lý hosting chuyên nghiệp" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Bắt Đầu Với VMST Host Ngay Hôm Nay</h2>
<p>Dù bạn là cá nhân, freelancer hay doanh nghiệp, VMST Host có gói hosting phù hợp cho mọi nhu cầu. Với chính sách <strong>hoàn tiền trong 30 ngày</strong>, bạn hoàn toàn yên tâm trải nghiệm dịch vụ mà không lo rủi ro. Hãy bắt đầu xây dựng website chuyên nghiệp với hosting tốc độ cao, bảo mật vượt trội và hỗ trợ tận tâm từ VMST Host.</p>

<img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" alt="Đội ngũ hỗ trợ kỹ thuật VMST Host" style="width:100%;border-radius:12px;margin:16px 0" />
`,
        faqs: [
            {
                q: 'VMST Host có phù hợp cho người mới bắt đầu không?',
                a: 'Hoàn toàn phù hợp! VMST Host cung cấp bảng điều khiển DirectAdmin dễ sử dụng, cài đặt WordPress 1-click và đội ngũ hỗ trợ tiếng Việt 24/7 sẵn sàng giúp bạn.'
            },
            {
                q: 'Tốc độ hosting có thực sự nhanh như quảng cáo?',
                a: 'VMST Host sử dụng SSD NVMe + OpenLiteSpeed, đảm bảo TTFB dưới 200ms. Bạn có thể kiểm tra bằng Google PageSpeed Insights sau khi đăng ký.'
            },
            {
                q: 'Có được dùng thử miễn phí không?',
                a: 'VMST Host có chính sách hoàn tiền trong 30 ngày nếu bạn không hài lòng với dịch vụ, đảm bảo không rủi ro khi trải nghiệm.'
            },
            {
                q: 'Hosting có bao gồm SSL miễn phí không?',
                a: 'Có, tất cả gói hosting đều bao gồm SSL Let\'s Encrypt miễn phí, tự động gia hạn, giúp website bảo mật và tăng thứ hạng SEO.'
            },
            {
                q: 'Tôi có thể nâng cấp gói hosting sau này không?',
                a: 'Có, bạn có thể nâng cấp gói hosting bất cứ lúc nào từ bảng điều khiển. Dữ liệu được giữ nguyên, không cần di chuyển.'
            },
            {
                q: 'VMST Host có hỗ trợ chuyển hosting từ nhà cung cấp khác không?',
                a: 'Có, đội ngũ kỹ thuật sẽ hỗ trợ chuyển website miễn phí từ nhà cung cấp cũ sang VMST Host, đảm bảo không mất dữ liệu.'
            }
        ]
    },
    wordpress: {
        articleTitle: 'WordPress Hosting Giá Rẻ Tốc Độ Cao — Giải Pháp Tối Ưu Cho Website WordPress',
        article: `
<p><strong>WordPress</strong> là nền tảng quản lý nội dung phổ biến nhất thế giới, chiếm hơn 43% tổng số website trên internet. Tuy nhiên, để WordPress hoạt động mượt mà và đạt hiệu suất tối đa, bạn cần một giải pháp <strong>hosting được tối ưu riêng cho WordPress</strong>.</p>

<h2>Tại Sao Cần Hosting Chuyên Dụng Cho WordPress?</h2>
<p>WordPress là một CMS mạnh mẽ nhưng cũng đòi hỏi tài nguyên server đáng kể. Một gói shared hosting thông thường có thể khiến website WordPress của bạn chạy chậm, đặc biệt khi có nhiều plugin và lượng truy cập cao. <strong>WordPress Hosting</strong> tại VMST Host được thiết kế riêng với:</p>
<ul>
<li><strong>OpenLiteSpeed</strong> — Web server nhanh nhất cho WordPress, tương thích hoàn hảo với LiteSpeed Cache</li>
<li><strong>PHP 8.x</strong> — Phiên bản PHP mới nhất, nhanh hơn 3 lần so với PHP 7</li>
<li><strong>WordPress Toolkit</strong> — Quản lý, cập nhật và bảo mật WordPress từ một giao diện</li>
<li><strong>Staging Environment</strong> — Thử nghiệm thay đổi trước khi áp dụng lên website chính</li>
</ul>

<img src="https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80" alt="WordPress hosting tốc độ cao" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>OpenLiteSpeed — Bí Quyết Tốc Độ Vượt Trội</h2>
<p><strong>OpenLiteSpeed</strong> là phiên bản mã nguồn mở của LiteSpeed Web Server, nổi tiếng với khả năng xử lý WordPress nhanh hơn Apache gấp 10 lần. Kết hợp với <strong>LiteSpeed Cache plugin</strong> (miễn phí), website WordPress của bạn sẽ đạt tốc độ tải trang dưới 1 giây.</p>

<p>LiteSpeed Cache không chỉ là plugin cache thông thường. Nó tích hợp sâu với web server để cung cấp:</p>
<ul>
<li>Page cache ở cấp server — nhanh hơn plugin cache PHP</li>
<li>Tối ưu hình ảnh tự động (WebP conversion)</li>
<li>Minify CSS/JS và lazy loading</li>
<li>CDN tích hợp (QUIC.cloud)</li>
</ul>

<h2>Cài Đặt WordPress 1-Click</h2>
<p>Với VMST Host, bạn có thể cài đặt WordPress chỉ trong <strong>30 giây</strong> thông qua WordPress Toolkit trên DirectAdmin. Không cần tải file, tạo database hay chỉnh sửa wp-config.php thủ công. Mọi thứ được tự động hóa hoàn toàn.</p>

<img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" alt="Cài đặt WordPress dễ dàng" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Bảo Mật WordPress Toàn Diện</h2>
<p>WordPress là mục tiêu hàng đầu của hacker do sự phổ biến của nó. VMST Host bảo vệ website WordPress của bạn với nhiều lớp bảo mật:</p>
<ul>
<li><strong>Imunify360</strong> — Quét và loại bỏ malware tự động</li>
<li><strong>ModSecurity WAF</strong> — Chặn các cuộc tấn công phổ biến (SQL injection, XSS)</li>
<li><strong>Brute Force Protection</strong> — Giới hạn số lần đăng nhập sai</li>
<li><strong>Auto-update</strong> — Tự động cập nhật WordPress core và plugin bảo mật</li>
</ul>

<h2>Tối Ưu SEO Cho WordPress</h2>
<p>Hosting nhanh là nền tảng cho SEO tốt. Kết hợp với các plugin SEO như Yoast SEO hoặc Rank Math, website WordPress trên VMST Host sẽ có lợi thế lớn trên kết quả tìm kiếm Google:</p>
<ul>
<li>TTFB dưới 200ms — Google ưu tiên website tải nhanh</li>
<li>Core Web Vitals đạt chuẩn — LCP, FID, CLS đều trong ngưỡng tốt</li>
<li>SSL miễn phí — HTTPS là yếu tố xếp hạng của Google</li>
<li>Uptime 99.9% — Website luôn sẵn sàng khi Googlebot crawl</li>
</ul>

<img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80" alt="SEO WordPress tối ưu" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>WooCommerce Hosting — Bán Hàng Online Chuyên Nghiệp</h2>
<p>Nếu bạn sử dụng <strong>WooCommerce</strong> để bán hàng online, VMST Host là lựa chọn lý tưởng. Gói hosting WordPress được tối ưu cho WooCommerce với database query caching, object caching và đủ tài nguyên để xử lý hàng nghìn sản phẩm và đơn hàng đồng thời.</p>

<h2>So Sánh WordPress Hosting VMST Host</h2>
<p>VMST Host cung cấp nhiều gói WordPress Hosting phù hợp với mọi quy mô:</p>
<ul>
<li><strong>WP Starter</strong> — 1 website, 5GB SSD, phù hợp blog cá nhân</li>
<li><strong>WP Business</strong> — 5 website, 20GB SSD, phù hợp doanh nghiệp nhỏ</li>
<li><strong>WP Pro</strong> — Unlimited website, 50GB SSD, phù hợp agency và developer</li>
</ul>
<p>Tất cả gói đều bao gồm SSL miễn phí, email theo tên miền, backup hàng ngày và hỗ trợ 24/7.</p>

<img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80" alt="Quản lý website WordPress chuyên nghiệp" style="width:100%;border-radius:12px;margin:16px 0" />
`,
        faqs: [
            {
                q: 'WordPress Hosting khác gì Shared Hosting thông thường?',
                a: 'WordPress Hosting được tối ưu riêng cho WordPress với OpenLiteSpeed, LiteSpeed Cache, WordPress Toolkit và cấu hình PHP tối ưu. Shared hosting thông thường dùng Apache và không có các tối ưu này.'
            },
            {
                q: 'Tôi có thể cài plugin và theme tùy ý không?',
                a: 'Có, bạn có toàn quyền cài đặt bất kỳ plugin và theme nào. VMST Host không giới hạn số lượng plugin.'
            },
            {
                q: 'Website WordPress có tự động được backup không?',
                a: 'Có, hệ thống backup tự động hàng ngày và lưu trữ 7 ngày. Bạn có thể khôi phục 1-click từ DirectAdmin.'
            },
            {
                q: 'Hosting có hỗ trợ WooCommerce không?',
                a: 'Có, tất cả gói WordPress Hosting đều hỗ trợ WooCommerce. Gói WP Business trở lên được khuyến nghị cho cửa hàng online.'
            },
            {
                q: 'Tôi có thể chuyển website WordPress từ hosting khác sang không?',
                a: 'Có, đội ngũ kỹ thuật sẽ hỗ trợ migrate website WordPress miễn phí, đảm bảo không downtime và không mất dữ liệu.'
            },
            {
                q: 'OpenLiteSpeed có tương thích với tất cả plugin WordPress không?',
                a: 'OpenLiteSpeed tương thích với hầu hết plugin WordPress. Một số plugin yêu cầu .htaccess có thể cần điều chỉnh nhỏ, đội ngũ hỗ trợ sẽ giúp bạn.'
            }
        ]
    },
    business: {
        articleTitle: 'VPS & Business Hosting Doanh Nghiệp — Hiệu Suất Cao, Bảo Mật Tuyệt Đối',
        article: `
<p>Khi doanh nghiệp phát triển, website cần nhiều tài nguyên hơn để đáp ứng lượng truy cập tăng cao và các ứng dụng phức tạp. <strong>Business Hosting</strong> tại VMST Host được thiết kế cho các doanh nghiệp cần hiệu suất ổn định, bảo mật cao và khả năng mở rộng linh hoạt.</p>

<h2>Business Hosting vs Shared Hosting — Khi Nào Cần Nâng Cấp?</h2>
<p>Nếu website của bạn đang gặp các vấn đề sau, đã đến lúc chuyển sang Business Hosting:</p>
<ul>
<li>Tốc độ tải trang chậm dần khi lượng truy cập tăng</li>
<li>Website thường xuyên bị lỗi 503 hoặc timeout</li>
<li>Cần chạy ứng dụng Node.js, Python hoặc Java bên cạnh PHP</li>
<li>Yêu cầu bảo mật cao cho dữ liệu khách hàng</li>
<li>Cần nhiều database và email hơn gói shared hosting cho phép</li>
</ul>

<img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" alt="Server doanh nghiệp hiệu suất cao" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Tài Nguyên Riêng Biệt — Không Chia Sẻ</h2>
<p>Khác với shared hosting nơi hàng trăm website chia sẻ cùng một server, <strong>Business Hosting</strong> cung cấp tài nguyên được cách ly hoàn toàn bằng <strong>CloudLinux</strong>. Điều này đảm bảo:</p>
<ul>
<li>CPU và RAM được phân bổ riêng cho website của bạn</li>
<li>Website khác trên cùng server không ảnh hưởng đến hiệu suất của bạn</li>
<li>Khả năng xử lý đồng thời hàng nghìn request mà không bị chậm</li>
</ul>

<h2>Hỗ Trợ Đa Công Nghệ</h2>
<p>Business Hosting tại VMST Host không giới hạn ở PHP. Bạn có thể chạy:</p>
<ul>
<li><strong>PHP 7.4 — 8.3</strong> với tất cả extension phổ biến</li>
<li><strong>Node.js</strong> cho ứng dụng real-time và API</li>
<li><strong>Python</strong> cho machine learning và data processing</li>
<li><strong>MySQL / MariaDB</strong> với query optimization</li>
<li><strong>Redis / Memcached</strong> cho object caching</li>
</ul>

<img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80" alt="Lập trình đa công nghệ" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Bảo Mật Cấp Doanh Nghiệp</h2>
<p>Dữ liệu khách hàng là tài sản quý giá nhất của doanh nghiệp. VMST Host bảo vệ dữ liệu của bạn với:</p>
<ul>
<li><strong>SSL Wildcard</strong> — Bảo mật tất cả subdomain</li>
<li><strong>DDoS Protection</strong> — Chống tấn công từ chối dịch vụ</li>
<li><strong>Imunify360 Pro</strong> — Bảo mật chủ động với AI</li>
<li><strong>Backup offsite</strong> — Sao lưu tại datacenter khác để đảm bảo an toàn</li>
</ul>

<h2>Uptime 99.9% — Cam Kết SLA</h2>
<p>Downtime đồng nghĩa với mất doanh thu. VMST Host cam kết <strong>uptime 99.9%</strong> với SLA rõ ràng. Nếu uptime không đạt mức cam kết, bạn sẽ được hoàn tiền theo tỷ lệ tương ứng. Hệ thống monitoring 24/7 phát hiện và xử lý sự cố trước khi ảnh hưởng đến website của bạn.</p>

<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Monitoring server 24/7" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Mở Rộng Linh Hoạt</h2>
<p>Doanh nghiệp phát triển, hosting cũng cần phát triển theo. Với VMST Host, bạn có thể nâng cấp tài nguyên (CPU, RAM, SSD) bất cứ lúc nào mà không cần di chuyển website. Quá trình nâng cấp diễn ra trong vài phút, không downtime.</p>

<h2>Phù Hợp Cho Mọi Loại Ứng Dụng</h2>
<p>Business Hosting VMST Host phù hợp cho:</p>
<ul>
<li>Website thương mại điện tử (WooCommerce, Magento, OpenCart)</li>
<li>Hệ thống CRM và ERP nội bộ</li>
<li>Landing page và marketing campaign</li>
<li>API server và microservices</li>
<li>Website tin tức và tạp chí online</li>
</ul>

<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Ứng dụng web doanh nghiệp" style="width:100%;border-radius:12px;margin:16px 0" />
`,
        faqs: [
            {
                q: 'Business Hosting có phù hợp cho website thương mại điện tử không?',
                a: 'Hoàn toàn phù hợp! Business Hosting cung cấp đủ tài nguyên cho WooCommerce, Magento và các nền tảng e-commerce khác với SSL, bảo mật cao và tốc độ nhanh.'
            },
            {
                q: 'Tôi có thể chạy Node.js trên Business Hosting không?',
                a: 'Có, Business Hosting hỗ trợ Node.js, Python và nhiều công nghệ khác ngoài PHP. Bạn có thể cấu hình qua DirectAdmin hoặc SSH.'
            },
            {
                q: 'Có được quyền SSH access không?',
                a: 'Có, tất cả gói Business Hosting đều có SSH access để bạn quản lý server qua command line.'
            },
            {
                q: 'Uptime 99.9% được đảm bảo như thế nào?',
                a: 'VMST Host cam kết SLA 99.9% uptime. Nếu không đạt, bạn sẽ được hoàn tiền theo tỷ lệ. Hệ thống monitoring 24/7 phát hiện sự cố tự động.'
            },
            {
                q: 'Có thể nâng cấp từ Shared lên Business Hosting không?',
                a: 'Có, đội ngũ kỹ thuật sẽ hỗ trợ migrate miễn phí từ Shared sang Business Hosting mà không mất dữ liệu hay downtime.'
            }
        ]
    },
    email: {
        articleTitle: 'Email Doanh Nghiệp Theo Tên Miền — Chuyên Nghiệp, Bảo Mật, Anti-Spam',
        article: `
<p>Trong kinh doanh, ấn tượng đầu tiên rất quan trọng. Một email <strong>info@tencongty.vn</strong> tạo sự tin tưởng hơn nhiều so với email Gmail hay Yahoo cá nhân. <strong>Email doanh nghiệp theo tên miền</strong> không chỉ là công cụ liên lạc mà còn là bộ mặt thương hiệu của bạn.</p>

<h2>Tại Sao Doanh Nghiệp Cần Email Theo Tên Miền?</h2>
<p>Sử dụng email cá nhân (Gmail, Yahoo) cho công việc kinh doanh có nhiều hạn chế:</p>
<ul>
<li><strong>Thiếu chuyên nghiệp</strong> — Khách hàng khó tin tưởng email @gmail.com cho giao dịch lớn</li>
<li><strong>Không kiểm soát được</strong> — Nhân viên nghỉ việc mang theo email và danh bạ khách hàng</li>
<li><strong>Bảo mật kém</strong> — Không có chính sách bảo mật doanh nghiệp</li>
<li><strong>Không đồng bộ</strong> — Mỗi nhân viên dùng email khác nhau, thiếu nhất quán</li>
</ul>

<img src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80" alt="Email doanh nghiệp chuyên nghiệp" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Tính Năng Email Doanh Nghiệp VMST Host</h2>
<p>Email doanh nghiệp tại VMST Host được trang bị đầy đủ tính năng cho công việc hiện đại:</p>
<ul>
<li><strong>Webmail hiện đại</strong> — Giao diện đẹp, dễ sử dụng trên trình duyệt</li>
<li><strong>IMAP/POP3/SMTP</strong> — Đồng bộ với Outlook, Thunderbird, Apple Mail</li>
<li><strong>Mobile sync</strong> — Đồng bộ email, danh bạ, lịch trên iOS và Android</li>
<li><strong>Anti-spam</strong> — Lọc spam thông minh với SpamAssassin và ClamAV</li>
<li><strong>Dung lượng lớn</strong> — Từ 5GB đến unlimited tùy gói</li>
</ul>

<h2>Bảo Mật Email Đa Lớp</h2>
<p>Email là vector tấn công phổ biến nhất trong an ninh mạng. VMST Host bảo vệ email doanh nghiệp với:</p>
<ul>
<li><strong>SPF, DKIM, DMARC</strong> — Xác thực email, chống giả mạo</li>
<li><strong>SSL/TLS encryption</strong> — Mã hóa email khi gửi và nhận</li>
<li><strong>Anti-virus</strong> — Quét virus tự động cho mọi attachment</li>
<li><strong>2FA</strong> — Xác thực 2 yếu tố cho webmail</li>
</ul>

<img src="https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80" alt="Bảo mật email doanh nghiệp" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Anti-Spam Thông Minh</h2>
<p>Spam email không chỉ gây phiền toái mà còn tiềm ẩn nguy cơ bảo mật (phishing, malware). Hệ thống anti-spam của VMST Host sử dụng:</p>
<ul>
<li>SpamAssassin với machine learning — Học và thích ứng với spam mới</li>
<li>Blacklist realtime (RBL) — Chặn IP gửi spam đã biết</li>
<li>Greylisting — Loại bỏ spam bot tự động</li>
<li>Rate limiting — Giới hạn số email gửi/nhận để chống abuse</li>
</ul>

<h2>Đồng Bộ Đa Thiết Bị</h2>
<p>Làm việc mọi lúc mọi nơi với email đồng bộ trên tất cả thiết bị. Gửi email từ laptop, đọc trên điện thoại, trả lời từ tablet — tất cả đều đồng bộ realtime qua giao thức IMAP.</p>

<img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" alt="Email đồng bộ đa thiết bị" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Quản Lý Email Dễ Dàng</h2>
<p>Quản trị viên có thể dễ dàng tạo, xóa và quản lý tài khoản email từ bảng điều khiển DirectAdmin. Thiết lập forwarding, auto-reply, mailing list và alias chỉ với vài click.</p>

<h2>Email Deliverability — Đảm Bảo Email Đến Inbox</h2>
<p>Một vấn đề phổ biến với email doanh nghiệp là email bị vào spam của người nhận. VMST Host đảm bảo <strong>email deliverability cao</strong> nhờ:</p>
<ul>
<li>IP sạch, không nằm trong blacklist</li>
<li>SPF, DKIM, DMARC được cấu hình đúng</li>
<li>Reverse DNS (PTR record) chính xác</li>
<li>Monitoring reputation liên tục</li>
</ul>

<img src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80" alt="Email marketing hiệu quả" style="width:100%;border-radius:12px;margin:16px 0" />
`,
        faqs: [
            {
                q: 'Email doanh nghiệp có khác gì Gmail?',
                a: 'Email doanh nghiệp sử dụng tên miền riêng (vd: info@congty.vn), có bảo mật cao hơn, quản lý tập trung và tạo sự chuyên nghiệp cho thương hiệu.'
            },
            {
                q: 'Tôi có thể dùng email trên điện thoại không?',
                a: 'Có, email hỗ trợ IMAP/POP3 nên bạn có thể cấu hình trên mọi ứng dụng email: Gmail app, Outlook, Apple Mail trên iOS và Android.'
            },
            {
                q: 'Có bao nhiêu tài khoản email trong mỗi gói?',
                a: 'Tùy gói hosting, bạn có từ 5 đến unlimited tài khoản email. Mỗi tài khoản có dung lượng riêng từ 1GB trở lên.'
            },
            {
                q: 'Email có bị vào spam không?',
                a: 'VMST Host cấu hình đầy đủ SPF, DKIM, DMARC và sử dụng IP sạch để đảm bảo email đến inbox người nhận, không bị đánh dấu spam.'
            },
            {
                q: 'Có hỗ trợ chuyển email từ hosting cũ không?',
                a: 'Có, đội ngũ kỹ thuật hỗ trợ migrate email miễn phí, bao gồm cả dữ liệu email cũ.'
            }
        ]
    },
    pricing: {
        articleTitle: 'Bảng Giá Hosting Việt Nam 2026 — So Sánh Chi Tiết Các Gói Dịch Vụ',
        article: `
<p>Chọn gói hosting phù hợp là quyết định quan trọng ảnh hưởng đến hiệu suất và chi phí vận hành website. <strong>Bảng giá hosting</strong> tại VMST Host được thiết kế minh bạch, không phí ẩn, với nhiều tùy chọn cho mọi quy mô từ cá nhân đến doanh nghiệp lớn.</p>

<h2>Hosting Giá Rẻ Nhất Việt Nam — Từ 29.000đ/tháng</h2>
<p>VMST Host cam kết cung cấp hosting chất lượng cao với mức giá cạnh tranh nhất thị trường. Với gói WordPress Starter chỉ từ <strong>29.000đ/tháng</strong>, bạn đã có đầy đủ tính năng để xây dựng website chuyên nghiệp.</p>

<img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80" alt="Bảng giá hosting minh bạch" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Tiết Kiệm Hơn Với Gói Năm</h2>
<p>Khi đăng ký gói năm, bạn tiết kiệm đến <strong>30%</strong> so với thanh toán hàng tháng. Đây là lựa chọn thông minh cho website dài hạn. Ngoài ra, gói năm còn được tặng thêm tên miền miễn phí năm đầu tiên.</p>

<h2>Không Phí Ẩn — Minh Bạch 100%</h2>
<p>Nhiều nhà cung cấp hosting quảng cáo giá rẻ nhưng tính thêm phí cho SSL, backup, email hay hỗ trợ kỹ thuật. Tại VMST Host, tất cả đều được bao gồm trong giá:</p>
<ul>
<li>SSL Let's Encrypt miễn phí — không phí thêm</li>
<li>Backup tự động hàng ngày — không phí thêm</li>
<li>Email theo tên miền — không phí thêm</li>
<li>Hỗ trợ kỹ thuật 24/7 — không phí thêm</li>
<li>Di chuyển website miễn phí — không phí thêm</li>
</ul>

<h2>So Sánh Các Gói Hosting</h2>
<p>VMST Host cung cấp 3 dòng sản phẩm chính:</p>
<h3>WordPress Hosting</h3>
<p>Tối ưu cho WordPress với OpenLiteSpeed và LiteSpeed Cache. Phù hợp cho blog, website giới thiệu, landing page và cửa hàng WooCommerce nhỏ.</p>
<h3>Business Hosting</h3>
<p>Tài nguyên cao hơn, hỗ trợ đa công nghệ (PHP, Node.js, Python). Phù hợp cho doanh nghiệp, e-commerce lớn và ứng dụng web phức tạp.</p>
<h3>Email Hosting</h3>
<p>Email doanh nghiệp theo tên miền với anti-spam, bảo mật cao. Phù hợp cho mọi doanh nghiệp cần email chuyên nghiệp.</p>

<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="So sánh gói hosting" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Thanh Toán Linh Hoạt</h2>
<p>VMST Host hỗ trợ nhiều phương thức thanh toán tiện lợi:</p>
<ul>
<li>Chuyển khoản ngân hàng (VietQR — quét mã thanh toán tức thì)</li>
<li>Ví điện tử (MoMo, ZaloPay)</li>
<li>Thanh toán theo tháng, quý hoặc năm</li>
</ul>

<h2>Chính Sách Hoàn Tiền 30 Ngày</h2>
<p>VMST Host tự tin vào chất lượng dịch vụ nên cung cấp chính sách <strong>hoàn tiền trong 30 ngày</strong>. Nếu bạn không hài lòng vì bất kỳ lý do gì, chúng tôi sẽ hoàn lại 100% số tiền đã thanh toán.</p>

<h2>Voucher Sinh Viên — Giảm Giá Đặc Biệt</h2>
<p>VMST Host có chương trình ưu đãi đặc biệt cho sinh viên với mã voucher giảm giá. Sinh viên chỉ cần cung cấp email .edu hoặc thẻ sinh viên để nhận ưu đãi lên đến 50%.</p>

<img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" alt="Ưu đãi hosting sinh viên" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Tư Vấn Chọn Gói Phù Hợp</h2>
<p>Không chắc gói nào phù hợp? Sử dụng công cụ <strong>Tư vấn chọn gói</strong> trên website hoặc liên hệ đội ngũ tư vấn qua hotline 0822 636 676 để được hỗ trợ miễn phí.</p>
`,
        faqs: [
            {
                q: 'Gói hosting nào phù hợp cho website mới?',
                a: 'Gói WordPress Starter (29.000đ/tháng) phù hợp cho website mới với 1 website, 5GB SSD, SSL miễn phí và đầy đủ tính năng cơ bản.'
            },
            {
                q: 'Có phí setup hay phí ẩn nào không?',
                a: 'Không, VMST Host không tính phí setup. Giá niêm yết đã bao gồm SSL, backup, email và hỗ trợ kỹ thuật.'
            },
            {
                q: 'Thanh toán bằng cách nào?',
                a: 'Bạn có thể thanh toán qua chuyển khoản ngân hàng (VietQR), ví điện tử MoMo/ZaloPay. Hệ thống xác nhận thanh toán tự động.'
            },
            {
                q: 'Có được hoàn tiền nếu không hài lòng?',
                a: 'Có, VMST Host có chính sách hoàn tiền 100% trong 30 ngày đầu tiên nếu bạn không hài lòng với dịch vụ.'
            },
            {
                q: 'Sinh viên có được giảm giá không?',
                a: 'Có, VMST Host có chương trình voucher sinh viên với ưu đãi lên đến 50%. Liên hệ để nhận mã giảm giá.'
            }
        ]
    },
    advisor: {
        articleTitle: 'Tư Vấn Chọn Gói Hosting Phù Hợp — Hướng Dẫn Chi Tiết Cho Người Mới',
        article: `
<p>Chọn gói hosting phù hợp có thể khiến nhiều người bối rối, đặc biệt khi bạn mới bắt đầu xây dựng website. Bài viết này sẽ giúp bạn hiểu rõ các loại hosting và chọn đúng gói cho nhu cầu của mình.</p>

<h2>Các Loại Hosting Phổ Biến</h2>
<h3>Shared Hosting</h3>
<p>Nhiều website chia sẻ cùng một server. Giá rẻ nhất, phù hợp cho website nhỏ và blog cá nhân. Tại VMST Host, shared hosting được tối ưu với CloudLinux để đảm bảo hiệu suất ổn định.</p>
<h3>WordPress Hosting</h3>
<p>Shared hosting được tối ưu riêng cho WordPress với OpenLiteSpeed, LiteSpeed Cache và WordPress Toolkit. Phù hợp cho mọi website WordPress từ blog đến WooCommerce.</p>
<h3>VPS Hosting</h3>
<p>Server ảo riêng với tài nguyên được phân bổ cố định. Phù hợp cho website có lượng truy cập cao hoặc cần cấu hình đặc biệt.</p>
<h3>Business Hosting</h3>
<p>Hosting cao cấp với tài nguyên lớn, hỗ trợ đa công nghệ. Phù hợp cho doanh nghiệp và ứng dụng web phức tạp.</p>

<img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80" alt="Tư vấn chọn hosting phù hợp" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Chọn Hosting Theo Loại Website</h2>
<h3>Blog Cá Nhân / Portfolio</h3>
<p>Gói <strong>WordPress Starter</strong> là đủ. Bạn cần ít dung lượng, ít traffic và WordPress là nền tảng lý tưởng cho blog.</p>
<h3>Website Doanh Nghiệp / Giới Thiệu</h3>
<p>Gói <strong>WordPress Business</strong> hoặc <strong>Business Starter</strong>. Cần nhiều email theo tên miền, SSL và tốc độ ổn định để tạo ấn tượng chuyên nghiệp.</p>
<h3>Cửa Hàng Online (WooCommerce)</h3>
<p>Gói <strong>WordPress Pro</strong> hoặc <strong>Business Pro</strong>. Cần nhiều tài nguyên cho database sản phẩm, xử lý đơn hàng và thanh toán.</p>
<h3>Ứng Dụng Web (Node.js, Python)</h3>
<p>Gói <strong>Business</strong> với SSH access. Cần hỗ trợ đa công nghệ và khả năng cấu hình server.</p>

<img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" alt="Phát triển website chuyên nghiệp" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Yếu Tố Quan Trọng Khi Chọn Hosting</h2>
<ul>
<li><strong>Tốc độ</strong> — SSD NVMe nhanh hơn HDD 10 lần, OpenLiteSpeed nhanh hơn Apache 10 lần</li>
<li><strong>Uptime</strong> — Cam kết 99.9% uptime với SLA rõ ràng</li>
<li><strong>Bảo mật</strong> — SSL miễn phí, firewall, anti-malware</li>
<li><strong>Hỗ trợ</strong> — Tiếng Việt 24/7, phản hồi nhanh</li>
<li><strong>Backup</strong> — Tự động hàng ngày, khôi phục 1-click</li>
<li><strong>Giá cả</strong> — Minh bạch, không phí ẩn</li>
</ul>

<h2>Sai Lầm Phổ Biến Khi Chọn Hosting</h2>
<p>Nhiều người mắc sai lầm khi chọn hosting:</p>
<ul>
<li>Chọn gói rẻ nhất mà không xem xét tốc độ và bảo mật</li>
<li>Mua gói quá lớn so với nhu cầu thực tế</li>
<li>Không kiểm tra chính sách backup và hoàn tiền</li>
<li>Bỏ qua yếu tố hỗ trợ kỹ thuật tiếng Việt</li>
</ul>

<img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" alt="Đội ngũ tư vấn hosting" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Liên Hệ Tư Vấn Miễn Phí</h2>
<p>Nếu bạn vẫn chưa chắc chắn, hãy liên hệ đội ngũ tư vấn VMST Host qua hotline <strong>0822 636 676</strong> hoặc chat trực tiếp trên website. Chúng tôi sẽ phân tích nhu cầu và đề xuất gói hosting phù hợp nhất cho bạn.</p>
`,
        faqs: [
            {
                q: 'Tôi mới bắt đầu, nên chọn gói nào?',
                a: 'Gói WordPress Starter (29.000đ/tháng) là lựa chọn tốt nhất cho người mới. Đủ tính năng, dễ sử dụng và có thể nâng cấp sau.'
            },
            {
                q: 'Website bán hàng nên dùng gói nào?',
                a: 'Gói WordPress Business hoặc Business Starter. Nếu dùng WooCommerce, gói WordPress Pro được khuyến nghị cho hiệu suất tốt nhất.'
            },
            {
                q: 'Có thể đổi gói sau khi mua không?',
                a: 'Có, bạn có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào. Phần chênh lệch sẽ được tính theo tỷ lệ.'
            },
            {
                q: 'Hosting có bao gồm tên miền không?',
                a: 'Gói năm được tặng tên miền miễn phí năm đầu. Gói tháng/quý cần mua tên miền riêng.'
            },
            {
                q: 'Tôi cần bao nhiêu dung lượng hosting?',
                a: 'Blog/portfolio: 2-5GB. Website doanh nghiệp: 5-10GB. E-commerce: 10-50GB tùy số lượng sản phẩm và hình ảnh.'
            }
        ]
    },
    contact: {
        articleTitle: 'Liên Hệ VMST Host — Hỗ Trợ Kỹ Thuật Nhanh Chóng, Tư Vấn Miễn Phí',
        article: `
<p>VMST Host luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi. Dù bạn cần tư vấn chọn gói hosting, hỗ trợ kỹ thuật hay giải đáp thắc mắc về dịch vụ, đội ngũ của chúng tôi luôn phản hồi nhanh chóng và tận tâm.</p>

<h2>Các Kênh Liên Hệ</h2>
<h3>Hotline: 0822 636 676</h3>
<p>Gọi trực tiếp để được tư vấn ngay. Đường dây hoạt động từ 8:00 — 22:00 hàng ngày, kể cả cuối tuần và ngày lễ.</p>
<h3>Chat Trực Tuyến</h3>
<p>Chat widget trên website hoạt động 24/7. Đội ngũ kỹ thuật phản hồi trong vòng 15 phút cho mọi yêu cầu.</p>
<h3>Email Hỗ Trợ</h3>
<p>Gửi email đến <strong>support@vmst.host</strong> cho các yêu cầu chi tiết. Thời gian phản hồi trung bình 30 phút trong giờ làm việc.</p>

<img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80" alt="Đội ngũ hỗ trợ khách hàng" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Hỗ Trợ Kỹ Thuật Chuyên Nghiệp</h2>
<p>Đội ngũ kỹ thuật VMST Host có kinh nghiệm nhiều năm trong lĩnh vực hosting và quản trị server. Chúng tôi hỗ trợ:</p>
<ul>
<li>Cài đặt và cấu hình website (WordPress, WooCommerce, Laravel...)</li>
<li>Di chuyển website từ hosting khác — miễn phí</li>
<li>Tối ưu tốc độ và hiệu suất website</li>
<li>Xử lý sự cố bảo mật, malware</li>
<li>Cấu hình email doanh nghiệp, DNS</li>
<li>Backup và khôi phục dữ liệu</li>
</ul>

<h2>Tư Vấn Miễn Phí</h2>
<p>Không chắc gói hosting nào phù hợp? Đội ngũ tư vấn sẽ phân tích nhu cầu của bạn và đề xuất giải pháp tối ưu nhất về cả hiệu suất lẫn chi phí. Dịch vụ tư vấn hoàn toàn miễn phí, không ràng buộc.</p>

<img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" alt="Tư vấn hosting miễn phí" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Cam Kết Chất Lượng Dịch Vụ</h2>
<p>VMST Host cam kết:</p>
<ul>
<li><strong>Phản hồi trong 15 phút</strong> cho mọi yêu cầu hỗ trợ qua chat</li>
<li><strong>Giải quyết trong 2 giờ</strong> cho các sự cố kỹ thuật thông thường</li>
<li><strong>Escalation ngay lập tức</strong> cho sự cố nghiêm trọng ảnh hưởng đến uptime</li>
<li><strong>Báo cáo sự cố</strong> minh bạch sau mỗi incident</li>
</ul>

<h2>Địa Chỉ Văn Phòng</h2>
<p>VMST Host — Công ty TNHH Giải Pháp Công Nghệ VMST Việt Nam</p>
<p>Địa chỉ: 465 Hiệp Thành 13, P. Hiệp Thành, Q.12, TP.HCM</p>
<p>Bạn có thể đến trực tiếp văn phòng trong giờ làm việc (8:00 — 17:30, Thứ 2 — Thứ 6) để được tư vấn trực tiếp.</p>

<img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="Văn phòng VMST Host" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Đối Tác Tin Cậy</h2>
<p>VMST Host tự hào là đối tác tin cậy của hơn 500+ doanh nghiệp và cá nhân tại Việt Nam. Chúng tôi không chỉ cung cấp hosting mà còn đồng hành cùng bạn trong hành trình số hóa doanh nghiệp.</p>
`,
        faqs: [
            {
                q: 'Thời gian phản hồi hỗ trợ là bao lâu?',
                a: 'Chat trực tuyến: 15 phút. Email: 30 phút trong giờ làm việc. Hotline: ngay lập tức trong giờ hoạt động (8:00-22:00).'
            },
            {
                q: 'Có hỗ trợ ngoài giờ làm việc không?',
                a: 'Có, chat trực tuyến hoạt động 24/7. Hotline hoạt động 8:00-22:00 hàng ngày kể cả cuối tuần.'
            },
            {
                q: 'Di chuyển website có mất phí không?',
                a: 'Không, VMST Host hỗ trợ di chuyển website miễn phí từ bất kỳ nhà cung cấp nào.'
            },
            {
                q: 'Tôi có thể đến văn phòng trực tiếp không?',
                a: 'Có, văn phòng tại 465 Hiệp Thành 13, Q.12, TP.HCM mở cửa 8:00-17:30 từ Thứ 2 đến Thứ 6.'
            }
        ]
    },
    blog: {
        articleTitle: 'Blog Hosting & Hướng Dẫn — Kiến Thức Quản Trị Website Từ A-Z',
        article: `
<p>Blog VMST Host là nguồn kiến thức toàn diện về <strong>hosting, quản trị website, SEO và bảo mật</strong>. Chúng tôi chia sẻ kinh nghiệm thực tế, hướng dẫn chi tiết và mẹo tối ưu giúp bạn vận hành website hiệu quả nhất.</p>

<h2>Chủ Đề Nổi Bật</h2>
<h3>Hướng Dẫn WordPress</h3>
<p>Từ cài đặt WordPress, chọn theme, cấu hình plugin đến tối ưu tốc độ và bảo mật. Mỗi bài viết đều có hướng dẫn từng bước với hình ảnh minh họa chi tiết.</p>
<h3>SEO & Marketing Online</h3>
<p>Chiến lược SEO on-page, off-page, technical SEO và content marketing. Cập nhật thuật toán Google mới nhất và cách thích ứng.</p>
<h3>Bảo Mật Website</h3>
<p>Hướng dẫn bảo mật WordPress, phòng chống hack, xử lý malware và các best practice về an ninh mạng cho website.</p>
<h3>Quản Trị Server</h3>
<p>Hướng dẫn sử dụng DirectAdmin, cấu hình DNS, SSL, email và các tác vụ quản trị hosting phổ biến.</p>

<img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80" alt="Blog kiến thức hosting" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Bài Viết Được Đọc Nhiều Nhất</h2>
<p>Một số bài viết phổ biến trên blog VMST Host:</p>
<ul>
<li>Hướng dẫn cài đặt WordPress trên hosting — từng bước chi tiết</li>
<li>Top 10 plugin WordPress không thể thiếu cho website mới</li>
<li>Cách tối ưu tốc độ WordPress đạt PageSpeed 90+</li>
<li>Hướng dẫn bảo mật WordPress toàn diện 2026</li>
<li>So sánh hosting Việt Nam — đánh giá chi tiết các nhà cung cấp</li>
<li>Cách chọn tên miền phù hợp cho doanh nghiệp</li>
</ul>

<h2>Cập Nhật Thường Xuyên</h2>
<p>Blog được cập nhật <strong>hàng tuần</strong> với nội dung mới, đảm bảo bạn luôn có thông tin mới nhất về công nghệ hosting và quản trị website. Đăng ký nhận thông báo để không bỏ lỡ bài viết mới.</p>

<img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80" alt="Cập nhật kiến thức hosting" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Viết Bởi Chuyên Gia</h2>
<p>Tất cả bài viết trên blog VMST Host được viết bởi đội ngũ kỹ thuật có kinh nghiệm thực tế trong quản trị server và hosting. Nội dung được kiểm chứng và cập nhật thường xuyên để đảm bảo tính chính xác.</p>

<h2>Đóng Góp Nội Dung</h2>
<p>Bạn là chuyên gia trong lĩnh vực web hosting, SEO hay phát triển web? Hãy liên hệ với chúng tôi để đóng góp bài viết cho blog. Chúng tôi luôn chào đón những nội dung chất lượng từ cộng đồng.</p>

<img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" alt="Cộng đồng hosting Việt Nam" style="width:100%;border-radius:12px;margin:16px 0" />
`,
        faqs: [
            {
                q: 'Blog có miễn phí không?',
                a: 'Có, tất cả bài viết trên blog VMST Host đều miễn phí và không yêu cầu đăng ký tài khoản để đọc.'
            },
            {
                q: 'Bài viết có được cập nhật thường xuyên không?',
                a: 'Có, blog được cập nhật hàng tuần với nội dung mới về hosting, WordPress, SEO và bảo mật.'
            },
            {
                q: 'Tôi có thể đề xuất chủ đề bài viết không?',
                a: 'Có, hãy liên hệ qua email hoặc chat để đề xuất chủ đề bạn quan tâm. Chúng tôi luôn lắng nghe ý kiến độc giả.'
            }
        ]
    },
    support: {
        articleTitle: 'Trung Tâm Hỗ Trợ VMST Host — Giải Đáp Mọi Thắc Mắc Về Hosting',
        article: `
<p><strong>Trung tâm hỗ trợ VMST Host</strong> là nơi bạn tìm thấy câu trả lời cho mọi thắc mắc về hosting, email, domain và quản trị website. Với hệ thống ticket chuyên nghiệp và đội ngũ kỹ thuật giàu kinh nghiệm, chúng tôi cam kết giải quyết mọi vấn đề nhanh chóng.</p>

<h2>Hệ Thống Ticket Hỗ Trợ</h2>
<p>Tạo ticket hỗ trợ để theo dõi tiến trình xử lý yêu cầu của bạn. Mỗi ticket được gán cho kỹ thuật viên chuyên trách và có SLA rõ ràng:</p>
<ul>
<li><strong>Ưu tiên cao</strong> (website down, mất dữ liệu): Phản hồi trong 15 phút</li>
<li><strong>Ưu tiên trung bình</strong> (lỗi chức năng, cấu hình): Phản hồi trong 1 giờ</li>
<li><strong>Ưu tiên thấp</strong> (câu hỏi chung, tư vấn): Phản hồi trong 4 giờ</li>
</ul>

<img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80" alt="Hỗ trợ kỹ thuật hosting" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Hướng Dẫn Tự Xử Lý</h2>
<p>Nhiều vấn đề phổ biến có thể tự xử lý qua hướng dẫn trên blog:</p>
<ul>
<li>Cách đổi mật khẩu DirectAdmin và email</li>
<li>Cách cài đặt SSL cho website</li>
<li>Cách tạo và quản lý email doanh nghiệp</li>
<li>Cách backup và khôi phục website</li>
<li>Cách trỏ domain về hosting</li>
</ul>

<h2>Hỗ Trợ Di Chuyển Website Miễn Phí</h2>
<p>Chuyển website từ hosting khác sang VMST Host hoàn toàn miễn phí. Đội ngũ kỹ thuật sẽ thực hiện toàn bộ quá trình, đảm bảo không mất dữ liệu và không downtime.</p>

<img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80" alt="Di chuyển website hosting" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Cộng Đồng Hỗ Trợ</h2>
<p>Tham gia cộng đồng VMST Host trên Facebook và Zalo để trao đổi kinh nghiệm, nhận hỗ trợ từ cộng đồng và cập nhật tin tức mới nhất về hosting.</p>

<h2>Cam Kết Hỗ Trợ</h2>
<p>VMST Host cam kết hỗ trợ kỹ thuật tiếng Việt 24/7, phản hồi nhanh và giải quyết triệt để mọi vấn đề. Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi.</p>
`,
        faqs: [
            {
                q: 'Làm sao để tạo ticket hỗ trợ?',
                a: 'Đăng nhập vào portal khách hàng, chọn "Hỗ trợ" > "Tạo ticket mới". Mô tả chi tiết vấn đề để được hỗ trợ nhanh nhất.'
            },
            {
                q: 'Thời gian xử lý ticket là bao lâu?',
                a: 'Tùy mức ưu tiên: Cao (15 phút), Trung bình (1 giờ), Thấp (4 giờ). Sự cố nghiêm trọng được xử lý ngay lập tức.'
            },
            {
                q: 'Có hỗ trợ cài đặt website không?',
                a: 'Có, đội ngũ kỹ thuật hỗ trợ cài đặt WordPress, WooCommerce và các CMS phổ biến miễn phí.'
            },
            {
                q: 'Tôi quên mật khẩu hosting, phải làm sao?',
                a: 'Liên hệ hỗ trợ qua chat hoặc email với thông tin tài khoản. Đội ngũ sẽ xác minh và reset mật khẩu cho bạn.'
            }
        ]
    },
    terms: {
        articleTitle: 'Điều Khoản Dịch Vụ Hosting — Quyền Lợi Và Trách Nhiệm Của Khách Hàng',
        article: `
<p>Điều khoản dịch vụ là cam kết pháp lý giữa VMST Host và khách hàng, đảm bảo quyền lợi cho cả hai bên. Chúng tôi khuyến khích bạn đọc kỹ điều khoản trước khi sử dụng dịch vụ.</p>

<h2>Cam Kết Chất Lượng Dịch Vụ (SLA)</h2>
<p>VMST Host cam kết cung cấp dịch vụ hosting với <strong>uptime 99.9%</strong>. Nếu uptime không đạt mức cam kết trong bất kỳ tháng nào, khách hàng sẽ được bồi thường theo tỷ lệ:</p>
<ul>
<li>Uptime 99.0% — 99.9%: Bồi thường 10% phí tháng</li>
<li>Uptime 95.0% — 99.0%: Bồi thường 25% phí tháng</li>
<li>Uptime dưới 95.0%: Bồi thường 50% phí tháng</li>
</ul>

<img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" alt="Điều khoản dịch vụ hosting" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Chính Sách Hoàn Tiền</h2>
<p>VMST Host cung cấp chính sách <strong>hoàn tiền 30 ngày</strong> cho tất cả gói hosting mới. Nếu bạn không hài lòng với dịch vụ trong 30 ngày đầu tiên, chúng tôi sẽ hoàn lại 100% số tiền đã thanh toán.</p>

<h2>Chính Sách Sử Dụng Hợp Lý</h2>
<p>Để đảm bảo chất lượng dịch vụ cho tất cả khách hàng, VMST Host áp dụng chính sách sử dụng hợp lý. Các hoạt động sau không được phép:</p>
<ul>
<li>Gửi spam email hoặc phishing</li>
<li>Hosting nội dung vi phạm pháp luật Việt Nam</li>
<li>Sử dụng tài nguyên quá mức ảnh hưởng đến khách hàng khác</li>
<li>Tấn công mạng hoặc quét lỗ hổng bảo mật</li>
</ul>

<h2>Bảo Mật Dữ Liệu</h2>
<p>VMST Host cam kết bảo mật tuyệt đối dữ liệu khách hàng. Chúng tôi không bao giờ truy cập, chia sẻ hay bán dữ liệu của bạn cho bên thứ ba. Backup được mã hóa và lưu trữ an toàn.</p>

<img src="https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80" alt="Bảo mật dữ liệu khách hàng" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Quyền Sở Hữu Nội Dung</h2>
<p>Bạn giữ toàn quyền sở hữu đối với tất cả nội dung trên hosting của mình. VMST Host chỉ là nhà cung cấp hạ tầng và không có quyền sử dụng nội dung của bạn cho bất kỳ mục đích nào.</p>

<h2>Liên Hệ Về Điều Khoản</h2>
<p>Nếu bạn có câu hỏi về điều khoản dịch vụ, vui lòng liên hệ qua email <strong>legal@vmst.host</strong> hoặc hotline <strong>0822 636 676</strong>.</p>
`,
        faqs: [
            {
                q: 'Chính sách hoàn tiền áp dụng trong bao lâu?',
                a: '30 ngày kể từ ngày đăng ký. Hoàn 100% số tiền đã thanh toán nếu bạn không hài lòng.'
            },
            {
                q: 'Dữ liệu của tôi có được bảo mật không?',
                a: 'Có, VMST Host cam kết bảo mật tuyệt đối. Dữ liệu được mã hóa, backup an toàn và không chia sẻ cho bên thứ ba.'
            },
            {
                q: 'Nếu hosting bị down, tôi được bồi thường gì?',
                a: 'Theo SLA, nếu uptime dưới 99.9%, bạn được bồi thường từ 10-50% phí tháng tùy mức độ.'
            }
        ]
    },
    privacy: {
        articleTitle: 'Chính Sách Bảo Mật — Cam Kết Bảo Vệ Thông Tin Khách Hàng',
        article: `
<p>VMST Host coi trọng quyền riêng tư và bảo mật thông tin cá nhân của khách hàng. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.</p>

<h2>Thông Tin Chúng Tôi Thu Thập</h2>
<p>Khi sử dụng dịch vụ VMST Host, chúng tôi có thể thu thập:</p>
<ul>
<li><strong>Thông tin tài khoản</strong>: Họ tên, email, số điện thoại khi đăng ký</li>
<li><strong>Thông tin thanh toán</strong>: Lịch sử giao dịch (không lưu thông tin thẻ)</li>
<li><strong>Thông tin kỹ thuật</strong>: IP address, trình duyệt, hệ điều hành khi truy cập</li>
<li><strong>Cookie</strong>: Để cải thiện trải nghiệm sử dụng website</li>
</ul>

<img src="https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80" alt="Bảo mật thông tin cá nhân" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Cách Chúng Tôi Sử Dụng Thông Tin</h2>
<p>Thông tin thu thập được sử dụng cho các mục đích:</p>
<ul>
<li>Cung cấp và quản lý dịch vụ hosting</li>
<li>Hỗ trợ kỹ thuật và chăm sóc khách hàng</li>
<li>Gửi thông báo về dịch vụ, bảo trì và cập nhật</li>
<li>Cải thiện chất lượng dịch vụ</li>
</ul>
<p>Chúng tôi <strong>KHÔNG BAO GIỜ</strong> bán hoặc chia sẻ thông tin cá nhân cho bên thứ ba vì mục đích thương mại.</p>

<h2>Bảo Mật Dữ Liệu</h2>
<p>VMST Host áp dụng các biện pháp bảo mật tiên tiến:</p>
<ul>
<li>Mã hóa SSL/TLS cho mọi kết nối</li>
<li>Mã hóa dữ liệu nhạy cảm khi lưu trữ</li>
<li>Kiểm soát truy cập nghiêm ngặt</li>
<li>Audit log cho mọi thao tác quản trị</li>
</ul>

<img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80" alt="Mã hóa bảo mật dữ liệu" style="width:100%;border-radius:12px;margin:16px 0" />

<h2>Quyền Của Bạn</h2>
<p>Bạn có quyền:</p>
<ul>
<li>Truy cập và xem thông tin cá nhân đã cung cấp</li>
<li>Yêu cầu chỉnh sửa thông tin không chính xác</li>
<li>Yêu cầu xóa tài khoản và dữ liệu cá nhân</li>
<li>Từ chối nhận email marketing</li>
</ul>

<h2>Liên Hệ Về Bảo Mật</h2>
<p>Nếu bạn có câu hỏi về chính sách bảo mật hoặc phát hiện vấn đề bảo mật, vui lòng liên hệ <strong>privacy@vmst.host</strong> hoặc hotline <strong>0822 636 676</strong>.</p>
`,
        faqs: [
            {
                q: 'VMST Host có bán thông tin khách hàng không?',
                a: 'Không, VMST Host cam kết không bao giờ bán hoặc chia sẻ thông tin cá nhân cho bên thứ ba vì mục đích thương mại.'
            },
            {
                q: 'Tôi có thể yêu cầu xóa dữ liệu cá nhân không?',
                a: 'Có, bạn có quyền yêu cầu xóa tài khoản và toàn bộ dữ liệu cá nhân. Liên hệ privacy@vmst.host để thực hiện.'
            },
            {
                q: 'Cookie được sử dụng như thế nào?',
                a: 'Cookie được sử dụng để cải thiện trải nghiệm website, ghi nhớ đăng nhập và phân tích lưu lượng truy cập. Bạn có thể tắt cookie trong trình duyệt.'
            }
        ]
    }
};
}),
"[project]/app/(main)/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/products.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/blogs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/CartContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeoContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeoContent.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$seo$2d$articles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/seo-articles.ts [app-ssr] (ecmascript)");
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
function HomePage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('wordpress');
    const [allPlans, setAllPlans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [blogPosts, setBlogPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [faqOpenIndex, setFaqOpenIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const normalizeCategory = (dm)=>{
            const s = (dm || '').toLowerCase().trim();
            if (s.includes('wordpress') || s.includes('wp')) return 'wordpress';
            if (s.includes('email') || s.includes('mail')) return 'email';
            if (s.includes('vps') || s.includes('server') || s.includes('cloud')) return 'business';
            return 'business';
        };
        const loadData = async ()=>{
            try {
                setLoading(true);
                const productsRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listProducts"])({
                    perPage: 50,
                    status: 'active'
                });
                const mapped = (productsRes.items || []).map((r)=>{
                    const thongSo = r.thong_so || {};
                    const gia = parseInt(r.gia_ban || '0');
                    const type = normalizeCategory(r.danh_muc || '');
                    const features = Array.isArray(r.tinh_nang) ? r.tinh_nang : [];
                    if (thongSo['Core']) features.push(`Core: ${thongSo['Core']}`);
                    if (thongSo['RAM']) features.push(`RAM: ${thongSo['RAM']}`);
                    if (thongSo['DBs']) features.push(`DBs: ${thongSo['DBs']}`);
                    if (thongSo['Network']) features.push(`Network: ${thongSo['Network']}`);
                    if (thongSo['Network Mbps']) features.push(`Network: ${thongSo['Network Mbps']} Mbps`);
                    if (thongSo['Disk']) features.push(`Disk: ${thongSo['Disk']}`);
                    const storage = thongSo['Dung lượng'] || thongSo['DL'] || thongSo['Storage'] || '';
                    const bandwidth = thongSo['Băng thông'] || thongSo['BW'] || thongSo['Bandwidth'] || '';
                    const websites = parseInt(thongSo['Domains'] || thongSo['Websites'] || '0') || 0;
                    const emails = thongSo['Email'] ? parseInt(thongSo['Email']) || undefined : undefined;
                    return {
                        id: r.id,
                        name: r.ten_san_pham || 'Sản phẩm',
                        type,
                        storage,
                        bandwidth,
                        websites,
                        emails,
                        ssl: true,
                        backup: 'Hàng tuần',
                        support: '24/7',
                        sla: '99.9%',
                        price: {
                            monthly: gia,
                            quarterly: gia,
                            yearly: gia
                        },
                        unit: r.don_vi || '',
                        features,
                        recommended: false
                    };
                });
                setAllPlans(mapped);
                const blogsRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listBlogs"])({
                    page: 1,
                    perPage: 3,
                    sort: '-created'
                });
                setBlogPosts(blogsRes.items || []);
            } catch (err) {
                console.error('Failed to load data:', err);
            } finally{
                setLoading(false);
            }
        };
        loadData();
    }, []);
    const getCategoryPlans = ()=>{
        if (activeCategory === 'wordpress') {
            return allPlans.filter((p)=>p.type === 'wordpress').slice(0, 3);
        } else if (activeCategory === 'vps') {
            return allPlans.filter((p)=>p.type === 'business').slice(0, 3);
        } else {
            return allPlans.filter((p)=>p.type === 'email').slice(0, 3);
        }
    };
    const currentPlans = getCategoryPlans();
    const handleAddToCart = (plan, duration)=>{
        addToCart(plan, duration);
        router.push('/cart');
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#034CC9]"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/page.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-gray-600",
                        children: "Đang tải..."
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/page.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 108,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(main)/page.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid lg:grid-cols-2 gap-12 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-fade-in",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl md:text-5xl font-bold mb-6",
                                        children: "Dịch vụ Hosting tốc độ cao cho Website WordPress & Doanh nghiệp"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-4 mb-8 text-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-white/10 px-4 py-2 rounded-lg",
                                                children: "OpenLiteSpeed"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-white/10 px-4 py-2 rounded-lg",
                                                children: "CloudLinux"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-white/10 px-4 py-2 rounded-lg",
                                                children: "Backup tuần"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-white/10 px-4 py-2 rounded-lg",
                                                children: "Triển khai tự động"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 130,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-white/10 px-4 py-2 rounded-lg",
                                                children: "Hỗ trợ nhanh chóng"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/pricing",
                                                className: "bg-white text-[#034CC9] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105",
                                                children: "Mua ngay"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/advisor",
                                                className: "bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all hover:scale-105",
                                                children: "Tư vấn chọn gói"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/page.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden lg:block animate-fade-in",
                                style: {
                                    animationDelay: '0.2s'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/what-is-web-hosting-1.webp",
                                    alt: "Hosting Infrastructure",
                                    className: "rounded-2xl shadow-2xl w-full h-auto"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/page.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/page.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "hosting-plans",
                className: "py-16 bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-[#0B2B6F] mb-2",
                                    children: "Hosting WordPress tối ưu SEO – Gói nổi bật"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Lựa chọn hoàn hảo cho doanh nghiệp của bạn"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center gap-4 mb-12 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveCategory('wordpress'),
                                    className: `px-6 py-3 rounded-lg font-semibold transition-all ${activeCategory === 'wordpress' ? 'bg-[#034CC9] text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                    children: "wordpress max speed"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveCategory('vps'),
                                    className: `px-6 py-3 rounded-lg font-semibold transition-all ${activeCategory === 'vps' ? 'bg-[#034CC9] text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                    children: "vps NVME Xeon platinum gen 2"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveCategory('email'),
                                    className: `px-6 py-3 rounded-lg font-semibold transition-all ${activeCategory === 'email' ? 'bg-[#034CC9] text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                    children: "Email doanh nghiệp"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this),
                        currentPlans.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-3 gap-8",
                            children: currentPlans.map((plan, idx)=>{
                                const isRecommended = idx === 1;
                                const price = plan.price.monthly;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `bg-white rounded-2xl shadow-lg p-6 border-2 ${isRecommended ? 'border-[#034CC9] shadow-xl relative animate-glow' : 'border-transparent hover:border-[#034CC9]'} transition-all hover:scale-105`,
                                    children: [
                                        isRecommended && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-recommended-pulse",
                                            children: "⭐ PHỔ BIẾN NHẤT"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 218,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-[#0B2B6F] mb-2",
                                            children: plan.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 222,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 uppercase mb-4",
                                            children: activeCategory === 'wordpress' ? 'WORDPRESS-MAXSPEED' : activeCategory === 'vps' ? 'VPS-NVME' : 'EMAIL-DOANHNGHIEP'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 223,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-3xl font-bold text-[#034CC9]",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoneyVN"])(price)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500 ml-2",
                                                    children: "Tháng"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 224,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-2 mb-4",
                                            children: (()=>{
                                                const core = plan.features.find((f)=>f.toLowerCase().includes('core:'))?.split(':')[1]?.trim() || '';
                                                const ram = plan.features.find((f)=>f.toLowerCase().includes('ram:'))?.split(':')[1]?.trim() || '';
                                                const disk = plan.features.find((f)=>f.toLowerCase().includes('disk:'))?.split(':')[1]?.trim() || plan.storage || '';
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border border-gray-200 rounded-lg p-2 bg-blue-50/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-600 mb-1",
                                                                    children: "Core"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 239,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-semibold text-gray-900",
                                                                    children: core || '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border border-gray-200 rounded-lg p-2 bg-blue-50/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-600 mb-1",
                                                                    children: "RAM"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 243,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-semibold text-gray-900",
                                                                    children: ram || '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 244,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 242,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border border-gray-200 rounded-lg p-2 bg-blue-50/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-600 mb-1",
                                                                    children: "Disk"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 247,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-semibold text-gray-900",
                                                                    children: disk || '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 248,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true);
                                            })()
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 231,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2 mb-6",
                                            children: plan.features.filter((f)=>!f.includes(':')).slice(0, 4).map((feature, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start text-sm text-gray-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: feature
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 254,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleAddToCart(plan, 'monthly'),
                                            className: `w-full text-white py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 ${isRecommended ? 'bg-gradient-to-r from-[#034CC9] to-[#0B2B6F] hover:from-[#0B2B6F] hover:to-[#034CC9] shadow-lg' : 'bg-[#034CC9] hover:bg-[#0B2B6F]'}`,
                                            children: isRecommended ? 'Chọn gói ngay ⭐' : 'Xem gói'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 262,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, plan.id, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 209,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 203,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600",
                                children: "Chưa có sản phẩm nào trong danh mục này."
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/page.tsx",
                                lineNumber: 278,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 277,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-[#0B2B6F] mb-2",
                                    children: "Tại sao chọn Hosting VMST Host?"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Những lợi ích vượt trội khi sử dụng dịch vụ của chúng tôi"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 289,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 287,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-3 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-6 rounded-xl hover:shadow-lg transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-8 h-8 text-[#034CC9]",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 293,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-[#0B2B6F] mb-2",
                                            children: "Tốc độ cực nhanh"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 298,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: "OpenLiteSpeed và SSD NVMe cho hiệu suất vượt trội"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 299,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-6 rounded-xl hover:shadow-lg transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-8 h-8 text-[#034CC9]",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 303,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 302,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-[#0B2B6F] mb-2",
                                            children: "Bảo mật cao"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 307,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: "SSL miễn phí, CloudLinux và Imunify360 bảo vệ website"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 308,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 301,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-6 rounded-xl hover:shadow-lg transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-8 h-8 text-[#034CC9]",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 312,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 311,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-[#0B2B6F] mb-2",
                                            children: "Hỗ trợ 24/7"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 316,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: "Đội ngũ kỹ thuật chuyên nghiệp sẵn sàng hỗ trợ mọi lúc"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 317,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-6 rounded-xl hover:shadow-lg transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-8 h-8 text-[#034CC9]",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 320,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-[#0B2B6F] mb-2",
                                            children: "Backup tự động"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 325,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: "Sao lưu hàng tuần, khôi phục dữ liệu dễ dàng"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 319,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-6 rounded-xl hover:shadow-lg transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-8 h-8 text-[#034CC9]",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-[#0B2B6F] mb-2",
                                            children: "Uptime 99.9%"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 334,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: "Đảm bảo website luôn hoạt động ổn định"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 335,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 328,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-6 rounded-xl hover:shadow-lg transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-8 h-8 text-[#034CC9]",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 339,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 338,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-[#0B2B6F] mb-2",
                                            children: "Giá cả hợp lý"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: "Gói dịch vụ chất lượng với mức giá cạnh tranh"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 286,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this),
            currentPlans.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 bg-gray-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-[#0B2B6F] mb-2",
                                    children: "Hosting giá rẻ cho người mới bắt đầu"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 355,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Phù hợp với hầu hết doanh nghiệp SME"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 354,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-3 gap-8",
                            children: currentPlans.map((plan, idx)=>{
                                const isRecommended = idx === 1;
                                const price = plan.price.monthly;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `bg-white rounded-2xl shadow-lg p-6 border-2 ${isRecommended ? 'border-[#034CC9] shadow-xl relative animate-glow' : 'border-transparent hover:border-[#034CC9]'} transition-all hover:scale-105`,
                                    children: [
                                        isRecommended && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-recommended-pulse",
                                            children: "⭐ PHỔ BIẾN NHẤT"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 373,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-[#0B2B6F] mb-2",
                                            children: plan.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 377,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 uppercase mb-4",
                                            children: activeCategory === 'wordpress' ? 'WORDPRESS-MAXSPEED' : activeCategory === 'vps' ? 'VPS-NVME' : 'EMAIL-DOANHNGHIEP'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 378,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-3xl font-bold text-[#034CC9]",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoneyVN"])(price)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500 ml-2",
                                                    children: "Tháng"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 383,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-2 mb-4",
                                            children: (()=>{
                                                const core = plan.features.find((f)=>f.toLowerCase().includes('core:'))?.split(':')[1]?.trim() || '';
                                                const ram = plan.features.find((f)=>f.toLowerCase().includes('ram:'))?.split(':')[1]?.trim() || '';
                                                const disk = plan.features.find((f)=>f.toLowerCase().includes('disk:'))?.split(':')[1]?.trim() || plan.storage || '';
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border border-gray-200 rounded-lg p-2 bg-blue-50/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-600 mb-1",
                                                                    children: "Core"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 393,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-semibold text-gray-900",
                                                                    children: core || '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 394,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 392,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border border-gray-200 rounded-lg p-2 bg-blue-50/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-600 mb-1",
                                                                    children: "RAM"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 397,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-semibold text-gray-900",
                                                                    children: ram || '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 398,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border border-gray-200 rounded-lg p-2 bg-blue-50/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-600 mb-1",
                                                                    children: "Disk"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 401,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-semibold text-gray-900",
                                                                    children: disk || '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/page.tsx",
                                                                    lineNumber: 402,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 400,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true);
                                            })()
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 385,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2 mb-6",
                                            children: plan.features.filter((f)=>!f.includes(':')).slice(0, 4).map((feature, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start text-sm text-gray-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: feature
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 412,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 408,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleAddToCart(plan, 'monthly'),
                                            className: `w-full text-white py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 ${isRecommended ? 'bg-gradient-to-r from-[#034CC9] to-[#0B2B6F] hover:from-[#0B2B6F] hover:to-[#034CC9] shadow-lg' : 'bg-[#034CC9] hover:bg-[#0B2B6F]'}`,
                                            children: "Chọn gói"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 416,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, plan.id, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 364,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 358,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 353,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 352,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-4 gap-8 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-fade-in",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl md:text-5xl font-bold text-[#034CC9] mb-2",
                                        children: "10,000+"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 font-semibold",
                                        children: "Khách hàng tin tưởng"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 440,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/page.tsx",
                                lineNumber: 438,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-fade-in",
                                style: {
                                    animationDelay: '0.1s'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl md:text-5xl font-bold text-[#034CC9] mb-2",
                                        children: "99.9%"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 font-semibold",
                                        children: "Uptime đảm bảo"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 444,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/page.tsx",
                                lineNumber: 442,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-fade-in",
                                style: {
                                    animationDelay: '0.2s'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl md:text-5xl font-bold text-[#034CC9] mb-2",
                                        children: "24/7"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 447,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 font-semibold",
                                        children: "Hỗ trợ kỹ thuật"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/page.tsx",
                                lineNumber: 446,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-fade-in",
                                style: {
                                    animationDelay: '0.3s'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl md:text-5xl font-bold text-[#034CC9] mb-2",
                                        children: "100%"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 451,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 font-semibold",
                                        children: "Hài lòng khách hàng"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/page.tsx",
                                        lineNumber: 452,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/page.tsx",
                                lineNumber: 450,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/page.tsx",
                        lineNumber: 437,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 436,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 435,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 bg-gray-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-[#0B2B6F] mb-2",
                                    children: "Công nghệ Hosting tiên tiến – SSD NVMe & OpenLiteSpeed"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 462,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Hạ tầng hiện đại đảm bảo hiệu suất tối ưu"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 463,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 461,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl mb-3",
                                            children: "⚡"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-[#0B2B6F] mb-2",
                                            children: "OpenLiteSpeed"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 468,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: "Web server tốc độ cao nhất"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 469,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 466,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl mb-3",
                                            children: "💾"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 472,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-[#0B2B6F] mb-2",
                                            children: "SSD NVMe"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 473,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: "Ổ cứng siêu tốc độ"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 474,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 471,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl mb-3",
                                            children: "🔒"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 477,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-[#0B2B6F] mb-2",
                                            children: "CloudLinux"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 478,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: "Bảo mật và ổn định"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 479,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 476,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl mb-3",
                                            children: "🛡️"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 482,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-[#0B2B6F] mb-2",
                                            children: "Imunify360"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 483,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: "Bảo vệ website toàn diện"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 484,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 481,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl mb-3",
                                            children: "☁️"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 487,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-[#0B2B6F] mb-2",
                                            children: "CDN Global"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 488,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: "Tăng tốc toàn cầu"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 489,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 486,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl mb-3",
                                            children: "🔐"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 492,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-[#0B2B6F] mb-2",
                                            children: "SSL Miễn phí"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 493,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: "Bảo mật HTTPS"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 494,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 491,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl mb-3",
                                            children: "📦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 497,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-[#0B2B6F] mb-2",
                                            children: "DirectAdmin"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 498,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: "Control Panel dễ sử dụng"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 499,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 496,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl mb-3",
                                            children: "🔄"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 502,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-[#0B2B6F] mb-2",
                                            children: "Auto Backup"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 503,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: "Sao lưu tự động hàng ngày"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 504,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 501,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 465,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 460,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 459,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-[#0B2B6F] mb-2",
                                    children: "Đánh giá từ khách hàng sử dụng Hosting"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 514,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Những phản hồi tích cực từ khách hàng"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 515,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 513,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex text-yellow-400",
                                                children: '★'.repeat(5)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 520,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 519,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 mb-4 italic",
                                            children: '"Dịch vụ hosting của VMST rất ổn định, tốc độ nhanh và hỗ trợ kỹ thuật rất nhiệt tình. Website của tôi chạy mượt mà không bị gián đoạn."'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 522,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3",
                                                    children: "AN"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-gray-900",
                                                            children: "Anh Nam"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 528,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: "CEO, Công ty ABC"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 529,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 527,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 525,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 518,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex text-yellow-400",
                                                children: '★'.repeat(5)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 535,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 534,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 mb-4 italic",
                                            children: '"Từ khi chuyển sang VMST Host, website bán hàng của tôi tải nhanh hơn rất nhiều. Khách hàng phản hồi tích cực về trải nghiệm."'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 537,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3",
                                                    children: "TL"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-gray-900",
                                                            children: "Chị Lan"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 543,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: "Chủ shop online"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 544,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 542,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 540,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 533,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex text-yellow-400",
                                                children: '★'.repeat(5)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 550,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 549,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 mb-4 italic",
                                            children: '"Hỗ trợ kỹ thuật 24/7 rất chuyên nghiệp. Mọi vấn đề đều được giải quyết nhanh chóng. Rất hài lòng với dịch vụ!"'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 552,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3",
                                                    children: "MH"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 556,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-gray-900",
                                                            children: "Anh Minh"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 558,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: "Freelancer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 559,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 557,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 555,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 548,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex text-yellow-400",
                                                children: '★'.repeat(5)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 565,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 564,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 mb-4 italic",
                                            children: '"VMST Host đã giúp công ty chúng tôi có một hạ tầng hosting ổn định và hiệu suất cao. Đội ngũ hỗ trợ rất chuyên nghiệp và nhiệt tình."'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 567,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3",
                                                    children: "AM"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 571,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-gray-900",
                                                            children: "A Mark"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 573,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: "CEO Công ty Việt Sing - Khách hàng Singapore"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 574,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 570,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 563,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex text-yellow-400",
                                                children: '★'.repeat(5)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 580,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 579,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 mb-4 italic",
                                            children: '"Dịch vụ của VMST Host vượt ngoài mong đợi. Website của công ty chạy rất mượt, không có downtime. Rất đáng tin cậy!"'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3",
                                                    children: "CJ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-gray-900",
                                                            children: "Chị Joey"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 588,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: "CEO Công ty Hanabi - Khách hàng Singapore"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 589,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 587,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 585,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 578,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex text-yellow-400",
                                                children: '★'.repeat(5)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/page.tsx",
                                                lineNumber: 595,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 594,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 mb-4 italic",
                                            children: '"Tốc độ và độ ổn định của hosting VMST rất ấn tượng. Hỗ trợ kỹ thuật luôn sẵn sàng giúp đỡ. Chúng tôi rất hài lòng với dịch vụ!"'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 597,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3",
                                                    children: "GT"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-gray-900",
                                                            children: "Chị Gold Tea"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 603,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: "CEO Công ty Helmetspa - Khách hàng Singapore"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 604,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 602,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 600,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 593,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 517,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 512,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 511,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 bg-gradient-to-r from-[#034CC9] to-[#0B2B6F] text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl font-bold mb-4",
                            children: "Mua Hosting uy tín tại Việt Nam – Bắt đầu ngay"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 615,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl text-blue-100 mb-8 max-w-2xl mx-auto",
                            children: "Chọn gói hosting phù hợp và bắt đầu xây dựng website của bạn ngay hôm nay"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 616,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 justify-center flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/pricing",
                                    className: "bg-white text-[#034CC9] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105",
                                    children: "Xem bảng giá"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 620,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all hover:scale-105",
                                    children: "Liên hệ tư vấn"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 626,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 619,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 614,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 613,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 bg-gray-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-[#0B2B6F] mb-2",
                                    children: "Câu hỏi thường gặp về Hosting"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 640,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Giải đáp những thắc mắc phổ biến nhất"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 641,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 639,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                {
                                    q: 'Hosting là gì và tại sao cần hosting cho website?',
                                    a: 'Hosting là dịch vụ lưu trữ website trên máy chủ, giúp website của bạn hoạt động 24/7 trên internet. Mọi website đều cần hosting để người dùng có thể truy cập. VMST Host cung cấp hosting SSD NVMe tốc độ cao, phù hợp cho mọi loại website.'
                                },
                                {
                                    q: 'Hosting giá rẻ có tốt không?',
                                    a: 'Hosting giá rẻ vẫn có thể đảm bảo chất lượng nếu nhà cung cấp sử dụng hạ tầng tốt. VMST Host sử dụng SSD NVMe, OpenLiteSpeed và CloudLinux để đảm bảo tốc độ và ổn định ngay cả với gói giá rẻ.'
                                },
                                {
                                    q: 'Nên chọn hosting WordPress hay Business Hosting?',
                                    a: 'Nếu website của bạn chạy WordPress, hãy chọn WordPress Hosting vì đã được tối ưu sẵn với LiteSpeed Cache và WordPress Toolkit. Business Hosting phù hợp cho các ứng dụng web khác hoặc website thương mại điện tử phức tạp.'
                                },
                                {
                                    q: 'VMST Host có hỗ trợ chuyển hosting không?',
                                    a: 'Có, VMST Host hỗ trợ chuyển hosting miễn phí từ nhà cung cấp cũ sang. Đội ngũ kỹ thuật sẽ thực hiện migration đảm bảo không mất dữ liệu.'
                                },
                                {
                                    q: 'Hosting có ảnh hưởng đến SEO không?',
                                    a: 'Có, tốc độ hosting ảnh hưởng trực tiếp đến Core Web Vitals và thứ hạng SEO. Hosting nhanh giúp website load nhanh hơn, giảm tỷ lệ thoát và tăng thứ hạng trên Google.'
                                }
                            ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setFaqOpenIndex(faqOpenIndex === i ? null : i),
                                            className: "w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[#0B2B6F] hover:bg-blue-50/40 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item.q
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 671,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-4 text-[#034CC9] text-xl leading-none flex-shrink-0",
                                                    children: faqOpenIndex === i ? '−' : '+'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 672,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 667,
                                            columnNumber: 17
                                        }, this),
                                        faqOpenIndex === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4",
                                            children: item.a
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 677,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 666,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 643,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 638,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 637,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12 bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-[#0B2B6F] mb-6 text-center",
                            children: "Khám phá thêm"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 690,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3",
                            children: [
                                {
                                    href: '/wordpress-hosting',
                                    label: 'Hosting WordPress giá rẻ'
                                },
                                {
                                    href: '/business-hosting',
                                    label: 'Hosting cho doanh nghiệp'
                                },
                                {
                                    href: '/email-domain',
                                    label: 'Email doanh nghiệp'
                                },
                                {
                                    href: '/pricing',
                                    label: 'Bảng giá hosting'
                                },
                                {
                                    href: '/contact',
                                    label: 'Liên hệ tư vấn'
                                },
                                {
                                    href: '/advisor',
                                    label: 'Tư vấn chọn gói'
                                }
                            ].map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: "flex items-center justify-center text-center text-sm font-medium text-[#034CC9] bg-blue-50 hover:bg-[#034CC9] hover:text-white border border-blue-100 rounded-xl px-3 py-4 transition-all hover:shadow-md",
                                    children: link.label
                                }, link.href, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 700,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 691,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 689,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 688,
                columnNumber: 7
            }, this),
            blogPosts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-[#0B2B6F] mb-2",
                                    children: "Blog Hosting – Hướng dẫn & Kiến thức"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 717,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Kiến thức và tips hữu ích từ VMST Host"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 718,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 716,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-3 gap-6",
                            children: blogPosts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/blog/${post.slug}`,
                                    className: "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBlogImageUrl"])(post),
                                            alt: post.tieu_de,
                                            className: "w-full h-48 object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 727,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 mb-2",
                                                    children: new Date(post.created || '').toLocaleDateString('vi-VN')
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 733,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-[#0B2B6F] mb-2 line-clamp-2",
                                                    children: post.tieu_de
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 736,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 text-sm mb-4 line-clamp-3",
                                                    children: post.mo_ta_ngan || ''
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 739,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#034CC9] font-semibold flex items-center hover:text-[#0B2B6F] transition-colors",
                                                    children: [
                                                        "Đọc thêm ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            className: "ml-2 h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/page.tsx",
                                                            lineNumber: 743,
                                                            columnNumber: 32
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/page.tsx",
                                                    lineNumber: 742,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/page.tsx",
                                            lineNumber: 732,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, post.id, true, {
                                    fileName: "[project]/app/(main)/page.tsx",
                                    lineNumber: 722,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 720,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mt-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/blog",
                                className: "bg-[#034CC9] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-all",
                                children: "Xem tất cả bài viết →"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/page.tsx",
                                lineNumber: 750,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/page.tsx",
                            lineNumber: 749,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/page.tsx",
                    lineNumber: 715,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 714,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeoContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$seo$2d$articles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["seoData"].home
            }, void 0, false, {
                fileName: "[project]/app/(main)/page.tsx",
                lineNumber: 760,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/page.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_bbf4b236._.js.map