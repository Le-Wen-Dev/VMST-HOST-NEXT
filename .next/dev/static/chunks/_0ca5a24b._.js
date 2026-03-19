(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastContainer",
    ()=>ToastContainer,
    "default",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x-circle.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Toast({ type, message, onClose, duration = 3000 }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            const timer = setTimeout({
                "Toast.useEffect.timer": ()=>{
                    onClose();
                }
            }["Toast.useEffect.timer"], duration);
            return ({
                "Toast.useEffect": ()=>clearTimeout(timer)
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"], [
        duration,
        onClose
    ]);
    const config = {
        success: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
            bgColor: 'bg-green-50',
            borderColor: 'border-green-500',
            textColor: 'text-green-800',
            iconColor: 'text-green-500'
        },
        error: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"],
            bgColor: 'bg-red-50',
            borderColor: 'border-red-500',
            textColor: 'text-red-800',
            iconColor: 'text-red-500'
        },
        warning: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-500',
            textColor: 'text-yellow-800',
            iconColor: 'text-yellow-500'
        },
        info: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"],
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-500',
            textColor: 'text-blue-800',
            iconColor: 'text-blue-500'
        }
    };
    const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${bgColor} ${textColor} border-l-4 ${borderColor} p-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-in`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: `h-5 w-5 ${iconColor} flex-shrink-0`
            }, void 0, false, {
                fileName: "[project]/components/Toast.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "flex-1 font-medium",
                children: message
            }, void 0, false, {
                fileName: "[project]/components/Toast.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: `${textColor} hover:opacity-70 transition-opacity`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    className: "h-5 w-5"
                }, void 0, false, {
                    fileName: "[project]/components/Toast.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Toast.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Toast.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(Toast, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Toast;
function ToastContainer({ toasts, onRemove }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 z-50 space-y-2",
        children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toast, {
                type: toast.type,
                message: toast.message,
                onClose: ()=>onRemove(toast.id)
            }, toast.id, false, {
                fileName: "[project]/components/Toast.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/Toast.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_c1 = ToastContainer;
var _c, _c1;
__turbopack_context__.k.register(_c, "Toast");
__turbopack_context__.k.register(_c1, "ToastContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/ToastContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ToastProvider({ children }) {
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const showToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[showToast]": (type, message)=>{
            const id = Math.random().toString(36).substr(2, 9);
            const newToast = {
                id,
                type,
                message
            };
            setToasts({
                "ToastProvider.useCallback[showToast]": (prev)=>[
                        ...prev,
                        newToast
                    ]
            }["ToastProvider.useCallback[showToast]"]);
            setTimeout({
                "ToastProvider.useCallback[showToast]": ()=>{
                    setToasts({
                        "ToastProvider.useCallback[showToast]": (prev)=>prev.filter({
                                "ToastProvider.useCallback[showToast]": (toast)=>toast.id !== id
                            }["ToastProvider.useCallback[showToast]"])
                    }["ToastProvider.useCallback[showToast]"]);
                }
            }["ToastProvider.useCallback[showToast]"], 5000);
        }
    }["ToastProvider.useCallback[showToast]"], []);
    const showSuccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[showSuccess]": (message)=>showToast('success', message)
    }["ToastProvider.useCallback[showSuccess]"], [
        showToast
    ]);
    const showError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[showError]": (message)=>showToast('error', message)
    }["ToastProvider.useCallback[showError]"], [
        showToast
    ]);
    const showWarning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[showWarning]": (message)=>showToast('warning', message)
    }["ToastProvider.useCallback[showWarning]"], [
        showToast
    ]);
    const showInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[showInfo]": (message)=>showToast('info', message)
    }["ToastProvider.useCallback[showInfo]"], [
        showToast
    ]);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[removeToast]": (id)=>{
            setToasts({
                "ToastProvider.useCallback[removeToast]": (prev)=>prev.filter({
                        "ToastProvider.useCallback[removeToast]": (toast)=>toast.id !== id
                    }["ToastProvider.useCallback[removeToast]"])
            }["ToastProvider.useCallback[removeToast]"]);
        }
    }["ToastProvider.useCallback[removeToast]"], []);
    const value = {
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: value,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastContainer"], {
                toasts: toasts,
                onRemove: removeToast
            }, void 0, false, {
                fileName: "[project]/contexts/ToastContext.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/contexts/ToastContext.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(ToastProvider, "wmwogvXy/phhrJyctqHPOYyPSlc=");
_c = ToastProvider;
function useToast() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (context === undefined) throw new Error('useToast must be used within a ToastProvider');
    return context;
}
_s1(useToast, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/pocketbase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "getToken",
    ()=>getToken,
    "initAuth",
    ()=>initAuth,
    "isAdmin",
    ()=>isAdmin,
    "pb",
    ()=>pb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pocketbase/dist/pocketbase.es.mjs [app-client] (ecmascript)");
;
const baseUrl = ("TURBOPACK compile-time value", "https://api.vmst.host");
if ("TURBOPACK compile-time truthy", 1) {
    if (!baseUrl || typeof baseUrl !== 'string' || !/^https?:\/\//.test(baseUrl)) {
        console.error('PocketBase base URL (NEXT_PUBLIC_PB_URL) is missing or invalid:', baseUrl);
    }
}
const pb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](baseUrl || 'https://api.vmst.host');
// Only call loadFromCookie in the browser — never at module level (crashes SSR)
if ("TURBOPACK compile-time truthy", 1) {
    pb.authStore.loadFromCookie(document.cookie);
}
pb.autoCancellation(false);
function initAuth() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    (async ()=>{
        try {
            if (pb.authStore.isValid) {
                await pb.collection('users').authRefresh();
            }
        } catch (e) {
            console.warn('Auth refresh failed:', e);
            pb.authStore.clear();
        }
    })();
}
function getCurrentUser() {
    return pb.authStore.model || null;
}
function getToken() {
    return pb.authStore.token || null;
}
function isAdmin() {
    const u = getCurrentUser();
    const email = (u?.email || '').toLowerCase();
    const byRole = (u?.vai_tro || '').toLowerCase() === 'admin';
    const byEmail = email === 'admin@vmst.host';
    return byRole || byEmail;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pocketbase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// 7-day token persistence
const TOKEN_STORAGE_KEY = 'pb_auth_token_7days';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
function saveTokenToStorage(token, model) {
    if (!token || !model) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        return;
    }
    const payload = {
        token,
        model,
        expiresAt: Date.now() + SEVEN_DAYS_MS
    };
    try {
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(payload));
    } catch  {}
}
function loadTokenFromStorage() {
    try {
        const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.token || !parsed?.model) return null;
        if (Date.now() > (parsed.expiresAt || 0)) {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            return null;
        }
        return {
            token: parsed.token,
            model: parsed.model
        };
    } catch  {
        return null;
    }
}
function persistCookieFromAuthStore(maxAgeSeconds) {
    try {
        // Full pb_auth cookie for PocketBase SDK
        const cookie = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.exportToCookie({
            httpOnly: false,
            secure: true,
            sameSite: 'Lax',
            path: '/',
            maxAge: maxAgeSeconds
        });
        document.cookie = cookie;
        // Lightweight cookie for middleware auth check (avoids 4KB limit)
        const model = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.model;
        const role = model?.vai_tro || '';
        document.cookie = `pb_token=${__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.token}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
        document.cookie = `pb_role=${role}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    } catch  {}
}
function clearAuthCookie() {
    try {
        const cookie = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.exportToCookie({
            path: '/',
            maxAge: -1
        });
        document.cookie = cookie;
        document.cookie = 'pb_token=; path=/; max-age=-1';
        document.cookie = 'pb_role=; path=/; max-age=-1';
    } catch  {}
}
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Initialize auth state from PocketBase + localStorage (7 days)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Try hydrate from PocketBase first
            let currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
            let currentToken = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.token;
            // If not valid, try localStorage 7-day token
            if (!currentUser || !currentToken) {
                const restored = loadTokenFromStorage();
                if (restored) {
                    try {
                        // Set PocketBase auth store from persisted token
                        // @ts-ignore save method is available on AuthStore implementations
                        __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.save(restored.token, restored.model);
                        currentUser = restored.model;
                        currentToken = restored.token;
                        persistCookieFromAuthStore(SEVEN_DAYS_MS / 1000);
                    } catch (e) {
                        console.warn('Restore token from localStorage failed', e);
                        localStorage.removeItem(TOKEN_STORAGE_KEY);
                    }
                }
            }
            setUser(currentUser);
            setToken(currentToken);
            // Listen for auth changes and persist for 7 days
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.onChange({
                "AuthProvider.useEffect.unsubscribe": (changedToken, model)=>{
                    setUser(model);
                    setToken(changedToken);
                    if (changedToken && model) {
                        saveTokenToStorage(changedToken, model);
                        persistCookieFromAuthStore(SEVEN_DAYS_MS / 1000);
                    } else {
                        localStorage.removeItem(TOKEN_STORAGE_KEY);
                        clearAuthCookie();
                    }
                }
            }["AuthProvider.useEffect.unsubscribe"]);
            return unsubscribe;
        }
    }["AuthProvider.useEffect"], []);
    // Handle OAuth2 callback
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const handleOAuthCallback = {
                "AuthProvider.useEffect.handleOAuthCallback": async ()=>{
                    const urlParams = new URLSearchParams(window.location.search);
                    const code = urlParams.get('code');
                    const state = urlParams.get('state');
                    if (code && state) {
                        try {
                            const codeVerifier = sessionStorage.getItem('pb_oauth_code_verifier');
                            const redirectUrl = sessionStorage.getItem('pb_oauth_redirect') || window.location.origin + window.location.pathname;
                            const oauthCollection = sessionStorage.getItem('pb_oauth_collection') || 'users';
                            if (!codeVerifier) {
                                console.error('Missing code verifier in sessionStorage');
                                window.history.replaceState({}, document.title, window.location.pathname);
                                return;
                            }
                            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                            ;
                            // Ensure we're using the correct collection
                            const collection = __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection(oauthCollection);
                            // Call authWithOAuth2Code with proper parameters
                            // Note: redirectUrl should match what was used in the initial auth request
                            const authData = await collection.authWithOAuth2Code('google', code, codeVerifier, redirectUrl);
                            // Clean up sessionStorage
                            sessionStorage.removeItem('pb_oauth_code_verifier');
                            sessionStorage.removeItem('pb_oauth_redirect');
                            sessionStorage.removeItem('pb_oauth_collection');
                            // Update state from authData
                            const curUser = authData.record;
                            const curToken = authData.token;
                            setUser(curUser);
                            setToken(curToken);
                            saveTokenToStorage(curToken, curUser);
                            persistCookieFromAuthStore(SEVEN_DAYS_MS / 1000);
                            // Clean URL
                            window.history.replaceState({}, document.title, window.location.pathname);
                            // Small delay to ensure state is updated
                            setTimeout({
                                "AuthProvider.useEffect.handleOAuthCallback": ()=>{
                                    // Redirect based on user role
                                    const role = (curUser?.vai_tro || '').toLowerCase();
                                    const email = (curUser?.email || '').toLowerCase();
                                    if (role === 'admin' || email === 'admin@vmst.host') {
                                        window.location.href = '/admin';
                                    } else {
                                        window.location.href = '/portal';
                                    }
                                }
                            }["AuthProvider.useEffect.handleOAuthCallback"], 100);
                        } catch (error) {
                            console.error('OAuth callback error:', error);
                            // Clean up on error
                            sessionStorage.removeItem('pb_oauth_code_verifier');
                            sessionStorage.removeItem('pb_oauth_redirect');
                            sessionStorage.removeItem('pb_oauth_collection');
                            // Clean URL even on error
                            window.history.replaceState({}, document.title, window.location.pathname);
                            // Show error to user if we have toast context
                            if (error?.message) {
                                console.error('OAuth error details:', error.message);
                            }
                        }
                    }
                }
            }["AuthProvider.useEffect.handleOAuthCallback"];
            handleOAuthCallback();
        }
    }["AuthProvider.useEffect"], []);
    const isLoggedIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthProvider.useMemo[isLoggedIn]": ()=>!!user && !!token
    }["AuthProvider.useMemo[isLoggedIn]"], [
        user,
        token
    ]);
    const isAdminUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthProvider.useMemo[isAdminUser]": ()=>{
            if (!user) return false;
            const email = (user.email || '').toLowerCase();
            const byRole = (user.vai_tro || '').toLowerCase() === 'admin';
            const byEmail = email === 'admin@vmst.host';
            return byRole || byEmail;
        }
    }["AuthProvider.useMemo[isAdminUser]"], [
        user
    ]);
    const login = async (email, password)=>{
        const emailNormalized = email.trim().toLowerCase();
        try {
            const authData = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').authWithPassword(emailNormalized, password);
            const userRecord = authData.record;
            setUser(userRecord);
            setToken(authData.token);
            saveTokenToStorage(authData.token, userRecord);
            persistCookieFromAuthStore(SEVEN_DAYS_MS / 1000);
            return userRecord;
        } catch (error) {
            const data = error?.data?.data || error?.data;
            if (data && typeof data === 'object') {
                const messages = [];
                for (const key of Object.keys(data)){
                    const field = data[key];
                    const msg = field?.message || field;
                    if (msg) messages.push(`${key}: ${msg}`);
                }
                if (messages.length) throw new Error(messages.join(', '));
            }
            throw new Error(error?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    };
    const logout = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.clear();
        setUser(null);
        setToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        clearAuthCookie();
    };
    const register = async (input)=>{
        const data = {
            email: input.email.trim().toLowerCase(),
            emailVisibility: true,
            password: input.password,
            passwordConfirm: input.passwordConfirm,
            name: input.name || '',
            vai_tro: 'customer',
            trang_thai: 'active'
        };
        const record = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').create(data);
        // (optional) send email verification request
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').requestVerification(data.email);
        } catch  {}
        return record;
    };
    const forgotPassword = async (email)=>{
        const emailNormalized = email.trim().toLowerCase();
        await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').requestPasswordReset(emailNormalized);
    };
    const updateProfile = async (input)=>{
        if (!user) throw new Error('Not authenticated');
        const updateData = {};
        if (input.email) updateData.email = input.email.trim().toLowerCase();
        if (input.name) updateData.name = input.name;
        if (input.bio) updateData.bio = input.bio;
        const record = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').update(user.id, updateData);
        setUser(record);
        // If email changed, re-request verification
        if (updateData.email && updateData.email !== user.email) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').requestVerification(updateData.email);
            } catch  {}
        }
        return record;
    };
    const changePassword = async (newPassword, confirmPassword)=>{
        if (!user) throw new Error('Not authenticated');
        const record = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').update(user.id, {
            password: newPassword,
            passwordConfirm: confirmPassword
        });
        setUser(record);
        return record;
    };
    const loginWithGoogle = async ()=>{
        // Use 'users' collection (as shown in the PocketBase config)
        let methods;
        let collection = 'users';
        try {
            methods = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pocketbase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').listAuthMethods();
            const googleProvider = methods?.authProviders?.find((p)=>p.name === 'google');
            if (!googleProvider) {
                throw new Error('Google OAuth2 provider not found in users collection');
            }
            if (!googleProvider.codeVerifier) {
                throw new Error('Google OAuth2 codeVerifier is missing');
            }
            // Use the redirect URL from the provider or construct it
            // PocketBase usually expects the redirect URL to match what's configured in the provider
            const redirectUrl = googleProvider.redirectUrl || `${window.location.origin}/login`;
            // Store OAuth data in sessionStorage
            sessionStorage.setItem('pb_oauth_code_verifier', googleProvider.codeVerifier);
            sessionStorage.setItem('pb_oauth_redirect', redirectUrl);
            sessionStorage.setItem('pb_oauth_collection', collection);
            // Redirect to Google OAuth
            window.location.href = googleProvider.authUrl;
        } catch (e) {
            console.error('Google OAuth setup error:', e);
            throw new Error(e?.message || 'Google OAuth2 chưa được cấu hình đúng trong PocketBase. Vui lòng kiểm tra lại cấu hình OAuth2 trong admin panel.');
        }
    };
    const value = {
        user,
        token,
        isLoggedIn,
        isAdmin: isAdminUser,
        login,
        logout,
        register,
        forgotPassword,
        updateProfile,
        changePassword,
        loginWithGoogle
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/AuthContext.tsx",
        lineNumber: 367,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "e6BIeHEdA85rJP6qSzLCumWRaUQ=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/LocaleContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocaleProvider",
    ()=>LocaleProvider,
    "useLocale",
    ()=>useLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const LocaleContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const USD_TO_VND_RATE = 24000;
const translations = {
    vi: {
        'home': 'Trang chủ',
        'products': 'Sản phẩm',
        'pricing': 'Bảng giá',
        'blog': 'Blog',
        'contact': 'Liên hệ',
        'login': 'Đăng nhập',
        'logout': 'Đăng xuất',
        'cart': 'Giỏ hàng',
        'checkout': 'Thanh toán',
        'myServices': 'Dịch vụ của tôi',
        'myOrders': 'Đơn hàng',
        'myTickets': 'Ticket hỗ trợ',
        'profile': 'Thông tin cá nhân',
        'affiliate': 'Affiliate',
        'portal': 'Portal',
        'support': 'Hỗ trợ',
        'welcomeTitle': 'Giải pháp Hosting & VPS chuyên nghiệp',
        'welcomeSubtitle': 'Hiệu suất cao, bảo mật tối ưu, hỗ trợ 24/7',
        'getStarted': 'Bắt đầu ngay',
        'learnMore': 'Tìm hiểu thêm',
        'features': 'Tính năng',
        'testimonials': 'Đánh giá',
        'faq': 'Câu hỏi thường gặp',
        'selectPlan': 'Chọn gói',
        'addToCart': 'Thêm vào giỏ',
        'buyNow': 'Mua ngay',
        'month': 'tháng',
        'year': 'năm',
        'ordersManagement': 'Quản lý đơn hàng',
        'leadManagement': 'Quản lý Lead',
        'serverManagement': 'Quản lý Server',
        'userManagement': 'Quản lý người dùng',
        'settings': 'Cài đặt',
        'dashboard': 'Dashboard',
        'expirationAlerts': 'Cảnh báo hết hạn',
        'tickets': 'Tickets',
        'vouchers': 'Vouchers',
        'save': 'Lưu',
        'cancel': 'Hủy',
        'edit': 'Sửa',
        'delete': 'Xóa',
        'view': 'Xem',
        'search': 'Tìm kiếm',
        'filter': 'Lọc',
        'status': 'Trạng thái',
        'active': 'Hoạt động',
        'inactive': 'Không hoạt động',
        'pending': 'Chờ xử lý',
        'confirmed': 'Đã xác nhận',
        'cancelled': 'Đã hủy',
        'total': 'Tổng cộng',
        'subtotal': 'Tạm tính',
        'discount': 'Giảm giá',
        'name': 'Tên',
        'email': 'Email',
        'phone': 'Số điện thoại',
        'address': 'Địa chỉ',
        'company': 'Công ty',
        'password': 'Mật khẩu',
        'confirmPassword': 'Xác nhận mật khẩu',
        'changePassword': 'Đổi mật khẩu',
        'updateProfile': 'Cập nhật thông tin'
    },
    en: {
        'home': 'Home',
        'products': 'Products',
        'pricing': 'Pricing',
        'blog': 'Blog',
        'contact': 'Contact',
        'login': 'Login',
        'logout': 'Logout',
        'cart': 'Cart',
        'checkout': 'Checkout',
        'myServices': 'My Services',
        'myOrders': 'My Orders',
        'myTickets': 'My Tickets',
        'profile': 'Profile',
        'affiliate': 'Affiliate',
        'portal': 'Portal',
        'support': 'Support',
        'welcomeTitle': 'Professional Hosting & VPS Solutions',
        'welcomeSubtitle': 'High performance, optimized security, 24/7 support',
        'getStarted': 'Get Started',
        'learnMore': 'Learn More',
        'features': 'Features',
        'testimonials': 'Testimonials',
        'faq': 'FAQ',
        'selectPlan': 'Select Plan',
        'addToCart': 'Add to Cart',
        'buyNow': 'Buy Now',
        'month': 'month',
        'year': 'year',
        'ordersManagement': 'Orders Management',
        'leadManagement': 'Lead Management',
        'serverManagement': 'Server Management',
        'userManagement': 'User Management',
        'settings': 'Settings',
        'dashboard': 'Dashboard',
        'expirationAlerts': 'Expiration Alerts',
        'tickets': 'Tickets',
        'vouchers': 'Vouchers',
        'save': 'Save',
        'cancel': 'Cancel',
        'edit': 'Edit',
        'delete': 'Delete',
        'view': 'View',
        'search': 'Search',
        'filter': 'Filter',
        'status': 'Status',
        'active': 'Active',
        'inactive': 'Inactive',
        'pending': 'Pending',
        'confirmed': 'Confirmed',
        'cancelled': 'Cancelled',
        'total': 'Total',
        'subtotal': 'Subtotal',
        'discount': 'Discount',
        'name': 'Name',
        'email': 'Email',
        'phone': 'Phone',
        'address': 'Address',
        'company': 'Company',
        'password': 'Password',
        'confirmPassword': 'Confirm Password',
        'changePassword': 'Change Password',
        'updateProfile': 'Update Profile'
    }
};
function LocaleProvider({ children }) {
    _s();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('vi');
    const [currency, setCurrency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('VND');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LocaleProvider.useEffect": ()=>{
            const browserLang = navigator.language.toLowerCase();
            const detectedLang = browserLang.startsWith('vi') ? 'vi' : 'en';
            setLanguage(detectedLang);
            const savedLang = localStorage.getItem('language');
            const savedCurr = localStorage.getItem('currency');
            if (savedLang) setLanguage(savedLang);
            if (savedCurr) setCurrency(savedCurr);
        }
    }["LocaleProvider.useEffect"], []);
    const handleSetLanguage = (lang)=>{
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };
    const handleSetCurrency = (curr)=>{
        setCurrency(curr);
        localStorage.setItem('currency', curr);
    };
    const t = (key)=>{
        return translations[language][key] || key;
    };
    const convertPrice = (priceVND)=>{
        if (currency === 'USD') {
            return Math.round(priceVND / USD_TO_VND_RATE * 100) / 100;
        }
        return priceVND;
    };
    const formatPrice = (price)=>{
        const convertedPrice = convertPrice(price);
        if (currency === 'USD') {
            return `$${convertedPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        }
        return `${convertedPrice.toLocaleString('vi-VN')}đ`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LocaleContext.Provider, {
        value: {
            language,
            currency,
            setLanguage: handleSetLanguage,
            setCurrency: handleSetCurrency,
            t,
            formatPrice,
            convertPrice
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/LocaleContext.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
_s(LocaleProvider, "s6PW1M0u16OJa9OktPz/bey3RMw=");
_c = LocaleProvider;
function useLocale() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within LocaleProvider');
    }
    return context;
}
_s1(useLocale, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LocaleProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/CartContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const CART_STORAGE_KEY = 'vmst_cart';
function CartProvider({ children }) {
    _s();
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Hydrate from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            try {
                const saved = localStorage.getItem(CART_STORAGE_KEY);
                if (saved) setCart(JSON.parse(saved));
            } catch  {}
        }
    }["CartProvider.useEffect"], []);
    // Persist to localStorage on change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            } catch  {}
        }
    }["CartProvider.useEffect"], [
        cart
    ]);
    const addToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[addToCart]": (plan, duration)=>{
            const durationMap = {
                monthly: 'monthly',
                quarterly: 'quarterly',
                yearly: 'yearly'
            };
            const durationKey = durationMap[duration] || duration;
            const price = plan.price[durationKey];
            setCart({
                "CartProvider.useCallback[addToCart]": (prev)=>[
                        ...prev,
                        {
                            plan,
                            duration,
                            price
                        }
                    ]
            }["CartProvider.useCallback[addToCart]"]);
        }
    }["CartProvider.useCallback[addToCart]"], []);
    const removeFromCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[removeFromCart]": (index)=>{
            setCart({
                "CartProvider.useCallback[removeFromCart]": (prev)=>prev.filter({
                        "CartProvider.useCallback[removeFromCart]": (_, i)=>i !== index
                    }["CartProvider.useCallback[removeFromCart]"])
            }["CartProvider.useCallback[removeFromCart]"]);
        }
    }["CartProvider.useCallback[removeFromCart]"], []);
    const clearCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[clearCart]": ()=>{
            setCart([]);
        }
    }["CartProvider.useCallback[clearCart]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            cart,
            addToCart,
            removeFromCart,
            clearCart
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/CartContext.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(CartProvider, "tH4SMHqbwlZmGuSFcg0vYXGviDs=");
_c = CartProvider;
function useCart() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/LocaleContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/CartContext.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LocaleProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartProvider"], {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/providers.tsx",
                    lineNumber: 12,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/providers.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/providers.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/providers.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createLucideIcon,
    "toKebabCase",
    ()=>toKebabCase
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)");
;
;
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim();
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, ...rest }, ref)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("svg", {
            ref,
            ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            width: size,
            height: size,
            stroke: color,
            strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
            className: [
                "lucide",
                `lucide-${toKebabCase(iconName)}`,
                className
            ].join(" "),
            ...rest
        }, [
            ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
            ...Array.isArray(children) ? children : [
                children
            ]
        ]);
    });
    Component.displayName = `${iconName}`;
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckCircle
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const CheckCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("CheckCircle", [
    [
        "path",
        {
            d: "M22 11.08V12a10 10 0 1 1-5.93-9.14",
            key: "g774vq"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
]);
;
 //# sourceMappingURL=check-circle.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-client] (ecmascript) <export default as CheckCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x-circle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>XCircle
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const XCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("XCircle", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m15 9-6 6",
            key: "1uzhvr"
        }
    ],
    [
        "path",
        {
            d: "m9 9 6 6",
            key: "z0biqf"
        }
    ]
]);
;
 //# sourceMappingURL=x-circle.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x-circle.js [app-client] (ecmascript) <export default as XCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x-circle.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AlertCircle
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const AlertCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("AlertCircle", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "8",
            y2: "12",
            key: "1pkeuh"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12.01",
            y1: "16",
            y2: "16",
            key: "4dfq90"
        }
    ]
]);
;
 //# sourceMappingURL=alert-circle.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-client] (ecmascript) <export default as AlertCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Info
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Info", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 16v-4",
            key: "1dtifu"
        }
    ],
    [
        "path",
        {
            d: "M12 8h.01",
            key: "e9boi3"
        }
    ]
]);
;
 //# sourceMappingURL=info.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Info",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>X
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("X", [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
]);
;
 //# sourceMappingURL=x.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
}),
"[project]/node_modules/pocketbase/dist/pocketbase.es.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsyncAuthStore",
    ()=>AsyncAuthStore,
    "BaseAuthStore",
    ()=>BaseAuthStore,
    "BatchService",
    ()=>BatchService,
    "ClientResponseError",
    ()=>ClientResponseError,
    "CollectionService",
    ()=>CollectionService,
    "CrudService",
    ()=>CrudService,
    "HealthService",
    ()=>HealthService,
    "LocalAuthStore",
    ()=>LocalAuthStore,
    "LogService",
    ()=>LogService,
    "RealtimeService",
    ()=>RealtimeService,
    "RecordService",
    ()=>RecordService,
    "SubBatchService",
    ()=>SubBatchService,
    "cookieParse",
    ()=>cookieParse,
    "cookieSerialize",
    ()=>cookieSerialize,
    "default",
    ()=>Client,
    "getTokenPayload",
    ()=>getTokenPayload,
    "isTokenExpired",
    ()=>isTokenExpired,
    "normalizeUnknownQueryParams",
    ()=>normalizeUnknownQueryParams,
    "serializeQueryParams",
    ()=>serializeQueryParams
]);
class ClientResponseError extends Error {
    constructor(e){
        super("ClientResponseError"), this.url = "", this.status = 0, this.response = {}, this.isAbort = !1, this.originalError = null, Object.setPrototypeOf(this, ClientResponseError.prototype), null !== e && "object" == typeof e && (this.url = "string" == typeof e.url ? e.url : "", this.status = "number" == typeof e.status ? e.status : 0, this.isAbort = !!e.isAbort, this.originalError = e.originalError, null !== e.response && "object" == typeof e.response ? this.response = e.response : null !== e.data && "object" == typeof e.data ? this.response = e.data : this.response = {}), this.originalError || e instanceof ClientResponseError || (this.originalError = e), "undefined" != typeof DOMException && e instanceof DOMException && (this.isAbort = !0), this.name = "ClientResponseError " + this.status, this.message = this.response?.message, this.message || (this.isAbort ? this.message = "The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation." : this.originalError?.cause?.message?.includes("ECONNREFUSED ::1") ? this.message = "Failed to connect to the PocketBase server. Try changing the SDK URL from localhost to 127.0.0.1 (https://github.com/pocketbase/js-sdk/issues/21)." : this.message = "Something went wrong."), this.cause = this.originalError;
    }
    get data() {
        return this.response;
    }
    toJSON() {
        return {
            ...this
        };
    }
}
const e = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function cookieParse(e, t) {
    const s = {};
    if ("string" != typeof e) return s;
    const i = Object.assign({}, t || {}).decode || defaultDecode;
    let n = 0;
    for(; n < e.length;){
        const t = e.indexOf("=", n);
        if (-1 === t) break;
        let r = e.indexOf(";", n);
        if (-1 === r) r = e.length;
        else if (r < t) {
            n = e.lastIndexOf(";", t - 1) + 1;
            continue;
        }
        const o = e.slice(n, t).trim();
        if (void 0 === s[o]) {
            let n = e.slice(t + 1, r).trim();
            34 === n.charCodeAt(0) && (n = n.slice(1, -1));
            try {
                s[o] = i(n);
            } catch (e) {
                s[o] = n;
            }
        }
        n = r + 1;
    }
    return s;
}
function cookieSerialize(t, s, i) {
    const n = Object.assign({}, i || {}), r = n.encode || defaultEncode;
    if (!e.test(t)) throw new TypeError("argument name is invalid");
    const o = r(s);
    if (o && !e.test(o)) throw new TypeError("argument val is invalid");
    let a = t + "=" + o;
    if (null != n.maxAge) {
        const e = n.maxAge - 0;
        if (isNaN(e) || !isFinite(e)) throw new TypeError("option maxAge is invalid");
        a += "; Max-Age=" + Math.floor(e);
    }
    if (n.domain) {
        if (!e.test(n.domain)) throw new TypeError("option domain is invalid");
        a += "; Domain=" + n.domain;
    }
    if (n.path) {
        if (!e.test(n.path)) throw new TypeError("option path is invalid");
        a += "; Path=" + n.path;
    }
    if (n.expires) {
        if (!function isDate(e) {
            return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date;
        }(n.expires) || isNaN(n.expires.valueOf())) throw new TypeError("option expires is invalid");
        a += "; Expires=" + n.expires.toUTCString();
    }
    if (n.httpOnly && (a += "; HttpOnly"), n.secure && (a += "; Secure"), n.priority) {
        switch("string" == typeof n.priority ? n.priority.toLowerCase() : n.priority){
            case "low":
                a += "; Priority=Low";
                break;
            case "medium":
                a += "; Priority=Medium";
                break;
            case "high":
                a += "; Priority=High";
                break;
            default:
                throw new TypeError("option priority is invalid");
        }
    }
    if (n.sameSite) {
        switch("string" == typeof n.sameSite ? n.sameSite.toLowerCase() : n.sameSite){
            case !0:
                a += "; SameSite=Strict";
                break;
            case "lax":
                a += "; SameSite=Lax";
                break;
            case "strict":
                a += "; SameSite=Strict";
                break;
            case "none":
                a += "; SameSite=None";
                break;
            default:
                throw new TypeError("option sameSite is invalid");
        }
    }
    return a;
}
function defaultDecode(e) {
    return -1 !== e.indexOf("%") ? decodeURIComponent(e) : e;
}
function defaultEncode(e) {
    return encodeURIComponent(e);
}
const t = "undefined" != typeof navigator && "ReactNative" === navigator.product || "undefined" != ("TURBOPACK compile-time value", "object") && /*TURBOPACK member replacement*/ __turbopack_context__.g.HermesInternal;
let s;
function getTokenPayload(e) {
    if (e) try {
        const t = decodeURIComponent(s(e.split(".")[1]).split("").map(function(e) {
            return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
        return JSON.parse(t) || {};
    } catch (e) {}
    return {};
}
function isTokenExpired(e, t = 0) {
    let s = getTokenPayload(e);
    return !(Object.keys(s).length > 0 && (!s.exp || s.exp - t > Date.now() / 1e3));
}
s = "function" != typeof atob || t ? (e)=>{
    let t = String(e).replace(/=+$/, "");
    if (t.length % 4 == 1) throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    for(var s, i, n = 0, r = 0, o = ""; i = t.charAt(r++); ~i && (s = n % 4 ? 64 * s + i : i, n++ % 4) ? o += String.fromCharCode(255 & s >> (-2 * n & 6)) : 0)i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i);
    return o;
} : atob;
const i = "pb_auth";
class BaseAuthStore {
    constructor(){
        this.baseToken = "", this.baseModel = null, this._onChangeCallbacks = [];
    }
    get token() {
        return this.baseToken;
    }
    get record() {
        return this.baseModel;
    }
    get model() {
        return this.baseModel;
    }
    get isValid() {
        return !isTokenExpired(this.token);
    }
    get isSuperuser() {
        let e = getTokenPayload(this.token);
        return "auth" == e.type && ("_superusers" == this.record?.collectionName || !this.record?.collectionName && "pbc_3142635823" == e.collectionId);
    }
    get isAdmin() {
        return console.warn("Please replace pb.authStore.isAdmin with pb.authStore.isSuperuser OR simply check the value of pb.authStore.record?.collectionName"), this.isSuperuser;
    }
    get isAuthRecord() {
        return console.warn("Please replace pb.authStore.isAuthRecord with !pb.authStore.isSuperuser OR simply check the value of pb.authStore.record?.collectionName"), "auth" == getTokenPayload(this.token).type && !this.isSuperuser;
    }
    save(e, t) {
        this.baseToken = e || "", this.baseModel = t || null, this.triggerChange();
    }
    clear() {
        this.baseToken = "", this.baseModel = null, this.triggerChange();
    }
    loadFromCookie(e, t = i) {
        const s = cookieParse(e || "")[t] || "";
        let n = {};
        try {
            n = JSON.parse(s), (null === typeof n || "object" != typeof n || Array.isArray(n)) && (n = {});
        } catch (e) {}
        this.save(n.token || "", n.record || n.model || null);
    }
    exportToCookie(e, t = i) {
        const s = {
            secure: !0,
            sameSite: !0,
            httpOnly: !0,
            path: "/"
        }, n = getTokenPayload(this.token);
        s.expires = n?.exp ? new Date(1e3 * n.exp) : new Date("1970-01-01"), e = Object.assign({}, s, e);
        const r = {
            token: this.token,
            record: this.record ? JSON.parse(JSON.stringify(this.record)) : null
        };
        let o = cookieSerialize(t, JSON.stringify(r), e);
        const a = "undefined" != typeof Blob ? new Blob([
            o
        ]).size : o.length;
        if (r.record && a > 4096) {
            r.record = {
                id: r.record?.id,
                email: r.record?.email
            };
            const s = [
                "collectionId",
                "collectionName",
                "verified"
            ];
            for(const e in this.record)s.includes(e) && (r.record[e] = this.record[e]);
            o = cookieSerialize(t, JSON.stringify(r), e);
        }
        return o;
    }
    onChange(e, t = !1) {
        return this._onChangeCallbacks.push(e), t && e(this.token, this.record), ()=>{
            for(let t = this._onChangeCallbacks.length - 1; t >= 0; t--)if (this._onChangeCallbacks[t] == e) return delete this._onChangeCallbacks[t], void this._onChangeCallbacks.splice(t, 1);
        };
    }
    triggerChange() {
        for (const e of this._onChangeCallbacks)e && e(this.token, this.record);
    }
}
class LocalAuthStore extends BaseAuthStore {
    constructor(e = "pocketbase_auth"){
        super(), this.storageFallback = {}, this.storageKey = e, this._bindStorageEvent();
    }
    get token() {
        return (this._storageGet(this.storageKey) || {}).token || "";
    }
    get record() {
        const e = this._storageGet(this.storageKey) || {};
        return e.record || e.model || null;
    }
    get model() {
        return this.record;
    }
    save(e, t) {
        this._storageSet(this.storageKey, {
            token: e,
            record: t
        }), super.save(e, t);
    }
    clear() {
        this._storageRemove(this.storageKey), super.clear();
    }
    _storageGet(e) {
        if ("undefined" != typeof window && window?.localStorage) {
            const t = window.localStorage.getItem(e) || "";
            try {
                return JSON.parse(t);
            } catch (e) {
                return t;
            }
        }
        return this.storageFallback[e];
    }
    _storageSet(e, t) {
        if ("undefined" != typeof window && window?.localStorage) {
            let s = t;
            "string" != typeof t && (s = JSON.stringify(t)), window.localStorage.setItem(e, s);
        } else this.storageFallback[e] = t;
    }
    _storageRemove(e) {
        "undefined" != typeof window && window?.localStorage && window.localStorage?.removeItem(e), delete this.storageFallback[e];
    }
    _bindStorageEvent() {
        "undefined" != typeof window && window?.localStorage && window.addEventListener && window.addEventListener("storage", (e)=>{
            if (e.key != this.storageKey) return;
            const t = this._storageGet(this.storageKey) || {};
            super.save(t.token || "", t.record || t.model || null);
        });
    }
}
class BaseService {
    constructor(e){
        this.client = e;
    }
}
class SettingsService extends BaseService {
    async getAll(e) {
        return e = Object.assign({
            method: "GET"
        }, e), this.client.send("/api/settings", e);
    }
    async update(e, t) {
        return t = Object.assign({
            method: "PATCH",
            body: e
        }, t), this.client.send("/api/settings", t);
    }
    async testS3(e = "storage", t) {
        return t = Object.assign({
            method: "POST",
            body: {
                filesystem: e
            }
        }, t), this.client.send("/api/settings/test/s3", t).then(()=>!0);
    }
    async testEmail(e, t, s, i) {
        return i = Object.assign({
            method: "POST",
            body: {
                email: t,
                template: s,
                collection: e
            }
        }, i), this.client.send("/api/settings/test/email", i).then(()=>!0);
    }
    async generateAppleClientSecret(e, t, s, i, n, r) {
        return r = Object.assign({
            method: "POST",
            body: {
                clientId: e,
                teamId: t,
                keyId: s,
                privateKey: i,
                duration: n
            }
        }, r), this.client.send("/api/settings/apple/generate-client-secret", r);
    }
}
const n = [
    "requestKey",
    "$cancelKey",
    "$autoCancel",
    "fetch",
    "headers",
    "body",
    "query",
    "params",
    "cache",
    "credentials",
    "headers",
    "integrity",
    "keepalive",
    "method",
    "mode",
    "redirect",
    "referrer",
    "referrerPolicy",
    "signal",
    "window"
];
function normalizeUnknownQueryParams(e) {
    if (e) {
        e.query = e.query || {};
        for(let t in e)n.includes(t) || (e.query[t] = e[t], delete e[t]);
    }
}
function serializeQueryParams(e) {
    const t = [];
    for(const s in e){
        const i = encodeURIComponent(s), n = Array.isArray(e[s]) ? e[s] : [
            e[s]
        ];
        for (let e of n)e = prepareQueryParamValue(e), null !== e && t.push(i + "=" + e);
    }
    return t.join("&");
}
function prepareQueryParamValue(e) {
    return null == e ? null : e instanceof Date ? encodeURIComponent(e.toISOString().replace("T", " ")) : "object" == typeof e ? encodeURIComponent(JSON.stringify(e)) : encodeURIComponent(e);
}
class RealtimeService extends BaseService {
    constructor(){
        super(...arguments), this.clientId = "", this.eventSource = null, this.subscriptions = {}, this.lastSentSubscriptions = [], this.maxConnectTimeout = 15e3, this.reconnectAttempts = 0, this.maxReconnectAttempts = 1 / 0, this.predefinedReconnectIntervals = [
            200,
            300,
            500,
            1e3,
            1200,
            1500,
            2e3
        ], this.pendingConnects = [];
    }
    get isConnected() {
        return !!this.eventSource && !!this.clientId && !this.pendingConnects.length;
    }
    async subscribe(e, t, s) {
        if (!e) throw new Error("topic must be set.");
        let i = e;
        if (s) {
            normalizeUnknownQueryParams(s = Object.assign({}, s));
            const e = "options=" + encodeURIComponent(JSON.stringify({
                query: s.query,
                headers: s.headers
            }));
            i += (i.includes("?") ? "&" : "?") + e;
        }
        const listener = function(e) {
            const s = e;
            let i;
            try {
                i = JSON.parse(s?.data);
            } catch  {}
            t(i || {});
        };
        return this.subscriptions[i] || (this.subscriptions[i] = []), this.subscriptions[i].push(listener), this.isConnected ? 1 === this.subscriptions[i].length ? await this.submitSubscriptions() : this.eventSource?.addEventListener(i, listener) : await this.connect(), async ()=>this.unsubscribeByTopicAndListener(e, listener);
    }
    async unsubscribe(e) {
        let t = !1;
        if (e) {
            const s = this.getSubscriptionsByTopic(e);
            for(let e in s)if (this.hasSubscriptionListeners(e)) {
                for (let t of this.subscriptions[e])this.eventSource?.removeEventListener(e, t);
                delete this.subscriptions[e], t || (t = !0);
            }
        } else this.subscriptions = {};
        this.hasSubscriptionListeners() ? t && await this.submitSubscriptions() : this.disconnect();
    }
    async unsubscribeByPrefix(e) {
        let t = !1;
        for(let s in this.subscriptions)if ((s + "?").startsWith(e)) {
            t = !0;
            for (let e of this.subscriptions[s])this.eventSource?.removeEventListener(s, e);
            delete this.subscriptions[s];
        }
        t && (this.hasSubscriptionListeners() ? await this.submitSubscriptions() : this.disconnect());
    }
    async unsubscribeByTopicAndListener(e, t) {
        let s = !1;
        const i = this.getSubscriptionsByTopic(e);
        for(let e in i){
            if (!Array.isArray(this.subscriptions[e]) || !this.subscriptions[e].length) continue;
            let i = !1;
            for(let s = this.subscriptions[e].length - 1; s >= 0; s--)this.subscriptions[e][s] === t && (i = !0, delete this.subscriptions[e][s], this.subscriptions[e].splice(s, 1), this.eventSource?.removeEventListener(e, t));
            i && (this.subscriptions[e].length || delete this.subscriptions[e], s || this.hasSubscriptionListeners(e) || (s = !0));
        }
        this.hasSubscriptionListeners() ? s && await this.submitSubscriptions() : this.disconnect();
    }
    hasSubscriptionListeners(e) {
        if (this.subscriptions = this.subscriptions || {}, e) return !!this.subscriptions[e]?.length;
        for(let e in this.subscriptions)if (this.subscriptions[e]?.length) return !0;
        return !1;
    }
    async submitSubscriptions() {
        if (this.clientId) return this.addAllSubscriptionListeners(), this.lastSentSubscriptions = this.getNonEmptySubscriptionKeys(), this.client.send("/api/realtime", {
            method: "POST",
            body: {
                clientId: this.clientId,
                subscriptions: this.lastSentSubscriptions
            },
            requestKey: this.getSubscriptionsCancelKey()
        }).catch((e)=>{
            if (!e?.isAbort) throw e;
        });
    }
    getSubscriptionsCancelKey() {
        return "realtime_" + this.clientId;
    }
    getSubscriptionsByTopic(e) {
        const t = {};
        e = e.includes("?") ? e : e + "?";
        for(let s in this.subscriptions)(s + "?").startsWith(e) && (t[s] = this.subscriptions[s]);
        return t;
    }
    getNonEmptySubscriptionKeys() {
        const e = [];
        for(let t in this.subscriptions)this.subscriptions[t].length && e.push(t);
        return e;
    }
    addAllSubscriptionListeners() {
        if (this.eventSource) {
            this.removeAllSubscriptionListeners();
            for(let e in this.subscriptions)for (let t of this.subscriptions[e])this.eventSource.addEventListener(e, t);
        }
    }
    removeAllSubscriptionListeners() {
        if (this.eventSource) for(let e in this.subscriptions)for (let t of this.subscriptions[e])this.eventSource.removeEventListener(e, t);
    }
    async connect() {
        if (!(this.reconnectAttempts > 0)) return new Promise((e, t)=>{
            this.pendingConnects.push({
                resolve: e,
                reject: t
            }), this.pendingConnects.length > 1 || this.initConnect();
        });
    }
    initConnect() {
        this.disconnect(!0), clearTimeout(this.connectTimeoutId), this.connectTimeoutId = setTimeout(()=>{
            this.connectErrorHandler(new Error("EventSource connect took too long."));
        }, this.maxConnectTimeout), this.eventSource = new EventSource(this.client.buildURL("/api/realtime")), this.eventSource.onerror = (e)=>{
            this.connectErrorHandler(new Error("Failed to establish realtime connection."));
        }, this.eventSource.addEventListener("PB_CONNECT", (e)=>{
            const t = e;
            this.clientId = t?.lastEventId, this.submitSubscriptions().then(async ()=>{
                let e = 3;
                for(; this.hasUnsentSubscriptions() && e > 0;)e--, await this.submitSubscriptions();
            }).then(()=>{
                for (let e of this.pendingConnects)e.resolve();
                this.pendingConnects = [], this.reconnectAttempts = 0, clearTimeout(this.reconnectTimeoutId), clearTimeout(this.connectTimeoutId);
                const t = this.getSubscriptionsByTopic("PB_CONNECT");
                for(let s in t)for (let i of t[s])i(e);
            }).catch((e)=>{
                this.clientId = "", this.connectErrorHandler(e);
            });
        });
    }
    hasUnsentSubscriptions() {
        const e = this.getNonEmptySubscriptionKeys();
        if (e.length != this.lastSentSubscriptions.length) return !0;
        for (const t of e)if (!this.lastSentSubscriptions.includes(t)) return !0;
        return !1;
    }
    connectErrorHandler(e) {
        if (clearTimeout(this.connectTimeoutId), clearTimeout(this.reconnectTimeoutId), !this.clientId && !this.reconnectAttempts || this.reconnectAttempts > this.maxReconnectAttempts) {
            for (let t of this.pendingConnects)t.reject(new ClientResponseError(e));
            return this.pendingConnects = [], void this.disconnect();
        }
        this.disconnect(!0);
        const t = this.predefinedReconnectIntervals[this.reconnectAttempts] || this.predefinedReconnectIntervals[this.predefinedReconnectIntervals.length - 1];
        this.reconnectAttempts++, this.reconnectTimeoutId = setTimeout(()=>{
            this.initConnect();
        }, t);
    }
    disconnect(e = !1) {
        if (this.clientId && this.onDisconnect && this.onDisconnect(Object.keys(this.subscriptions)), clearTimeout(this.connectTimeoutId), clearTimeout(this.reconnectTimeoutId), this.removeAllSubscriptionListeners(), this.client.cancelRequest(this.getSubscriptionsCancelKey()), this.eventSource?.close(), this.eventSource = null, this.clientId = "", !e) {
            this.reconnectAttempts = 0;
            for (let e of this.pendingConnects)e.resolve();
            this.pendingConnects = [];
        }
    }
}
class CrudService extends BaseService {
    decode(e) {
        return e;
    }
    async getFullList(e, t) {
        if ("number" == typeof e) return this._getFullList(e, t);
        let s = 500;
        return (t = Object.assign({}, e, t)).batch && (s = t.batch, delete t.batch), this._getFullList(s, t);
    }
    async getList(e = 1, t = 30, s) {
        return (s = Object.assign({
            method: "GET"
        }, s)).query = Object.assign({
            page: e,
            perPage: t
        }, s.query), this.client.send(this.baseCrudPath, s).then((e)=>(e.items = e.items?.map((e)=>this.decode(e)) || [], e));
    }
    async getFirstListItem(e, t) {
        return (t = Object.assign({
            requestKey: "one_by_filter_" + this.baseCrudPath + "_" + e
        }, t)).query = Object.assign({
            filter: e,
            skipTotal: 1
        }, t.query), this.getList(1, 1, t).then((e)=>{
            if (!e?.items?.length) throw new ClientResponseError({
                status: 404,
                response: {
                    code: 404,
                    message: "The requested resource wasn't found.",
                    data: {}
                }
            });
            return e.items[0];
        });
    }
    async getOne(e, t) {
        if (!e) throw new ClientResponseError({
            url: this.client.buildURL(this.baseCrudPath + "/"),
            status: 404,
            response: {
                code: 404,
                message: "Missing required record id.",
                data: {}
            }
        });
        return t = Object.assign({
            method: "GET"
        }, t), this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e), t).then((e)=>this.decode(e));
    }
    async create(e, t) {
        return t = Object.assign({
            method: "POST",
            body: e
        }, t), this.client.send(this.baseCrudPath, t).then((e)=>this.decode(e));
    }
    async update(e, t, s) {
        return s = Object.assign({
            method: "PATCH",
            body: t
        }, s), this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e), s).then((e)=>this.decode(e));
    }
    async delete(e, t) {
        return t = Object.assign({
            method: "DELETE"
        }, t), this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e), t).then(()=>!0);
    }
    _getFullList(e = 500, t) {
        (t = t || {}).query = Object.assign({
            skipTotal: 1
        }, t.query);
        let s = [], request = async (i)=>this.getList(i, e || 500, t).then((e)=>{
                const t = e.items;
                return s = s.concat(t), t.length == e.perPage ? request(i + 1) : s;
            });
        return request(1);
    }
}
function normalizeLegacyOptionsArgs(e, t, s, i) {
    const n = void 0 !== i;
    return n || void 0 !== s ? n ? (console.warn(e), t.body = Object.assign({}, t.body, s), t.query = Object.assign({}, t.query, i), t) : Object.assign(t, s) : t;
}
function resetAutoRefresh(e) {
    e._resetAutoRefresh?.();
}
class RecordService extends CrudService {
    constructor(e, t){
        super(e), this.collectionIdOrName = t;
    }
    get baseCrudPath() {
        return this.baseCollectionPath + "/records";
    }
    get baseCollectionPath() {
        return "/api/collections/" + encodeURIComponent(this.collectionIdOrName);
    }
    get isSuperusers() {
        return "_superusers" == this.collectionIdOrName || "_pbc_2773867675" == this.collectionIdOrName;
    }
    async subscribe(e, t, s) {
        if (!e) throw new Error("Missing topic.");
        if (!t) throw new Error("Missing subscription callback.");
        return this.client.realtime.subscribe(this.collectionIdOrName + "/" + e, t, s);
    }
    async unsubscribe(e) {
        return e ? this.client.realtime.unsubscribe(this.collectionIdOrName + "/" + e) : this.client.realtime.unsubscribeByPrefix(this.collectionIdOrName);
    }
    async getFullList(e, t) {
        if ("number" == typeof e) return super.getFullList(e, t);
        const s = Object.assign({}, e, t);
        return super.getFullList(s);
    }
    async getList(e = 1, t = 30, s) {
        return super.getList(e, t, s);
    }
    async getFirstListItem(e, t) {
        return super.getFirstListItem(e, t);
    }
    async getOne(e, t) {
        return super.getOne(e, t);
    }
    async create(e, t) {
        return super.create(e, t);
    }
    async update(e, t, s) {
        return super.update(e, t, s).then((e)=>{
            if (this.client.authStore.record?.id === e?.id && (this.client.authStore.record?.collectionId === this.collectionIdOrName || this.client.authStore.record?.collectionName === this.collectionIdOrName)) {
                let t = Object.assign({}, this.client.authStore.record.expand), s = Object.assign({}, this.client.authStore.record, e);
                t && (s.expand = Object.assign(t, e.expand)), this.client.authStore.save(this.client.authStore.token, s);
            }
            return e;
        });
    }
    async delete(e, t) {
        return super.delete(e, t).then((t)=>(!t || this.client.authStore.record?.id !== e || this.client.authStore.record?.collectionId !== this.collectionIdOrName && this.client.authStore.record?.collectionName !== this.collectionIdOrName || this.client.authStore.clear(), t));
    }
    authResponse(e) {
        const t = this.decode(e?.record || {});
        return this.client.authStore.save(e?.token, t), Object.assign({}, e, {
            token: e?.token || "",
            record: t
        });
    }
    async listAuthMethods(e) {
        return e = Object.assign({
            method: "GET",
            fields: "mfa,otp,password,oauth2"
        }, e), this.client.send(this.baseCollectionPath + "/auth-methods", e);
    }
    async authWithPassword(e, t, s) {
        let i;
        s = Object.assign({
            method: "POST",
            body: {
                identity: e,
                password: t
            }
        }, s), this.isSuperusers && (i = s.autoRefreshThreshold, delete s.autoRefreshThreshold, s.autoRefresh || resetAutoRefresh(this.client));
        let n = await this.client.send(this.baseCollectionPath + "/auth-with-password", s);
        return n = this.authResponse(n), i && this.isSuperusers && function registerAutoRefresh(e, t, s, i) {
            resetAutoRefresh(e);
            const n = e.beforeSend, r = e.authStore.record, o = e.authStore.onChange((t, s)=>{
                (!t || s?.id != r?.id || (s?.collectionId || r?.collectionId) && s?.collectionId != r?.collectionId) && resetAutoRefresh(e);
            });
            e._resetAutoRefresh = function() {
                o(), e.beforeSend = n, delete e._resetAutoRefresh;
            }, e.beforeSend = async (r, o)=>{
                const a = e.authStore.token;
                if (o.query?.autoRefresh) return n ? n(r, o) : {
                    url: r,
                    sendOptions: o
                };
                let c = e.authStore.isValid;
                if (c && isTokenExpired(e.authStore.token, t)) try {
                    await s();
                } catch (e) {
                    c = !1;
                }
                c || await i();
                const l = o.headers || {};
                for(let t in l)if ("authorization" == t.toLowerCase() && a == l[t] && e.authStore.token) {
                    l[t] = e.authStore.token;
                    break;
                }
                return o.headers = l, n ? n(r, o) : {
                    url: r,
                    sendOptions: o
                };
            };
        }(this.client, i, ()=>this.authRefresh({
                autoRefresh: !0
            }), ()=>this.authWithPassword(e, t, Object.assign({
                autoRefresh: !0
            }, s))), n;
    }
    async authWithOAuth2Code(e, t, s, i, n, r, o) {
        let a = {
            method: "POST",
            body: {
                provider: e,
                code: t,
                codeVerifier: s,
                redirectURL: i,
                createData: n
            }
        };
        return a = normalizeLegacyOptionsArgs("This form of authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData?, body?, query?) is deprecated. Consider replacing it with authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData?, options?).", a, r, o), this.client.send(this.baseCollectionPath + "/auth-with-oauth2", a).then((e)=>this.authResponse(e));
    }
    authWithOAuth2(...e) {
        if (e.length > 1 || "string" == typeof e?.[0]) return console.warn("PocketBase: This form of authWithOAuth2() is deprecated and may get removed in the future. Please replace with authWithOAuth2Code() OR use the authWithOAuth2() realtime form as shown in https://pocketbase.io/docs/authentication/#oauth2-integration."), this.authWithOAuth2Code(e?.[0] || "", e?.[1] || "", e?.[2] || "", e?.[3] || "", e?.[4] || {}, e?.[5] || {}, e?.[6] || {});
        const t = e?.[0] || {};
        let s = null;
        t.urlCallback || (s = openBrowserPopup(void 0));
        const i = new RealtimeService(this.client);
        function cleanup() {
            s?.close(), i.unsubscribe();
        }
        const n = {}, r = t.requestKey;
        return r && (n.requestKey = r), this.listAuthMethods(n).then((e)=>{
            const n = e.oauth2.providers.find((e)=>e.name === t.provider);
            if (!n) throw new ClientResponseError(new Error(`Missing or invalid provider "${t.provider}".`));
            const o = this.client.buildURL("/api/oauth2-redirect"), a = r ? this.client.cancelControllers?.[r] : void 0;
            return a && (a.signal.onabort = ()=>{
                cleanup();
            }), new Promise(async (e, r)=>{
                try {
                    await i.subscribe("@oauth2", async (s)=>{
                        const c = i.clientId;
                        try {
                            if (!s.state || c !== s.state) throw new Error("State parameters don't match.");
                            if (s.error || !s.code) throw new Error("OAuth2 redirect error or missing code: " + s.error);
                            const i = Object.assign({}, t);
                            delete i.provider, delete i.scopes, delete i.createData, delete i.urlCallback, a?.signal?.onabort && (a.signal.onabort = null);
                            const r = await this.authWithOAuth2Code(n.name, s.code, n.codeVerifier, o, t.createData, i);
                            e(r);
                        } catch (e) {
                            r(new ClientResponseError(e));
                        }
                        cleanup();
                    });
                    const c = {
                        state: i.clientId
                    };
                    t.scopes?.length && (c.scope = t.scopes.join(" "));
                    const l = this._replaceQueryParams(n.authURL + o, c);
                    let h = t.urlCallback || function(e) {
                        s ? s.location.href = e : s = openBrowserPopup(e);
                    };
                    await h(l);
                } catch (e) {
                    cleanup(), r(new ClientResponseError(e));
                }
            });
        }).catch((e)=>{
            throw cleanup(), e;
        });
    }
    async authRefresh(e, t) {
        let s = {
            method: "POST"
        };
        return s = normalizeLegacyOptionsArgs("This form of authRefresh(body?, query?) is deprecated. Consider replacing it with authRefresh(options?).", s, e, t), this.client.send(this.baseCollectionPath + "/auth-refresh", s).then((e)=>this.authResponse(e));
    }
    async requestPasswordReset(e, t, s) {
        let i = {
            method: "POST",
            body: {
                email: e
            }
        };
        return i = normalizeLegacyOptionsArgs("This form of requestPasswordReset(email, body?, query?) is deprecated. Consider replacing it with requestPasswordReset(email, options?).", i, t, s), this.client.send(this.baseCollectionPath + "/request-password-reset", i).then(()=>!0);
    }
    async confirmPasswordReset(e, t, s, i, n) {
        let r = {
            method: "POST",
            body: {
                token: e,
                password: t,
                passwordConfirm: s
            }
        };
        return r = normalizeLegacyOptionsArgs("This form of confirmPasswordReset(token, password, passwordConfirm, body?, query?) is deprecated. Consider replacing it with confirmPasswordReset(token, password, passwordConfirm, options?).", r, i, n), this.client.send(this.baseCollectionPath + "/confirm-password-reset", r).then(()=>!0);
    }
    async requestVerification(e, t, s) {
        let i = {
            method: "POST",
            body: {
                email: e
            }
        };
        return i = normalizeLegacyOptionsArgs("This form of requestVerification(email, body?, query?) is deprecated. Consider replacing it with requestVerification(email, options?).", i, t, s), this.client.send(this.baseCollectionPath + "/request-verification", i).then(()=>!0);
    }
    async confirmVerification(e, t, s) {
        let i = {
            method: "POST",
            body: {
                token: e
            }
        };
        return i = normalizeLegacyOptionsArgs("This form of confirmVerification(token, body?, query?) is deprecated. Consider replacing it with confirmVerification(token, options?).", i, t, s), this.client.send(this.baseCollectionPath + "/confirm-verification", i).then(()=>{
            const t = getTokenPayload(e), s = this.client.authStore.record;
            return s && !s.verified && s.id === t.id && s.collectionId === t.collectionId && (s.verified = !0, this.client.authStore.save(this.client.authStore.token, s)), !0;
        });
    }
    async requestEmailChange(e, t, s) {
        let i = {
            method: "POST",
            body: {
                newEmail: e
            }
        };
        return i = normalizeLegacyOptionsArgs("This form of requestEmailChange(newEmail, body?, query?) is deprecated. Consider replacing it with requestEmailChange(newEmail, options?).", i, t, s), this.client.send(this.baseCollectionPath + "/request-email-change", i).then(()=>!0);
    }
    async confirmEmailChange(e, t, s, i) {
        let n = {
            method: "POST",
            body: {
                token: e,
                password: t
            }
        };
        return n = normalizeLegacyOptionsArgs("This form of confirmEmailChange(token, password, body?, query?) is deprecated. Consider replacing it with confirmEmailChange(token, password, options?).", n, s, i), this.client.send(this.baseCollectionPath + "/confirm-email-change", n).then(()=>{
            const t = getTokenPayload(e), s = this.client.authStore.record;
            return s && s.id === t.id && s.collectionId === t.collectionId && this.client.authStore.clear(), !0;
        });
    }
    async listExternalAuths(e, t) {
        return this.client.collection("_externalAuths").getFullList(Object.assign({}, t, {
            filter: this.client.filter("recordRef = {:id}", {
                id: e
            })
        }));
    }
    async unlinkExternalAuth(e, t, s) {
        const i = await this.client.collection("_externalAuths").getFirstListItem(this.client.filter("recordRef = {:recordId} && provider = {:provider}", {
            recordId: e,
            provider: t
        }));
        return this.client.collection("_externalAuths").delete(i.id, s).then(()=>!0);
    }
    async requestOTP(e, t) {
        return t = Object.assign({
            method: "POST",
            body: {
                email: e
            }
        }, t), this.client.send(this.baseCollectionPath + "/request-otp", t);
    }
    async authWithOTP(e, t, s) {
        return s = Object.assign({
            method: "POST",
            body: {
                otpId: e,
                password: t
            }
        }, s), this.client.send(this.baseCollectionPath + "/auth-with-otp", s).then((e)=>this.authResponse(e));
    }
    async impersonate(e, t, s) {
        (s = Object.assign({
            method: "POST",
            body: {
                duration: t
            }
        }, s)).headers = s.headers || {}, s.headers.Authorization || (s.headers.Authorization = this.client.authStore.token);
        const i = new Client(this.client.baseURL, new BaseAuthStore, this.client.lang), n = await i.send(this.baseCollectionPath + "/impersonate/" + encodeURIComponent(e), s);
        return i.authStore.save(n?.token, this.decode(n?.record || {})), i;
    }
    _replaceQueryParams(e, t = {}) {
        let s = e, i = "";
        e.indexOf("?") >= 0 && (s = e.substring(0, e.indexOf("?")), i = e.substring(e.indexOf("?") + 1));
        const n = {}, r = i.split("&");
        for (const e of r){
            if ("" == e) continue;
            const t = e.split("=");
            n[decodeURIComponent(t[0].replace(/\+/g, " "))] = decodeURIComponent((t[1] || "").replace(/\+/g, " "));
        }
        for(let e in t)t.hasOwnProperty(e) && (null == t[e] ? delete n[e] : n[e] = t[e]);
        i = "";
        for(let e in n)n.hasOwnProperty(e) && ("" != i && (i += "&"), i += encodeURIComponent(e.replace(/%20/g, "+")) + "=" + encodeURIComponent(n[e].replace(/%20/g, "+")));
        return "" != i ? s + "?" + i : s;
    }
}
function openBrowserPopup(e) {
    if ("undefined" == typeof window || !window?.open) throw new ClientResponseError(new Error("Not in a browser context - please pass a custom urlCallback function."));
    let t = 1024, s = 768, i = window.innerWidth, n = window.innerHeight;
    t = t > i ? i : t, s = s > n ? n : s;
    let r = i / 2 - t / 2, o = n / 2 - s / 2;
    return window.open(e, "popup_window", "width=" + t + ",height=" + s + ",top=" + o + ",left=" + r + ",resizable,menubar=no");
}
class CollectionService extends CrudService {
    get baseCrudPath() {
        return "/api/collections";
    }
    async import(e, t = !1, s) {
        return s = Object.assign({
            method: "PUT",
            body: {
                collections: e,
                deleteMissing: t
            }
        }, s), this.client.send(this.baseCrudPath + "/import", s).then(()=>!0);
    }
    async getScaffolds(e) {
        return e = Object.assign({
            method: "GET"
        }, e), this.client.send(this.baseCrudPath + "/meta/scaffolds", e);
    }
    async truncate(e, t) {
        return t = Object.assign({
            method: "DELETE"
        }, t), this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e) + "/truncate", t).then(()=>!0);
    }
}
class LogService extends BaseService {
    async getList(e = 1, t = 30, s) {
        return (s = Object.assign({
            method: "GET"
        }, s)).query = Object.assign({
            page: e,
            perPage: t
        }, s.query), this.client.send("/api/logs", s);
    }
    async getOne(e, t) {
        if (!e) throw new ClientResponseError({
            url: this.client.buildURL("/api/logs/"),
            status: 404,
            response: {
                code: 404,
                message: "Missing required log id.",
                data: {}
            }
        });
        return t = Object.assign({
            method: "GET"
        }, t), this.client.send("/api/logs/" + encodeURIComponent(e), t);
    }
    async getStats(e) {
        return e = Object.assign({
            method: "GET"
        }, e), this.client.send("/api/logs/stats", e);
    }
}
class HealthService extends BaseService {
    async check(e) {
        return e = Object.assign({
            method: "GET"
        }, e), this.client.send("/api/health", e);
    }
}
class FileService extends BaseService {
    getUrl(e, t, s = {}) {
        return console.warn("Please replace pb.files.getUrl() with pb.files.getURL()"), this.getURL(e, t, s);
    }
    getURL(e, t, s = {}) {
        if (!t || !e?.id || !e?.collectionId && !e?.collectionName) return "";
        const i = [];
        i.push("api"), i.push("files"), i.push(encodeURIComponent(e.collectionId || e.collectionName)), i.push(encodeURIComponent(e.id)), i.push(encodeURIComponent(t));
        let n = this.client.buildURL(i.join("/"));
        if (Object.keys(s).length) {
            !1 === s.download && delete s.download;
            const e = new URLSearchParams(s);
            n += (n.includes("?") ? "&" : "?") + e;
        }
        return n;
    }
    async getToken(e) {
        return e = Object.assign({
            method: "POST"
        }, e), this.client.send("/api/files/token", e).then((e)=>e?.token || "");
    }
}
class BackupService extends BaseService {
    async getFullList(e) {
        return e = Object.assign({
            method: "GET"
        }, e), this.client.send("/api/backups", e);
    }
    async create(e, t) {
        return t = Object.assign({
            method: "POST",
            body: {
                name: e
            }
        }, t), this.client.send("/api/backups", t).then(()=>!0);
    }
    async upload(e, t) {
        return t = Object.assign({
            method: "POST",
            body: e
        }, t), this.client.send("/api/backups/upload", t).then(()=>!0);
    }
    async delete(e, t) {
        return t = Object.assign({
            method: "DELETE"
        }, t), this.client.send(`/api/backups/${encodeURIComponent(e)}`, t).then(()=>!0);
    }
    async restore(e, t) {
        return t = Object.assign({
            method: "POST"
        }, t), this.client.send(`/api/backups/${encodeURIComponent(e)}/restore`, t).then(()=>!0);
    }
    getDownloadUrl(e, t) {
        return console.warn("Please replace pb.backups.getDownloadUrl() with pb.backups.getDownloadURL()"), this.getDownloadURL(e, t);
    }
    getDownloadURL(e, t) {
        return this.client.buildURL(`/api/backups/${encodeURIComponent(t)}?token=${encodeURIComponent(e)}`);
    }
}
class CronService extends BaseService {
    async getFullList(e) {
        return e = Object.assign({
            method: "GET"
        }, e), this.client.send("/api/crons", e);
    }
    async run(e, t) {
        return t = Object.assign({
            method: "POST"
        }, t), this.client.send(`/api/crons/${encodeURIComponent(e)}`, t).then(()=>!0);
    }
}
function isFile(e) {
    return "undefined" != typeof Blob && e instanceof Blob || "undefined" != typeof File && e instanceof File || null !== e && "object" == typeof e && e.uri && ("undefined" != typeof navigator && "ReactNative" === navigator.product || "undefined" != ("TURBOPACK compile-time value", "object") && /*TURBOPACK member replacement*/ __turbopack_context__.g.HermesInternal);
}
function isFormData(e) {
    return e && ("FormData" === e.constructor?.name || "undefined" != typeof FormData && e instanceof FormData);
}
function hasFileField(e) {
    for(const t in e){
        const s = Array.isArray(e[t]) ? e[t] : [
            e[t]
        ];
        for (const e of s)if (isFile(e)) return !0;
    }
    return !1;
}
const r = /^[\-\.\d]+$/;
function inferFormDataValue(e) {
    if ("string" != typeof e) return e;
    if ("true" == e) return !0;
    if ("false" == e) return !1;
    if (("-" === e[0] || e[0] >= "0" && e[0] <= "9") && r.test(e)) {
        let t = +e;
        if ("" + t === e) return t;
    }
    return e;
}
class BatchService extends BaseService {
    constructor(){
        super(...arguments), this.requests = [], this.subs = {};
    }
    collection(e) {
        return this.subs[e] || (this.subs[e] = new SubBatchService(this.requests, e)), this.subs[e];
    }
    async send(e) {
        const t = new FormData, s = [];
        for(let e = 0; e < this.requests.length; e++){
            const i = this.requests[e];
            if (s.push({
                method: i.method,
                url: i.url,
                headers: i.headers,
                body: i.json
            }), i.files) for(let s in i.files){
                const n = i.files[s] || [];
                for (let i of n)t.append("requests." + e + "." + s, i);
            }
        }
        return t.append("@jsonPayload", JSON.stringify({
            requests: s
        })), e = Object.assign({
            method: "POST",
            body: t
        }, e), this.client.send("/api/batch", e);
    }
}
class SubBatchService {
    constructor(e, t){
        this.requests = [], this.requests = e, this.collectionIdOrName = t;
    }
    upsert(e, t) {
        t = Object.assign({
            body: e || {}
        }, t);
        const s = {
            method: "PUT",
            url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records"
        };
        this.prepareRequest(s, t), this.requests.push(s);
    }
    create(e, t) {
        t = Object.assign({
            body: e || {}
        }, t);
        const s = {
            method: "POST",
            url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records"
        };
        this.prepareRequest(s, t), this.requests.push(s);
    }
    update(e, t, s) {
        s = Object.assign({
            body: t || {}
        }, s);
        const i = {
            method: "PATCH",
            url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records/" + encodeURIComponent(e)
        };
        this.prepareRequest(i, s), this.requests.push(i);
    }
    delete(e, t) {
        t = Object.assign({}, t);
        const s = {
            method: "DELETE",
            url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records/" + encodeURIComponent(e)
        };
        this.prepareRequest(s, t), this.requests.push(s);
    }
    prepareRequest(e, t) {
        if (normalizeUnknownQueryParams(t), e.headers = t.headers, e.json = {}, e.files = {}, void 0 !== t.query) {
            const s = serializeQueryParams(t.query);
            s && (e.url += (e.url.includes("?") ? "&" : "?") + s);
        }
        let s = t.body;
        isFormData(s) && (s = function convertFormDataToObject(e) {
            let t = {};
            return e.forEach((e, s)=>{
                if ("@jsonPayload" === s && "string" == typeof e) try {
                    let s = JSON.parse(e);
                    Object.assign(t, s);
                } catch (e) {
                    console.warn("@jsonPayload error:", e);
                }
                else void 0 !== t[s] ? (Array.isArray(t[s]) || (t[s] = [
                    t[s]
                ]), t[s].push(inferFormDataValue(e))) : t[s] = inferFormDataValue(e);
            }), t;
        }(s));
        for(const t in s){
            const i = s[t];
            if (isFile(i)) e.files[t] = e.files[t] || [], e.files[t].push(i);
            else if (Array.isArray(i)) {
                const s = [], n = [];
                for (const e of i)isFile(e) ? s.push(e) : n.push(e);
                if (s.length > 0 && s.length == i.length) {
                    e.files[t] = e.files[t] || [];
                    for (let i of s)e.files[t].push(i);
                } else if (e.json[t] = n, s.length > 0) {
                    let i = t;
                    t.startsWith("+") || t.endsWith("+") || (i += "+"), e.files[i] = e.files[i] || [];
                    for (let t of s)e.files[i].push(t);
                }
            } else e.json[t] = i;
        }
    }
}
class Client {
    get baseUrl() {
        return this.baseURL;
    }
    set baseUrl(e) {
        this.baseURL = e;
    }
    constructor(e = "/", t, s = "en-US"){
        this.cancelControllers = {}, this.recordServices = {}, this.enableAutoCancellation = !0, this.baseURL = e, this.lang = s, t ? this.authStore = t : "undefined" != typeof window && window.Deno ? this.authStore = new BaseAuthStore : this.authStore = new LocalAuthStore, this.collections = new CollectionService(this), this.files = new FileService(this), this.logs = new LogService(this), this.settings = new SettingsService(this), this.realtime = new RealtimeService(this), this.health = new HealthService(this), this.backups = new BackupService(this), this.crons = new CronService(this);
    }
    get admins() {
        return this.collection("_superusers");
    }
    createBatch() {
        return new BatchService(this);
    }
    collection(e) {
        return this.recordServices[e] || (this.recordServices[e] = new RecordService(this, e)), this.recordServices[e];
    }
    autoCancellation(e) {
        return this.enableAutoCancellation = !!e, this;
    }
    cancelRequest(e) {
        return this.cancelControllers[e] && (this.cancelControllers[e].abort(), delete this.cancelControllers[e]), this;
    }
    cancelAllRequests() {
        for(let e in this.cancelControllers)this.cancelControllers[e].abort();
        return this.cancelControllers = {}, this;
    }
    filter(e, t) {
        if (!t) return e;
        for(let s in t){
            let i = t[s];
            switch(typeof i){
                case "boolean":
                case "number":
                    i = "" + i;
                    break;
                case "string":
                    i = "'" + i.replace(/'/g, "\\'") + "'";
                    break;
                default:
                    i = null === i ? "null" : i instanceof Date ? "'" + i.toISOString().replace("T", " ") + "'" : "'" + JSON.stringify(i).replace(/'/g, "\\'") + "'";
            }
            e = e.replaceAll("{:" + s + "}", i);
        }
        return e;
    }
    getFileUrl(e, t, s = {}) {
        return console.warn("Please replace pb.getFileUrl() with pb.files.getURL()"), this.files.getURL(e, t, s);
    }
    buildUrl(e) {
        return console.warn("Please replace pb.buildUrl() with pb.buildURL()"), this.buildURL(e);
    }
    buildURL(e) {
        let t = this.baseURL;
        return "undefined" == typeof window || !window.location || t.startsWith("https://") || t.startsWith("http://") || (t = window.location.origin?.endsWith("/") ? window.location.origin.substring(0, window.location.origin.length - 1) : window.location.origin || "", this.baseURL.startsWith("/") || (t += window.location.pathname || "/", t += t.endsWith("/") ? "" : "/"), t += this.baseURL), e && (t += t.endsWith("/") ? "" : "/", t += e.startsWith("/") ? e.substring(1) : e), t;
    }
    async send(e, t) {
        t = this.initSendOptions(e, t);
        let s = this.buildURL(e);
        if (this.beforeSend) {
            const e = Object.assign({}, await this.beforeSend(s, t));
            void 0 !== e.url || void 0 !== e.options ? (s = e.url || s, t = e.options || t) : Object.keys(e).length && (t = e, console?.warn && console.warn("Deprecated format of beforeSend return: please use `return { url, options }`, instead of `return options`."));
        }
        if (void 0 !== t.query) {
            const e = serializeQueryParams(t.query);
            e && (s += (s.includes("?") ? "&" : "?") + e), delete t.query;
        }
        "application/json" == this.getHeader(t.headers, "Content-Type") && t.body && "string" != typeof t.body && (t.body = JSON.stringify(t.body));
        return (t.fetch || fetch)(s, t).then(async (e)=>{
            let s = {};
            try {
                s = await e.json();
            } catch (e) {}
            if (this.afterSend && (s = await this.afterSend(e, s, t)), e.status >= 400) throw new ClientResponseError({
                url: e.url,
                status: e.status,
                data: s
            });
            return s;
        }).catch((e)=>{
            throw new ClientResponseError(e);
        });
    }
    initSendOptions(e, t) {
        if ((t = Object.assign({
            method: "GET"
        }, t)).body = function convertToFormDataIfNeeded(e) {
            if ("undefined" == typeof FormData || void 0 === e || "object" != typeof e || null === e || isFormData(e) || !hasFileField(e)) return e;
            const t = new FormData;
            for(const s in e){
                const i = e[s];
                if (void 0 !== i) if ("object" != typeof i || hasFileField({
                    data: i
                })) {
                    const e = Array.isArray(i) ? i : [
                        i
                    ];
                    for (let i of e)t.append(s, i);
                } else {
                    let e = {};
                    e[s] = i, t.append("@jsonPayload", JSON.stringify(e));
                }
            }
            return t;
        }(t.body), normalizeUnknownQueryParams(t), t.query = Object.assign({}, t.params, t.query), void 0 === t.requestKey && (!1 === t.$autoCancel || !1 === t.query.$autoCancel ? t.requestKey = null : (t.$cancelKey || t.query.$cancelKey) && (t.requestKey = t.$cancelKey || t.query.$cancelKey)), delete t.$autoCancel, delete t.query.$autoCancel, delete t.$cancelKey, delete t.query.$cancelKey, null !== this.getHeader(t.headers, "Content-Type") || isFormData(t.body) || (t.headers = Object.assign({}, t.headers, {
            "Content-Type": "application/json"
        })), null === this.getHeader(t.headers, "Accept-Language") && (t.headers = Object.assign({}, t.headers, {
            "Accept-Language": this.lang
        })), this.authStore.token && null === this.getHeader(t.headers, "Authorization") && (t.headers = Object.assign({}, t.headers, {
            Authorization: this.authStore.token
        })), this.enableAutoCancellation && null !== t.requestKey) {
            const s = t.requestKey || (t.method || "GET") + e;
            delete t.requestKey, this.cancelRequest(s);
            const i = new AbortController;
            this.cancelControllers[s] = i, t.signal = i.signal;
        }
        return t;
    }
    getHeader(e, t) {
        e = e || {}, t = t.toLowerCase();
        for(let s in e)if (s.toLowerCase() == t) return e[s];
        return null;
    }
}
class AsyncAuthStore extends BaseAuthStore {
    constructor(e){
        super(), this.queue = [], this.saveFunc = e.save, this.clearFunc = e.clear, this._enqueue(()=>this._loadInitial(e.initial));
    }
    save(e, t) {
        super.save(e, t);
        let s = "";
        try {
            s = JSON.stringify({
                token: e,
                record: t
            });
        } catch (e) {
            console.warn("AsyncAuthStore: failed to stringify the new state");
        }
        this._enqueue(()=>this.saveFunc(s));
    }
    clear() {
        super.clear(), this.clearFunc ? this._enqueue(()=>this.clearFunc()) : this._enqueue(()=>this.saveFunc(""));
    }
    async _loadInitial(e) {
        try {
            if (e = await e) {
                let t;
                "string" == typeof e ? t = JSON.parse(e) || {} : "object" == typeof e && (t = e), this.save(t.token || "", t.record || t.model || null);
            }
        } catch (e) {}
    }
    _enqueue(e) {
        this.queue.push(e), 1 == this.queue.length && this._dequeue();
    }
    _dequeue() {
        this.queue.length && this.queue[0]().finally(()=>{
            this.queue.shift(), this.queue.length && this._dequeue();
        });
    }
}
;
 //# sourceMappingURL=pocketbase.es.mjs.map
}),
]);

//# sourceMappingURL=_0ca5a24b._.js.map