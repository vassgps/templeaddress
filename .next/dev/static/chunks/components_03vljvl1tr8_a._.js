(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ActiveLink.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ActiveLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Drop-in replacement for React Router's <NavLink>.
 * Accepts either a plain className string OR the function form `({isActive}) => string`
 * that NavLink uses — so converted pages need zero further edits.
 *
 *   <ActiveLink href="/temples" end className={({isActive}) => isActive ? 'active' : ''}>
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ActiveLink({ href, end = false, className, children, ...rest }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = end ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
    const resolved = typeof className === 'function' ? className({
        isActive
    }) : className;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: resolved,
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ActiveLink.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(ActiveLink, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ActiveLink;
var _c;
__turbopack_context__.k.register(_c, "ActiveLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/LanguageControl.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LanguageControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function LanguageControl() {
    _s();
    const [enabled, setEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const enable = ()=>{
        setEnabled(true);
        setError('');
        const init = ()=>{
            if (window.google?.translate) new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,ml,hi,ta,te,kn',
                autoDisplay: false
            }, 'ta-google-translate');
        };
        if (window.google?.translate) {
            setTimeout(init, 0);
            return;
        }
        window.taTranslateReady = init;
        if (!document.getElementById('ta-translate-script')) {
            const s = document.createElement('script');
            s.id = 'ta-translate-script';
            s.src = 'https://translate.google.com/translate_a/element.js?cb=taTranslateReady';
            s.onerror = ()=>{
                setError('Translation could not load. Use your browser\'s Translate option.');
                s.remove();
            };
            document.head.appendChild(s);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
        className: "relative text-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                className: "cursor-pointer rounded-lg bg-white/10 px-2 py-2",
                children: "🌐 Language"
            }, void 0, false, {
                fileName: "[project]/components/LanguageControl.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 z-50 mt-2 w-64 rounded-xl bg-white p-4 text-brown-900 shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: "English · മലയാളം · हिन्दी · தமிழ் · తెలుగు · ಕನ್ನಡ"
                    }, void 0, false, {
                        fileName: "[project]/components/LanguageControl.jsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-xs",
                        children: "Optional Google machine translation. Verify important details in English."
                    }, void 0, false, {
                        fileName: "[project]/components/LanguageControl.jsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "ta-google-translate"
                    }, void 0, false, {
                        fileName: "[project]/components/LanguageControl.jsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    (!enabled || error) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn-p",
                        onClick: enable,
                        children: "Enable translation"
                    }, void 0, false, {
                        fileName: "[project]/components/LanguageControl.jsx",
                        lineNumber: 26,
                        columnNumber: 33
                    }, this),
                    enabled && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs",
                        children: "Choose a language above once Google loads."
                    }, void 0, false, {
                        fileName: "[project]/components/LanguageControl.jsx",
                        lineNumber: 27,
                        columnNumber: 31
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        role: "alert",
                        className: "text-xs text-red-700",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/LanguageControl.jsx",
                        lineNumber: 28,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LanguageControl.jsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LanguageControl.jsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(LanguageControl, "m3BF2n8WmrI+5pwwSclfhEST7Jo=");
_c = LanguageControl;
var _c;
__turbopack_context__.k.register(_c, "LanguageControl");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ListingQr.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListingQrPreview",
    ()=>ListingQrPreview,
    "default",
    ()=>ListingQr,
    "useListingQr",
    ()=>useListingQr
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode.react/lib/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$listingQr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/listingQr.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const QR_UPDATED = 'ta:listing-qr-updated';
function useListingQr(temple) {
    _s();
    const code = temple?.code;
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        record: null,
        error: '',
        loading: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useListingQr.useEffect": ()=>{
            if (!code) {
                setState({
                    record: null,
                    error: '',
                    loading: false
                });
                return;
            }
            const refresh = {
                "useListingQr.useEffect.refresh": ()=>{
                    try {
                        setState({
                            record: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$listingQr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readListingQr"])(code),
                            error: '',
                            loading: false
                        });
                    } catch  {
                        setState({
                            record: null,
                            error: 'The saved QR could not be loaded. Restore browser storage and reload to avoid replacing it.',
                            loading: false
                        });
                    }
                }
            }["useListingQr.useEffect.refresh"];
            const onStorage = {
                "useListingQr.useEffect.onStorage": (event)=>{
                    if (event.key === null || event.key === (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$listingQr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listingQrKey"])(code)) refresh();
                }
            }["useListingQr.useEffect.onStorage"];
            refresh();
            window.addEventListener('storage', onStorage);
            window.addEventListener(QR_UPDATED, refresh);
            return ({
                "useListingQr.useEffect": ()=>{
                    window.removeEventListener('storage', onStorage);
                    window.removeEventListener(QR_UPDATED, refresh);
                }
            })["useListingQr.useEffect"];
        }
    }["useListingQr.useEffect"], [
        code
    ]);
    return {
        ...state,
        record: state.record?.listingCode === code ? state.record : null
    };
}
_s(useListingQr, "zGmOY1k3mNTYuPOuFl/bNQhe+YI=");
function ListingQrPreview({ value, size = 192, svgRef }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QRCodeSVG"], {
        ref: svgRef,
        value: value,
        size: size,
        level: "M",
        marginSize: 4
    }, void 0, false, {
        fileName: "[project]/components/ListingQr.jsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
_c = ListingQrPreview;
function ListingQr({ temple, title = 'Temple QR code' }) {
    _s1();
    const { record, error, loading } = useListingQr(temple);
    const [generating, setGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [actionError, setActionError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const generate = async ()=>{
        if (generating || loading || error || record) return;
        setGenerating(true);
        setActionError('');
        try {
            const save = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$listingQr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateListingQr"])(temple);
            // Serialize first creation across tabs where Web Locks is available.
            if (navigator.locks) await navigator.locks.request((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$listingQr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listingQrKey"])(temple.code), save);
            else save();
            window.dispatchEvent(new Event(QR_UPDATED));
        } catch (failure) {
            setActionError(`QR could not be saved. ${failure.message || 'Check browser storage and try again.'}`);
        } finally{
            setGenerating(false);
        }
    };
    const download = ()=>{
        if (!record || !svgRef.current) return;
        const svg = new XMLSerializer().serializeToString(svgRef.current);
        const url = URL.createObjectURL(new Blob([
            svg
        ], {
            type: 'image/svg+xml;charset=utf-8'
        }));
        const link = document.createElement('a');
        link.href = url;
        link.download = `${temple.code}-qr.svg`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(()=>URL.revokeObjectURL(url), 1000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "card p-5",
        "aria-label": `${temple.name} QR code`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "flex items-center gap-2 font-semibold",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/components/ListingQr.jsx",
                        lineNumber: 67,
                        columnNumber: 59
                    }, this),
                    title
                ]
            }, void 0, true, {
                fileName: "[project]/components/ListingQr.jsx",
                lineNumber: 67,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-xs text-brown-500",
                children: [
                    "Listing ",
                    temple.code,
                    " · Scan to open the temple's public page."
                ]
            }, void 0, true, {
                fileName: "[project]/components/ListingQr.jsx",
                lineNumber: 68,
                columnNumber: 5
            }, this),
            record ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex justify-center rounded-xl border border-brown-100 bg-white p-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ListingQrPreview, {
                            value: record.targetUrl,
                            svgRef: svgRef
                        }, void 0, false, {
                            fileName: "[project]/components/ListingQr.jsx",
                            lineNumber: 70,
                            columnNumber: 97
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ListingQr.jsx",
                        lineNumber: 70,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/ListingQr.jsx",
                                lineNumber: 71,
                                columnNumber: 92
                            }, this),
                            "QR already generated · ",
                            new Date(record.generatedAt).toLocaleDateString('en-IN')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ListingQr.jsx",
                        lineNumber: 71,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: record.targetUrl,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "mt-2 block break-all text-xs text-saffron-600 underline",
                        children: record.targetUrl
                    }, void 0, false, {
                        fileName: "[project]/components/ListingQr.jsx",
                        lineNumber: 72,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: download,
                                className: "btn-g",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/components/ListingQr.jsx",
                                        lineNumber: 73,
                                        columnNumber: 109
                                    }, this),
                                    "Download QR (SVG)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ListingQr.jsx",
                                lineNumber: 73,
                                columnNumber: 50
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: record.targetUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "btn-g",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/components/ListingQr.jsx",
                                        lineNumber: 73,
                                        columnNumber: 243
                                    }, this),
                                    "Open temple"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ListingQr.jsx",
                                lineNumber: 73,
                                columnNumber: 156
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ListingQr.jsx",
                        lineNumber: 73,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-xs text-brown-500",
                        children: "This listing keeps the same QR. Download it again whenever needed."
                    }, void 0, false, {
                        fileName: "[project]/components/ListingQr.jsx",
                        lineNumber: 74,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ListingQr.jsx",
                lineNumber: 69,
                columnNumber: 15
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm text-brown-500",
                        children: "QR code not generated yet. Only one QR is saved for this listing."
                    }, void 0, false, {
                        fileName: "[project]/components/ListingQr.jsx",
                        lineNumber: 76,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: generate,
                        disabled: loading || generating || !!error,
                        className: "btn-p mt-3 disabled:opacity-40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/components/ListingQr.jsx",
                                lineNumber: 77,
                                columnNumber: 135
                            }, this),
                            generating ? 'Generating…' : 'Generate QR code'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ListingQr.jsx",
                        lineNumber: 77,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ListingQr.jsx",
                lineNumber: 75,
                columnNumber: 11
            }, this),
            (error || actionError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "alert",
                className: "mt-3 text-xs text-red-700",
                children: error || actionError
            }, void 0, false, {
                fileName: "[project]/components/ListingQr.jsx",
                lineNumber: 79,
                columnNumber: 32
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ListingQr.jsx",
        lineNumber: 66,
        columnNumber: 10
    }, this);
}
_s1(ListingQr, "27YTIOjgCLupnBPGI74cDdWZNlY=", false, function() {
    return [
        useListingQr
    ];
});
_c1 = ListingQr;
var _c, _c1;
__turbopack_context__.k.register(_c, "ListingQrPreview");
__turbopack_context__.k.register(_c1, "ListingQr");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=components_03vljvl1tr8_a._.js.map