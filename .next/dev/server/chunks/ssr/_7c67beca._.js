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
"[project]/app/(main)/advisor/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdvisorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-ssr] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/products.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/CartContext.tsx [app-ssr] (ecmascript)");
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
function AdvisorPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const [storage, setStorage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [traffic, setTraffic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [websites, setWebsites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [planType, setPlanType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('unsure');
    const [recommendation, setRecommendation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reasons, setReasons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dynamicPlans, setDynamicPlans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadProducts = async ()=>{
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listProducts"])({
                    perPage: 50,
                    status: 'active'
                });
                const mapped = (res.items || []).map((r)=>{
                    const thongSo = r.thong_so || {};
                    const gia = parseInt(r.gia_ban || '0');
                    const dm = (r.danh_muc || '').trim();
                    let type = 'business';
                    if (dm.toLowerCase() === 'wordpress max speed') type = 'wordpress';
                    else if (dm.toLowerCase() === 'email') type = 'email';
                    else type = 'business';
                    const features = Array.isArray(r.tinh_nang) ? r.tinh_nang : [];
                    if (thongSo['Core']) features.push(`Core: ${thongSo['Core']}`);
                    if (thongSo['RAM']) features.push(`RAM: ${thongSo['RAM']}`);
                    if (thongSo['Network Mbps']) features.push(`Network: ${thongSo['Network Mbps']} Mbps`);
                    return {
                        id: r.id,
                        name: r.ten_san_pham || 'Sản phẩm',
                        type,
                        storage: thongSo['Dung lượng'] || '',
                        bandwidth: thongSo['Băng thông'] || '',
                        websites: parseInt(thongSo['Domains'] || '0') || 0,
                        emails: thongSo['Email'] ? parseInt(thongSo['Email']) || undefined : undefined,
                        ssl: true,
                        backup: 'Hằng ngày',
                        support: '24/7',
                        sla: '99.9%',
                        price: {
                            monthly: gia,
                            quarterly: gia,
                            yearly: gia
                        },
                        features,
                        recommended: false
                    };
                });
                setDynamicPlans(mapped);
            } catch (err) {
                setDynamicPlans([]);
            }
        };
        loadProducts();
    }, []);
    const handleSubmit = (e)=>{
        e.preventDefault();
        const storageNum = parseInt(storage);
        const trafficNum = parseInt(traffic);
        const websitesNum = parseInt(websites);
        let recommendedPlan = null;
        const recommendationReasons = [];
        const sourcePlans = dynamicPlans.length > 0 ? dynamicPlans : [];
        const plans = planType === 'business' ? sourcePlans.filter((p)=>p.type === 'business') : sourcePlans.filter((p)=>p.type === 'wordpress');
        if (plans.length === 0) {
            setRecommendation(null);
            setReasons([
                'Chưa có dữ liệu sản phẩm để tư vấn. Vui lòng quay lại sau.'
            ]);
            return;
        }
        for (const plan of plans){
            const planStorage = parseInt(plan.storage);
            const planTraffic = parseInt(plan.bandwidth);
            const storageHeadroom = planStorage / storageNum * 100;
            const trafficHeadroom = planTraffic / trafficNum * 100;
            if (storageHeadroom >= 115 && storageHeadroom <= 200 && trafficHeadroom >= 115 && trafficHeadroom <= 200 && plan.websites >= websitesNum) {
                recommendedPlan = plan;
                recommendationReasons.push(`Dung lượng ${plan.storage} phù hợp với nhu cầu ${storage}GB của bạn (headroom 15-20%)`);
                recommendationReasons.push(`Băng thông ${plan.bandwidth} đáp ứng traffic ${traffic}GB/tháng`);
                recommendationReasons.push(`Hỗ trợ ${plan.websites} websites (bạn cần ${websitesNum})`);
                recommendationReasons.push(`SLA ${plan.sla} đảm bảo uptime cao`);
                if (plan.recommended) {
                    recommendationReasons.push('Gói được lựa chọn nhiều nhất bởi khách hàng');
                }
                break;
            }
        }
        if (!recommendedPlan) {
            recommendedPlan = plans[0] || null;
            if (recommendedPlan) {
                recommendationReasons.push('Gợi ý dựa trên loại gói bạn đã chọn');
                recommendationReasons.push('Cân bằng tốt giữa hiệu năng và chi phí');
            }
        }
        setRecommendation(recommendedPlan);
        setReasons(recommendationReasons.length > 0 ? recommendationReasons : [
            'Chưa có gợi ý chi tiết'
        ]);
    };
    const handleAddToCart = (plan)=>{
        addToCart(plan, 'monthly');
        router.push('/cart');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                                    className: "h-12 w-12 mr-3"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl sm:text-5xl font-bold",
                                    children: "Tư vấn chọn gói Hosting phù hợp – Miễn phí"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/advisor/page.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl text-blue-100 text-center max-w-3xl mx-auto",
                            children: "Trả lời vài câu hỏi đơn giản để hệ thống gợi ý gói Hosting WordPress hoặc VPS phù hợp nhất với nhu cầu và ngân sách của bạn"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/advisor/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/advisor/page.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(main)/advisor/page.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-lg p-8 mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: "Dung lượng website (GB)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: storage,
                                            onChange: (e)=>setStorage(e.target.value),
                                            required: true,
                                            min: "1",
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]",
                                            placeholder: "Ví dụ: 10"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-500 mt-1",
                                            children: "Dung lượng hiện tại hoặc dự kiến của website"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: "Traffic/tháng (GB)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: traffic,
                                            onChange: (e)=>setTraffic(e.target.value),
                                            required: true,
                                            min: "1",
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]",
                                            placeholder: "Ví dụ: 50"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-500 mt-1",
                                            children: "Lượng traffic trung bình mỗi tháng"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-2",
                                            children: "Số lượng websites"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 176,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: websites,
                                            onChange: (e)=>setWebsites(e.target.value),
                                            required: true,
                                            min: "1",
                                            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]",
                                            placeholder: "Ví dụ: 3"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-500 mt-1",
                                            children: "Số website bạn cần host"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 mb-3",
                                            children: "Loại website"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#034CC9] transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            value: "wordpress",
                                                            checked: planType === 'wordpress',
                                                            onChange: (e)=>setPlanType(e.target.value),
                                                            className: "mr-3 text-[#034CC9]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-gray-900",
                                                                    children: "WordPress"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                                                    lineNumber: 205,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-500",
                                                                    children: "Website WordPress hoặc kế hoạch sử dụng WordPress"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                                                    lineNumber: 206,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#034CC9] transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            value: "business",
                                                            checked: planType === 'business',
                                                            onChange: (e)=>setPlanType(e.target.value),
                                                            className: "mr-3 text-[#034CC9]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-gray-900",
                                                                    children: "Business / Custom"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                                                    lineNumber: 218,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-500",
                                                                    children: "Ứng dụng tùy chỉnh, thương mại điện tử, hoặc nhiều công nghệ"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                                                    lineNumber: 219,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#034CC9] transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            value: "unsure",
                                                            checked: planType === 'unsure',
                                                            onChange: (e)=>setPlanType(e.target.value),
                                                            className: "mr-3 text-[#034CC9]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-gray-900",
                                                                    children: "Không chắc chắn"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                                                    lineNumber: 231,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-500",
                                                                    children: "Hệ thống sẽ gợi ý WordPress Hosting (phổ biến nhất)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                                                    lineNumber: 232,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                                            lineNumber: 230,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 195,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "w-full bg-[#034CC9] text-white py-4 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors flex items-center justify-center",
                                    children: [
                                        "Xem gợi ý",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "ml-2 h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 243,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/advisor/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/advisor/page.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/advisor/page.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    recommendation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-lg p-8 border-2 border-[#034CC9]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-green-100 p-3 rounded-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "h-8 w-8 text-green-600"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/advisor/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-[#0B2B6F]",
                                                children: "Gói phù hợp nhất với bạn"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 255,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600",
                                                children: "Dựa trên nhu cầu bạn đã cung cấp"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 256,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 254,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-br from-[#E6EEFF] to-white rounded-xl p-8 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-3xl font-bold text-[#034CC9] mb-2",
                                        children: recommendation.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700 mb-4",
                                        children: recommendation.type === 'wordpress' ? 'WordPress Hosting' : 'Business Hosting'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-5xl font-bold text-[#0B2B6F]",
                                                children: [
                                                    recommendation.price.monthly.toLocaleString('vi-VN'),
                                                    "₫"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 266,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500 ml-2",
                                                children: "/tháng"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 269,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-2 gap-4 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-4 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600 mb-1",
                                                        children: "Dung lượng"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg font-semibold text-[#0B2B6F]",
                                                        children: recommendation.storage
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 272,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-4 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600 mb-1",
                                                        children: "Băng thông"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg font-semibold text-[#0B2B6F]",
                                                        children: recommendation.bandwidth
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-4 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600 mb-1",
                                                        children: "Websites"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg font-semibold text-[#0B2B6F]",
                                                        children: recommendation.websites
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 280,
                                                columnNumber: 17
                                            }, this),
                                            recommendation.emails !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-4 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600 mb-1",
                                                        children: "Email Accounts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg font-semibold text-[#0B2B6F]",
                                                        children: recommendation.emails
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 285,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleAddToCart(recommendation),
                                        className: "w-full bg-[#034CC9] text-white py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors",
                                        children: "Chọn gói này"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-[#0B2B6F] mb-3",
                                        children: "Lý do gợi ý"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "list-disc ml-5 text-gray-700 space-y-2",
                                        children: reasons.map((r, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: r
                                            }, idx, false, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/advisor/page.tsx",
                        lineNumber: 249,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-lg p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-[#0B2B6F] mb-2",
                                children: "Chưa có dữ liệu sản phẩm để gợi ý"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600",
                                children: "Vui lòng vào trang Bảng giá để xem các sản phẩm hiện có."
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                lineNumber: 312,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/advisor/page.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-12 bg-white rounded-2xl shadow-lg p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-[#0B2B6F] mb-6",
                                children: "Xem chi tiết từng gói Hosting"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/wordpress-hosting",
                                        className: "block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-[#0B2B6F] mb-1",
                                                children: "WordPress Hosting"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "Tối ưu cho WordPress với LiteSpeed"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 320,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/business-hosting",
                                        className: "block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-[#0B2B6F] mb-1",
                                                children: "Hosting doanh nghiệp"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 325,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "VPS hiệu năng cao cho ứng dụng web"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 326,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 324,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/email-domain",
                                        className: "block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-[#0B2B6F] mb-1",
                                                children: "Email doanh nghiệp"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 329,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "Email theo tên miền chuyên nghiệp"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/advisor/page.tsx",
                                        lineNumber: 328,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/advisor/page.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/advisor/page.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/advisor/page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeoContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$seo$2d$articles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["seoData"].advisor
            }, void 0, false, {
                fileName: "[project]/app/(main)/advisor/page.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/advisor/page.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_7c67beca._.js.map