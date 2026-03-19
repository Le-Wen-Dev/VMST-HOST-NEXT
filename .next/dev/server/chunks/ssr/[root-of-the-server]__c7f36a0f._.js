module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/(main)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(main)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/(main)/blog/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(main)/blog/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/services/blogs-server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBlogBySlugServer",
    ()=>getBlogBySlugServer,
    "getBlogImageUrlServer",
    ()=>getBlogImageUrlServer,
    "listBlogsServer",
    ()=>listBlogsServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pocketbase/dist/pocketbase.es.mjs [app-rsc] (ecmascript)");
;
;
const PB_URL = process.env.PB_URL || ("TURBOPACK compile-time value", "https://api.vmst.host") || 'https://api.vmst.host';
function createPb() {
    const pb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](PB_URL);
    pb.autoCancellation(false);
    return pb;
}
async function listBlogsServer(params = {}) {
    const pb = createPb();
    const { page = 1, perPage = 10, search, categoryId, status, sort = '-created', expand } = params;
    const filters = [];
    if (search) {
        const s = search.replace(/'/g, "\\'");
        filters.push(`(tieu_de~"${s}" || mo_ta_ngan~"${s}" || slug~"${s}")`);
    }
    if (categoryId) filters.push(`danh_muc='${categoryId}'`);
    if (status) filters.push(`trang_thai='${status}'`);
    const filter = filters.length ? filters.join(' && ') : undefined;
    return await pb.collection('blogs').getList(page, perPage, {
        filter,
        sort,
        expand
    });
}
async function getBlogBySlugServer(slug, expand) {
    const pb = createPb();
    const records = await pb.collection('blogs').getList(1, 1, {
        filter: `slug='${slug}'`,
        expand
    });
    return records.items[0] || null;
}
function getBlogImageUrlServer(record) {
    const filename = record?.thumbnail || record?.avatar || '';
    if (!filename) return '';
    if (/^https?:\/\//.test(filename)) return filename;
    return `${PB_URL.replace(/\/$/, '')}/api/files/blogs/${record.id}/${filename}`;
}
}),
"[project]/services/category-blogs-server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCategoryBySlugServer",
    ()=>getCategoryBySlugServer,
    "listCategoryBlogsServer",
    ()=>listCategoryBlogsServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pocketbase/dist/pocketbase.es.mjs [app-rsc] (ecmascript)");
;
;
const PB_URL = process.env.PB_URL || ("TURBOPACK compile-time value", "https://api.vmst.host") || 'https://api.vmst.host';
function createPb() {
    const pb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](PB_URL);
    pb.autoCancellation(false);
    return pb;
}
async function listCategoryBlogsServer(params) {
    const pb = createPb();
    const { page = 1, perPage = 50, search } = params || {};
    const filters = [];
    if (search && search.trim()) {
        const s = search.trim();
        filters.push(`(name ?~ '${s}' || slug ?~ '${s}')`);
    }
    const filter = filters.length ? filters.join(' && ') : '';
    return await pb.collection('category_blogs').getList(page, perPage, {
        filter,
        sort: 'name'
    });
}
async function getCategoryBySlugServer(slug) {
    const pb = createPb();
    const res = await pb.collection('category_blogs').getList(1, 1, {
        filter: `slug='${slug}'`
    });
    return res.items[0] || null;
}
}),
"[project]/app/(main)/blog/[slug]/BlogPostClient.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/(main)/blog/[slug]/BlogPostClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(main)/blog/[slug]/BlogPostClient.tsx <module evaluation>", "default");
}),
"[project]/app/(main)/blog/[slug]/BlogPostClient.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/(main)/blog/[slug]/BlogPostClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(main)/blog/[slug]/BlogPostClient.tsx", "default");
}),
"[project]/app/(main)/blog/[slug]/BlogPostClient.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$blog$2f5b$slug$5d2f$BlogPostClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/(main)/blog/[slug]/BlogPostClient.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$blog$2f5b$slug$5d2f$BlogPostClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/(main)/blog/[slug]/BlogPostClient.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$blog$2f5b$slug$5d2f$BlogPostClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/(main)/blog/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogPostPage,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blogs$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/blogs-server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$category$2d$blogs$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/category-blogs-server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$blog$2f5b$slug$5d2f$BlogPostClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/blog/[slug]/BlogPostClient.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blogs$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBlogBySlugServer"])(slug, 'danh_muc,tac_gia');
    if (!post) {
        return {
            title: 'Bài viết không tồn tại | VMST HOST'
        };
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vmst.host';
    const canonical = `${siteUrl}/blog/${post.slug}`;
    const title = post.seo_title || post.tieu_de;
    const description = post.seo_description || post.mo_ta_ngan || '';
    const image = post.thumbnail || post.avatar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blogs$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBlogImageUrlServer"])(post) : 'https://placehold.co/1200x630/png?text=VMST%20HOST';
    return {
        title,
        description,
        alternates: {
            canonical
        },
        openGraph: {
            type: 'article',
            title,
            description,
            url: canonical,
            images: image ? [
                {
                    url: image
                }
            ] : [],
            publishedTime: post.created || post.ngay_viet,
            modifiedTime: post.updated || post.created
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: image ? [
                image
            ] : []
        }
    };
}
async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blogs$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBlogBySlugServer"])(slug, 'danh_muc,tac_gia');
    if (!post) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    // Fetch related posts and categories server-side
    let relatedPosts = [];
    try {
        const relRes = post.danh_muc ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blogs$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listBlogsServer"])({
            page: 1,
            perPage: 6,
            categoryId: post.danh_muc,
            sort: '-created'
        }) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blogs$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listBlogsServer"])({
            page: 1,
            perPage: 6,
            sort: '-created'
        });
        relatedPosts = (relRes.items || []).filter((r)=>r.id !== post.id).slice(0, 4);
    } catch  {}
    let relatedCategories = [];
    try {
        const cats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$category$2d$blogs$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listCategoryBlogsServer"])({
            page: 1,
            perPage: 20
        });
        relatedCategories = (cats.items || []).slice(0, 4);
    } catch  {}
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vmst.host';
    const canonical = `${siteUrl}/blog/${post.slug}`;
    const title = post.seo_title || post.tieu_de;
    const description = post.seo_description || post.mo_ta_ngan || '';
    const image = post.thumbnail || post.avatar ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blogs$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBlogImageUrlServer"])(post) : 'https://placehold.co/1200x630/png?text=VMST%20HOST';
    const published = post.created || post.ngay_viet || new Date().toISOString();
    const modified = post.updated || post.created || new Date().toISOString();
    const author = post.expand?.tac_gia?.ten || 'VMST HOST';
    const tags = (post.tag || '').split(',').map((t)=>t.trim()).filter(Boolean);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        image,
        datePublished: published,
        dateModified: modified,
        author: {
            '@type': 'Person',
            name: author
        },
        mainEntityOfPage: canonical,
        keywords: tags.join(', ')
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(jsonLd)
                }
            }, void 0, false, {
                fileName: "[project]/app/(main)/blog/[slug]/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$blog$2f5b$slug$5d2f$BlogPostClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                post: post,
                relatedPosts: relatedPosts,
                relatedCategories: relatedCategories,
                imageUrl: image
            }, void 0, false, {
                fileName: "[project]/app/(main)/blog/[slug]/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/(main)/blog/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(main)/blog/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c7f36a0f._.js.map