(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/pages/account.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Account",
    ()=>Account,
    "PartnerApplication",
    ()=>PartnerApplication,
    "UserCreateListing",
    ()=>UserCreateListing,
    "UserEditListing",
    ()=>UserEditListing,
    "UserListings",
    ()=>UserListings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/badge-check.js [app-client] (ecmascript) <export default as BadgeCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-client] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pages$2f$partners$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/pages/partners.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const Wrap = ({ children, className = '' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `mx-auto max-w-6xl px-4 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/pages/account.jsx",
        lineNumber: 10,
        columnNumber: 43
    }, ("TURBOPACK compile-time value", void 0));
_c = Wrap;
function Account() {
    _s();
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: 'Anand',
        star: 'Rohini',
        gothra: 'Bharadwaja',
        rashi: 'Vrishabham (Taurus)',
        language: 'English',
        address: 'Kozhikode, Kerala, India',
        mobile: '+91 94966 86256',
        email: 'anand@example.com'
    });
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile);
    const [verify, setVerify] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [contact, setContact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [billingActivations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Account.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                return JSON.parse(window.localStorage.getItem('ta-billing-activations-v1') || '[]');
            } catch  {
                return [];
            }
        }
    }["Account.useState"]);
    const [partnerStatus, setPartnerStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Account.useState": ()=>sessionStorage.getItem('ta-partner-status') || 'none'
    }["Account.useState"]);
    const [partnerOpen, setPartnerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [partnerStep, setPartnerStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [partner, setPartner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        legalName: 'Anand',
        address: 'Kozhikode, Kerala, India',
        bankAccount: '',
        ifsc: '',
        bankName: '',
        upi: '',
        pan: '',
        aadhaar: ''
    });
    const [docs, setDocs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        photo: '',
        aadhaar: '',
        pan: '',
        bank: ''
    });
    const [consent, setConsent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const googleLinked = true;
    const flash = (text)=>{
        setNotice(text);
        setTimeout(()=>setNotice(''), 2200);
    };
    const saveProfile = ()=>{
        setProfile({
            ...draft,
            mobile: profile.mobile,
            email: profile.email
        });
        setEditing(false);
        flash('Profile details saved');
    };
    const startVerification = (field)=>{
        setVerify({
            field,
            stage: 'contact'
        });
        setContact(profile[field]);
        setOtp('');
    };
    const sendOtp = ()=>{
        if (contact.trim()) {
            setVerify((v)=>({
                    ...v,
                    stage: 'otp'
                }));
            flash(`Verification code sent to ${contact}`);
        }
    };
    const confirmContact = ()=>{
        if (otp.length < 4) return;
        setProfile((p)=>({
                ...p,
                [verify.field]: contact
            }));
        setDraft((p)=>({
                ...p,
                [verify.field]: contact
            }));
        setVerify(null);
        flash('Contact verified and updated');
    };
    const beginPartner = ()=>{
        setPartnerStatus('draft');
        setPartnerOpen(true);
        setPartnerStep(0);
    };
    const setPartnerField = (key, value)=>setPartner((a)=>({
                ...a,
                [key]: value
            }));
    const selectDoc = (key, event)=>setDocs((d)=>({
                ...d,
                [key]: event.target.files?.[0]?.name || ''
            }));
    const partnerMeta = {
        draft: [
            'Draft',
            'warn',
            'Complete all KYC details and documents before submitting.',
            'No staff feedback yet — this draft has not been submitted.'
        ],
        review: [
            'Under review',
            'info',
            'TempleAddress staff are reviewing your identity and bank documents.',
            'KYC received. Initial review normally takes 2 working days.'
        ],
        approved: [
            'Approved',
            'ok',
            'Your partner account is active. You can now submit and manage temple listings.',
            'Approved by Staff Moderator · Identity and bank details verified.'
        ],
        rejected: [
            'Changes requested',
            'err',
            'Correct the requested details and resubmit the application.',
            'The bank copy is unclear. Upload a page showing your name, account number and IFSC.'
        ]
    };
    const status = partnerMeta[partnerStatus];
    const kycReady = partner.legalName && partner.address && partner.bankAccount && partner.ifsc && partner.bankName && partner.pan && partner.aadhaar && consent;
    const updateStatus = (next)=>{
        setPartnerStatus(next);
        sessionStorage.setItem('ta-partner-status', next);
        if (next === 'review') setPartnerOpen(false);
        flash(next === 'review' ? 'Partner application submitted for staff review' : `Application status: ${partnerMeta[next][0]}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicShell"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wrap, {
            className: "py-8",
            children: [
                notice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-xl bg-brown-900 px-4 py-2 text-sm text-white shadow-soft",
                    children: notice
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 47,
                    columnNumber: 14
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-end justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-3xl font-semibold",
                                            children: profile.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 48,
                                            columnNumber: 125
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pill"], {
                                            tone: "ok",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 48,
                                                    columnNumber: 199
                                                }, this),
                                                "Verified devotee"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 48,
                                            columnNumber: 183
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 48,
                                    columnNumber: 74
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 text-sm text-brown-500",
                                    children: [
                                        profile.mobile,
                                        " · ",
                                        profile.email,
                                        " · ",
                                        profile.language
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 48,
                                    columnNumber: 252
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 48,
                            columnNumber: 69
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setDraft(profile);
                                setEditing((v)=>!v);
                            },
                            className: "btn-g",
                            children: editing ? 'Close editor' : 'Edit profile'
                        }, void 0, false, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 48,
                            columnNumber: 364
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 48,
                    columnNumber: 5
                }, this),
                editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card mt-6 overflow-hidden ring-1 ring-saffron-500/30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-b border-brown-100 bg-brown-50 px-5 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold",
                                    children: "Edit profile"
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 50,
                                    columnNumber: 150
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-brown-500",
                                    children: "These details prefill pooja bookings and receipts."
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 50,
                                    columnNumber: 205
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 50,
                            columnNumber: 85
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 p-5 lg:grid-cols-[1fr_320px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-4 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Name",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: draft.name,
                                                onChange: (e)=>setDraft({
                                                        ...draft,
                                                        name: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 51,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 51,
                                            columnNumber: 7
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Preferred language",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                value: draft.language,
                                                onChange: (e)=>setDraft({
                                                        ...draft,
                                                        language: e.target.value
                                                    }),
                                                options: [
                                                    'English',
                                                    'മലയാളം',
                                                    'Hindi'
                                                ]
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 51,
                                                columnNumber: 151
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 51,
                                            columnNumber: 117
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Birth star / Nakshatra",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                value: draft.star,
                                                onChange: (e)=>setDraft({
                                                        ...draft,
                                                        star: e.target.value
                                                    }),
                                                options: [
                                                    'Rohini',
                                                    'Makayiram',
                                                    'Thiruvathira',
                                                    'Punartham',
                                                    'Pooyam',
                                                    'Ayilyam'
                                                ]
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 52,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 52,
                                            columnNumber: 7
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Gothra",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: draft.gothra,
                                                onChange: (e)=>setDraft({
                                                        ...draft,
                                                        gothra: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 52,
                                                columnNumber: 237
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 52,
                                            columnNumber: 215
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Rashi",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                value: draft.rashi,
                                                onChange: (e)=>setDraft({
                                                        ...draft,
                                                        rashi: e.target.value
                                                    }),
                                                options: [
                                                    'Mesha (Aries)',
                                                    'Vrishabham (Taurus)',
                                                    'Mithunam (Gemini)',
                                                    'Karkidakam (Cancer)',
                                                    'Chingam (Leo)'
                                                ]
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 53,
                                                columnNumber: 28
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 53,
                                            columnNumber: 7
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Address",
                                            className: "sm:col-span-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                className: "input",
                                                rows: 3,
                                                value: draft.address,
                                                onChange: (e)=>setDraft({
                                                        ...draft,
                                                        address: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 53,
                                                columnNumber: 278
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 53,
                                            columnNumber: 229
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2 sm:col-span-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: saveProfile,
                                                    className: "btn-p",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 54,
                                                            columnNumber: 97
                                                        }, this),
                                                        "Save profile"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 54,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setEditing(false),
                                                    className: "btn-g",
                                                    children: "Cancel"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 54,
                                                    columnNumber: 136
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 54,
                                            columnNumber: 7
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 50,
                                    columnNumber: 360
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-brown-100 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs font-semibold uppercase text-brown-500",
                                                                    children: "Mobile number"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/account.jsx",
                                                                    lineNumber: 55,
                                                                    columnNumber: 155
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                    className: "text-sm",
                                                                    children: profile.mobile
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/account.jsx",
                                                                    lineNumber: 55,
                                                                    columnNumber: 238
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 55,
                                                            columnNumber: 150
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>startVerification('mobile'),
                                                            className: "btn-g !px-3 !py-1.5 text-xs",
                                                            children: "Change"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 55,
                                                            columnNumber: 287
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 55,
                                                    columnNumber: 93
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-xs text-brown-500",
                                                    children: "The new mobile number must be verified by OTP."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 55,
                                                    columnNumber: 398
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 55,
                                            columnNumber: 36
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-brown-100 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs font-semibold uppercase text-brown-500",
                                                                    children: "Email address"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/account.jsx",
                                                                    lineNumber: 56,
                                                                    columnNumber: 126
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                    className: "text-sm",
                                                                    children: profile.email
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/account.jsx",
                                                                    lineNumber: 56,
                                                                    columnNumber: 209
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 56,
                                                            columnNumber: 121
                                                        }, this),
                                                        ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                            size: 16,
                                                            className: "text-brown-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 56,
                                                            columnNumber: 271
                                                        }, this) : /*#__PURE__*/ "TURBOPACK unreachable"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 56,
                                                    columnNumber: 64
                                                }, this),
                                                ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-xs text-blue-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleIcon"], {
                                                            size: 14,
                                                            className: "mr-1 inline"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 56,
                                                            columnNumber: 483
                                                        }, this),
                                                        "This email belongs to your linked Google account and cannot be changed here."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 56,
                                                    columnNumber: 441
                                                }, this) : /*#__PURE__*/ "TURBOPACK unreachable"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 56,
                                            columnNumber: 7
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-emerald-50 p-4 text-xs text-emerald-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: "Google account linked"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 57,
                                                    columnNumber: 79
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1",
                                                    children: "The linked Google account cannot be edited or replaced in TempleAddress."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 57,
                                                    columnNumber: 107
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 57,
                                            columnNumber: 7
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 55,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 50,
                            columnNumber: 303
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 50,
                    columnNumber: 15
                }, this),
                verify && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 grid place-items-center bg-brown-900/50 p-4",
                    role: "dialog",
                    "aria-modal": "true",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card w-full max-w-md p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "grid h-10 w-10 place-items-center rounded-xl bg-saffron-50 text-saffron-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 59,
                                            columnNumber: 290
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 59,
                                        columnNumber: 196
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-semibold",
                                                children: [
                                                    "Verify new ",
                                                    verify.field === 'mobile' ? 'mobile number' : 'email'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 59,
                                                columnNumber: 319
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-brown-500",
                                                children: "The existing contact stays active until verification succeeds."
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 59,
                                                columnNumber: 422
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 59,
                                        columnNumber: 314
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/account.jsx",
                                lineNumber: 59,
                                columnNumber: 168
                            }, this),
                            verify.stage === 'contact' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: verify.field === 'mobile' ? 'New mobile number' : 'New email address',
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: verify.field === 'email' ? 'email' : 'tel',
                                            value: contact,
                                            onChange: (e)=>setContact(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 59,
                                            columnNumber: 675
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 59,
                                        columnNumber: 596
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: sendOtp,
                                        className: "btn-p w-full",
                                        children: "Send OTP"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 59,
                                        columnNumber: 792
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/account.jsx",
                                lineNumber: 59,
                                columnNumber: 564
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl bg-blue-50 p-3 text-sm text-blue-900",
                                        children: [
                                            "Code sent to ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: contact
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 59,
                                                columnNumber: 977
                                            }, this),
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 59,
                                        columnNumber: 899
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "6-digit OTP",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            inputMode: "numeric",
                                            maxLength: 6,
                                            value: otp,
                                            onChange: (e)=>setOtp(e.target.value.replace(/\D/g, '')),
                                            placeholder: "••••••"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 59,
                                            columnNumber: 1027
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 59,
                                        columnNumber: 1000
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: confirmContact,
                                        className: "btn-p w-full",
                                        children: "Verify & update"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 59,
                                        columnNumber: 1165
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: sendOtp,
                                        className: "w-full text-sm font-semibold text-saffron-600",
                                        children: "Resend code"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 59,
                                        columnNumber: 1247
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/account.jsx",
                                lineNumber: 59,
                                columnNumber: 867
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setVerify(null),
                                className: "btn-g mt-2 w-full",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/pages/account.jsx",
                                lineNumber: 59,
                                columnNumber: 1358
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 59,
                        columnNumber: 126
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 59,
                    columnNumber: 14
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 grid gap-6 lg:grid-cols-[1fr_340px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold",
                                            children: "Upcoming"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 61,
                                            columnNumber: 116
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "divide-y divide-brown-100",
                                            children: [
                                                [
                                                    'Ganapathi Homam',
                                                    'Kottur Sree Mahavishnu Temple · Sat 13 Sept · Anand · Rohini',
                                                    'ok',
                                                    'Confirmed'
                                                ],
                                                [
                                                    'Ashta Dravya Maha Ganapathi Homam',
                                                    'Special pooja · 14 Sept · proof pending',
                                                    'warn',
                                                    'Booked'
                                                ]
                                            ].map(([a, b, t, s])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3 py-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                    children: a
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/account.jsx",
                                                                    lineNumber: 61,
                                                                    columnNumber: 504
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-brown-500",
                                                                    children: b
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/account.jsx",
                                                                    lineNumber: 61,
                                                                    columnNumber: 514
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 61,
                                                            columnNumber: 480
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pill"], {
                                                            tone: t,
                                                            children: s
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 61,
                                                            columnNumber: 569
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/receipt",
                                                            className: "btn-g !py-1.5",
                                                            children: "Receipt"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 61,
                                                            columnNumber: 594
                                                        }, this)
                                                    ]
                                                }, a, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 61,
                                                    columnNumber: 426
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 61,
                                            columnNumber: 167
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-brown-500",
                                            children: "Cancel or reschedule until the chart closes (12 Sept, 8:00 PM)."
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 61,
                                            columnNumber: 670
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 61,
                                    columnNumber: 90
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold",
                                            children: "Past receipts"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 61,
                                            columnNumber: 812
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                                            head: [
                                                'Date',
                                                'Temple',
                                                'Item',
                                                'Amount',
                                                ''
                                            ],
                                            rows: [
                                                [
                                                    "31 Jul",
                                                    "Perayattil Subrahmanya Temple",
                                                    "Pushpanjali × 2",
                                                    "₹40",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/receipt",
                                                        className: "text-saffron-600",
                                                        children: "PDF"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 61,
                                                        columnNumber: 992
                                                    }, this)
                                                ],
                                                [
                                                    "5 Jun",
                                                    "Kottur Sree Mahavishnu Temple",
                                                    "Donation (80G)",
                                                    "₹1,000",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/receipt",
                                                        className: "text-saffron-600",
                                                        children: "PDF · 80G"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 61,
                                                        columnNumber: 1122
                                                    }, this)
                                                ]
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 61,
                                            columnNumber: 868
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 61,
                                    columnNumber: 786
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 61,
                            columnNumber: 63
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold",
                                            children: "Quick book"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 62,
                                            columnNumber: 62
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/book/kottur-sree-mahavishnu-temple",
                                            className: "btn-p mt-2 w-full",
                                            children: "Kottur Mahavishnu Temple"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 62,
                                            columnNumber: 107
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/temples",
                                            className: "btn-s mt-2 w-full",
                                            children: "Another temple"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 62,
                                            columnNumber: 217
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 62,
                                    columnNumber: 36
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card p-5 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold",
                                            children: "Family members"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 62,
                                            columnNumber: 330
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        profile.name,
                                                        " · ",
                                                        profile.star
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 62,
                                                    columnNumber: 411
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: "Devi · Makayiram"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 62,
                                                    columnNumber: 453
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: "Aarav · Thiruvathira"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 62,
                                                    columnNumber: 480
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 62,
                                            columnNumber: 379
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-saffron-600",
                                            children: "+ Add"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 62,
                                            columnNumber: 517
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 62,
                                    columnNumber: 296
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card space-y-2 p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold",
                                            children: "Notifications"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 62,
                                            columnNumber: 610
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toggle"], {
                                            label: "WhatsApp",
                                            defaultChecked: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 62,
                                            columnNumber: 658
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toggle"], {
                                            label: "Email",
                                            defaultChecked: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 62,
                                            columnNumber: 699
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 62,
                                    columnNumber: 574
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 62,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 61,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card mt-6 p-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold",
                                        children: "My listings"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 64,
                                        columnNumber: 108
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-brown-500",
                                        children: "Create listings, track staff review and submit edits."
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 64,
                                        columnNumber: 162
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/account.jsx",
                                lineNumber: 64,
                                columnNumber: 103
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/account/listings",
                                        className: "btn-g",
                                        children: "View listings"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 64,
                                        columnNumber: 291
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/account/listings/new",
                                        className: "btn-p",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 64,
                                                columnNumber: 413
                                            }, this),
                                            "Create listing"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 64,
                                        columnNumber: 360
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/account.jsx",
                                lineNumber: 64,
                                columnNumber: 263
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 64,
                        columnNumber: 36
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 64,
                    columnNumber: 5
                }, this),
                billingActivations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card mt-6 p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold",
                            children: "Temple Billing mini ERP"
                        }, void 0, false, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 66,
                            columnNumber: 66
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-brown-500",
                            children: "Your purchased licences and activation details."
                        }, void 0, false, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 66,
                            columnNumber: 132
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 space-y-3",
                            children: billingActivations.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl bg-blue-50 p-4 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-start justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            children: record.temple
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 66,
                                                            columnNumber: 435
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-blue-900",
                                                            children: [
                                                                "Temple code: ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                    children: record.templeCode
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/pages/account.jsx",
                                                                    lineNumber: 66,
                                                                    columnNumber: 501
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 66,
                                                            columnNumber: 457
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 break-all font-mono text-xs text-blue-800",
                                                            children: [
                                                                "Activation UUID: ",
                                                                record.activationUuid
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 66,
                                                            columnNumber: 533
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 66,
                                                    columnNumber: 430
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pill"], {
                                                    tone: record.status === 'Active' ? 'ok' : 'warn',
                                                    children: record.status
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 66,
                                                    columnNumber: 649
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 66,
                                            columnNumber: 364
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3",
                                            children: record.status === 'Active' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "data:text/plain;charset=utf-8,TempleAddress%20Billing%20mini%20ERP%20installer%20prototype",
                                                download: "TempleAddress-Billing-Setup.txt",
                                                className: "btn-p",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 66,
                                                        columnNumber: 937
                                                    }, this),
                                                    "Download app"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 66,
                                                columnNumber: 775
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                disabled: true,
                                                className: "btn-p opacity-50",
                                                children: "Download after verification"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 66,
                                                columnNumber: 975
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 66,
                                            columnNumber: 727
                                        }, this)
                                    ]
                                }, record.activationUuid, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 66,
                                    columnNumber: 285
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 66,
                            columnNumber: 221
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 66,
                    columnNumber: 35
                }, this),
                status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card mt-4 p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold",
                                    children: "Partner application"
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 68,
                                    columnNumber: 96
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pill"], {
                                    tone: status[1],
                                    children: status[0]
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 68,
                                    columnNumber: 158
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-auto text-xs text-brown-500",
                                    children: "TA-AG-2026-0184 · Updated 11 Sept 2026"
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 68,
                                    columnNumber: 199
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 68,
                            columnNumber: 45
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 grid gap-3 md:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl bg-brown-50 p-3 text-sm",
                                    children: status[2]
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 68,
                                    columnNumber: 347
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `rounded-xl p-3 text-sm ${partnerStatus === 'rejected' ? 'bg-red-50 text-red-800' : partnerStatus === 'approved' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-blue-900'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: "Admin / staff feedback"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 68,
                                            columnNumber: 600
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1",
                                            children: status[3]
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 68,
                                            columnNumber: 629
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 68,
                                    columnNumber: 416
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 68,
                            columnNumber: 299
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex flex-wrap items-center gap-2 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    className: "text-brown-500",
                                    children: "Prototype status preview:"
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 68,
                                    columnNumber: 740
                                }, this),
                                [
                                    'draft',
                                    'review',
                                    'approved',
                                    'rejected'
                                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>updateStatus(s),
                                        className: `rounded-full px-2.5 py-1 font-semibold ${partnerStatus === s ? 'bg-brown-900 text-white' : 'bg-brown-100 text-brown-600'}`,
                                        children: partnerMeta[s][0]
                                    }, s, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 68,
                                        columnNumber: 848
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 68,
                            columnNumber: 676
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 68,
                    columnNumber: 14
                }, this),
                partnerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 overflow-y-auto bg-brown-900/60 p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto my-6 max-w-3xl overflow-hidden rounded-2xl bg-brown-50 shadow-soft",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between gap-3 bg-brown-900 px-6 py-5 text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-semibold",
                                                children: "Partner KYC application"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 70,
                                                columnNumber: 266
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-brown-100",
                                                children: "Saved as draft until submitted for staff verification."
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 70,
                                                columnNumber: 333
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 70,
                                        columnNumber: 261
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPartnerOpen(false),
                                        className: "text-2xl",
                                        "aria-label": "Close",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 70,
                                        columnNumber: 435
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/account.jsx",
                                lineNumber: 70,
                                columnNumber: 183
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Steps"], {
                                        items: [
                                            'KYC details',
                                            'Documents',
                                            'Review'
                                        ],
                                        at: partnerStep
                                    }, void 0, false, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 70,
                                        columnNumber: 556
                                    }, this),
                                    partnerStep === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-4 sm:grid-cols-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "Legal name",
                                                hint: "Must match PAN and Aadhaar",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: partner.legalName,
                                                    onChange: (e)=>setPartnerField('legalName', e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 71,
                                                    columnNumber: 128
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 71,
                                                columnNumber: 68
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "PAN card number",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: partner.pan,
                                                    onChange: (e)=>setPartnerField('pan', e.target.value.toUpperCase()),
                                                    placeholder: "ABCDE1234F",
                                                    maxLength: 10
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 71,
                                                    columnNumber: 259
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 71,
                                                columnNumber: 228
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "Aadhaar number",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: partner.aadhaar,
                                                    onChange: (e)=>setPartnerField('aadhaar', e.target.value),
                                                    placeholder: "XXXX XXXX XXXX"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 71,
                                                    columnNumber: 431
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 71,
                                                columnNumber: 401
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "UPI ID (optional)",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: partner.upi,
                                                    onChange: (e)=>setPartnerField('upi', e.target.value),
                                                    placeholder: "name@bank"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 71,
                                                    columnNumber: 589
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 71,
                                                columnNumber: 556
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "Full address",
                                                className: "sm:col-span-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    className: "input",
                                                    rows: 3,
                                                    value: partner.address,
                                                    onChange: (e)=>setPartnerField('address', e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 71,
                                                    columnNumber: 755
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 71,
                                                columnNumber: 701
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "Bank account number",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: partner.bankAccount,
                                                    onChange: (e)=>setPartnerField('bankAccount', e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 71,
                                                    columnNumber: 916
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 71,
                                                columnNumber: 881
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "IFSC",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: partner.ifsc,
                                                    onChange: (e)=>setPartnerField('ifsc', e.target.value.toUpperCase())
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 71,
                                                    columnNumber: 1040
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 71,
                                                columnNumber: 1020
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "Bank name",
                                                className: "sm:col-span-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: partner.bankName,
                                                    onChange: (e)=>setPartnerField('bankName', e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 71,
                                                    columnNumber: 1195
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 71,
                                                columnNumber: 1144
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 71,
                                        columnNumber: 25
                                    }, this),
                                    partnerStep === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl bg-blue-50 p-3 text-sm text-blue-900",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                        size: 14,
                                                        className: "mr-1 inline"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 72,
                                                        columnNumber: 95
                                                    }, this),
                                                    "All uploads are optional and visible only to authorised KYC reviewers."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 72,
                                                columnNumber: 30
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 grid gap-4 sm:grid-cols-2",
                                                children: [
                                                    [
                                                        'photo',
                                                        'Your recent photo (optional)',
                                                        'JPG or PNG'
                                                    ],
                                                    [
                                                        'aadhaar',
                                                        'Aadhaar copy (optional)',
                                                        'Front and back'
                                                    ],
                                                    [
                                                        'pan',
                                                        'PAN card copy (optional)',
                                                        'PDF, JPG or PNG'
                                                    ],
                                                    [
                                                        'bank',
                                                        'Bank passbook / statement (optional)',
                                                        'Can be supplied later'
                                                    ]
                                                ].map(([key, label, hint])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                        label: label,
                                                        hint: docs[key] ? `Selected: ${docs[key]}` : hint,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "file",
                                                            accept: ".pdf,.jpg,.jpeg,.png",
                                                            onChange: (e)=>selectDoc(key, e)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 72,
                                                            columnNumber: 599
                                                        }, this)
                                                    }, key, false, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 72,
                                                        columnNumber: 521
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 72,
                                                columnNumber: 212
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 72,
                                        columnNumber: 25
                                    }, this),
                                    partnerStep === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-3 sm:grid-cols-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-xl bg-white p-4 shadow-ring",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-semibold uppercase text-brown-500",
                                                                children: "Applicant"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/account.jsx",
                                                                lineNumber: 73,
                                                                columnNumber: 148
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: partner.legalName || 'Not entered'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/account.jsx",
                                                                lineNumber: 73,
                                                                columnNumber: 227
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-brown-500",
                                                                children: partner.address || 'Address not entered'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/account.jsx",
                                                                lineNumber: 73,
                                                                columnNumber: 268
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-2 text-sm",
                                                                children: [
                                                                    "PAN: ",
                                                                    partner.pan || '—',
                                                                    " · Aadhaar: ",
                                                                    partner.aadhaar ? 'Provided' : '—'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/pages/account.jsx",
                                                                lineNumber: 73,
                                                                columnNumber: 350
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 73,
                                                        columnNumber: 95
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-xl bg-white p-4 shadow-ring",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-semibold uppercase text-brown-500",
                                                                children: "Settlement"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/account.jsx",
                                                                lineNumber: 73,
                                                                columnNumber: 508
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: partner.bankName || 'Bank not entered'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/account.jsx",
                                                                lineNumber: 73,
                                                                columnNumber: 588
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-brown-500",
                                                                children: [
                                                                    "A/c ",
                                                                    partner.bankAccount || '—',
                                                                    " · ",
                                                                    partner.ifsc || 'IFSC —'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/pages/account.jsx",
                                                                lineNumber: 73,
                                                                columnNumber: 633
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-2 text-sm",
                                                                children: [
                                                                    "UPI: ",
                                                                    partner.upi || 'Not provided'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/pages/account.jsx",
                                                                lineNumber: 73,
                                                                columnNumber: 732
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 73,
                                                        columnNumber: 455
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 73,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl bg-white p-4 shadow-ring",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: "Optional documents"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 73,
                                                        columnNumber: 863
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4",
                                                        children: [
                                                            [
                                                                'Photo',
                                                                'photo'
                                                            ],
                                                            [
                                                                'Aadhaar',
                                                                'aadhaar'
                                                            ],
                                                            [
                                                                'PAN card',
                                                                'pan'
                                                            ],
                                                            [
                                                                'Bank proof',
                                                                'bank'
                                                            ]
                                                        ].map(([label, key])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: docs[key] ? 'text-emerald-700' : 'text-brown-500',
                                                                children: [
                                                                    docs[key] ? '✓' : '○',
                                                                    " ",
                                                                    label
                                                                ]
                                                            }, key, true, {
                                                                fileName: "[project]/components/pages/account.jsx",
                                                                lineNumber: 73,
                                                                columnNumber: 1059
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 73,
                                                        columnNumber: 888
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 73,
                                                columnNumber: 810
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-start gap-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: consent,
                                                        onChange: (e)=>setConsent(e.target.checked),
                                                        className: "mt-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 73,
                                                        columnNumber: 1231
                                                    }, this),
                                                    "I confirm these details are correct and consent to KYC verification."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 73,
                                                columnNumber: 1181
                                            }, this),
                                            !kycReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "rounded-xl bg-saffron-50 p-3 text-xs text-saffron-800",
                                                children: "Complete the required KYC fields and confirm consent. Document uploads are optional."
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 73,
                                                columnNumber: 1421
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 73,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 flex flex-wrap justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setPartnerStatus('draft');
                                                    setPartnerOpen(false);
                                                    flash('Application saved as draft');
                                                },
                                                className: "btn-g",
                                                children: "Save draft & close"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 74,
                                                columnNumber: 66
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    partnerStep > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setPartnerStep((s)=>s - 1),
                                                        className: "btn-g",
                                                        children: "Back"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 74,
                                                        columnNumber: 263
                                                    }, this),
                                                    partnerStep < 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setPartnerStep((s)=>s + 1),
                                                        className: "btn-p",
                                                        children: "Continue"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 74,
                                                        columnNumber: 355
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        disabled: !kycReady,
                                                        onClick: ()=>updateStatus('review'),
                                                        className: "btn-p",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/pages/account.jsx",
                                                                lineNumber: 74,
                                                                columnNumber: 520
                                                            }, this),
                                                            "Submit for review"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/pages/account.jsx",
                                                        lineNumber: 74,
                                                        columnNumber: 436
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 74,
                                                columnNumber: 219
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pages/account.jsx",
                                        lineNumber: 74,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pages/account.jsx",
                                lineNumber: 70,
                                columnNumber: 535
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 70,
                        columnNumber: 91
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 70,
                    columnNumber: 19
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/pages/account.jsx",
            lineNumber: 46,
            columnNumber: 23
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/pages/account.jsx",
        lineNumber: 46,
        columnNumber: 10
    }, this);
}
_s(Account, "mkT7ODK+Papbe0GiVaf4IRrY730=");
_c1 = Account;
function UserListings() {
    _s1();
    const listings = [
        [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bySlug"])('kottur-sree-mahavishnu-temple'),
            'Published',
            'ok'
        ],
        [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bySlug"])('vengamala-bhagavathi-temple'),
            'Pending staff review',
            'warn'
        ]
    ];
    const [drafts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "UserListings.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                return JSON.parse(window.sessionStorage.getItem('ta-listing-drafts-v1') || '[]');
            } catch  {
                return [];
            }
        }
    }["UserListings.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicShell"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wrap, {
            className: "py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-end justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/account",
                                    className: "text-sm font-semibold text-brown-500",
                                    children: "← My account"
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 81,
                                    columnNumber: 116
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "mt-2 text-3xl font-semibold",
                                    children: "My listings"
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 81,
                                    columnNumber: 206
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-brown-500",
                                    children: "Listings created from your devotee profile."
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 81,
                                    columnNumber: 266
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 81,
                            columnNumber: 111
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/account/listings/new",
                            className: "btn-p",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 81,
                                    columnNumber: 410
                                }, this),
                                "Create listing"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 81,
                            columnNumber: 357
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 81,
                    columnNumber: 47
                }, this),
                drafts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold",
                            children: "Saved drafts"
                        }, void 0, false, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 82,
                            columnNumber: 55
                        }, this),
                        drafts.map((draft)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "rounded-2xl border border-blue-100 bg-blue-50 p-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            children: draft.listingName
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 82,
                                                            columnNumber: 328
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pill"], {
                                                            tone: "info",
                                                            children: [
                                                                "Draft · ",
                                                                draft.completedSections.length,
                                                                "/6 sections"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 82,
                                                            columnNumber: 354
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 82,
                                                    columnNumber: 287
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs text-blue-800",
                                                    children: [
                                                        draft.type,
                                                        " · Last saved ",
                                                        new Date(draft.updatedAt).toLocaleString('en-IN')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 82,
                                                    columnNumber: 436
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 82,
                                            columnNumber: 282
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: draft.id.startsWith('DRAFT-') ? '/account/listings/new' : `/account/listings/${draft.id}/edit`,
                                            className: "btn-p",
                                            children: "Continue draft"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 82,
                                            columnNumber: 565
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 82,
                                    columnNumber: 215
                                }, this)
                            }, draft.id, false, {
                                fileName: "[project]/components/pages/account.jsx",
                                lineNumber: 82,
                                columnNumber: 129
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 82,
                    columnNumber: 23
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 space-y-4",
                    children: listings.map(([temple, status, tone])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "card p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4 sm:flex-row sm:items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-lg font-semibold",
                                                            children: temple.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 83,
                                                            columnNumber: 263
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pill"], {
                                                            tone: tone,
                                                            children: status
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 83,
                                                            columnNumber: 319
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 83,
                                                    columnNumber: 212
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-brown-500",
                                                    children: [
                                                        temple.code,
                                                        " · ",
                                                        temple.place,
                                                        ", ",
                                                        temple.district
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 83,
                                                    columnNumber: 358
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 83,
                                            columnNumber: 188
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `#/t/${temple.slug}`,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "btn-g",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 83,
                                                            columnNumber: 574
                                                        }, this),
                                                        "View"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 83,
                                                    columnNumber: 483
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/account/listings/${temple.slug}/edit`,
                                                    className: "btn-s",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 83,
                                                            columnNumber: 678
                                                        }, this),
                                                        "Edit"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 83,
                                                    columnNumber: 607
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 83,
                                            columnNumber: 455
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 83,
                                    columnNumber: 123
                                }, this),
                                tone === 'warn' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 rounded-xl bg-saffron-50 p-3 text-xs text-saffron-800",
                                    children: "Staff is reviewing this listing. You can still update the draft and resubmit it."
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 83,
                                    columnNumber: 736
                                }, this)
                            ]
                        }, temple.slug, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 83,
                            columnNumber: 75
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 83,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/pages/account.jsx",
            lineNumber: 81,
            columnNumber: 24
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/pages/account.jsx",
        lineNumber: 81,
        columnNumber: 11
    }, this);
}
_s1(UserListings, "lfZ2WfJt5/uPSWsD414b7Bd5/lM=");
_c2 = UserListings;
function UserCreateListing() {
    _s2();
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (submitted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicShell"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wrap, {
            className: "max-w-2xl py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card p-8 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                        size: 44,
                        className: "mx-auto text-emerald-600"
                    }, void 0, false, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 88,
                        columnNumber: 110
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pill"], {
                        tone: "warn",
                        children: "Pending staff verification"
                    }, void 0, false, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 88,
                        columnNumber: 171
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-3 text-2xl font-semibold",
                        children: "Listing submitted"
                    }, void 0, false, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 88,
                        columnNumber: 222
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-brown-500",
                        children: "Your listing is saved under your devotee profile. Staff will review it before publication."
                    }, void 0, false, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 88,
                        columnNumber: 288
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/account/listings",
                        className: "btn-p mt-5",
                        children: "View my listings"
                    }, void 0, false, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 88,
                        columnNumber: 425
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/pages/account.jsx",
                lineNumber: 88,
                columnNumber: 72
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/pages/account.jsx",
            lineNumber: 88,
            columnNumber: 38
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/pages/account.jsx",
        lineNumber: 88,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicShell"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wrap, {
            className: "max-w-4xl py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/account/listings",
                    className: "text-sm font-semibold text-brown-500",
                    children: "← My listings"
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 89,
                    columnNumber: 57
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "mt-2 text-3xl font-semibold",
                    children: "Create a listing"
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 89,
                    columnNumber: 157
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-6 text-sm text-brown-500",
                    children: "Devotees and community members can create listings for staff verification."
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 89,
                    columnNumber: 222
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pages$2f$partners$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListingForm"], {
                    onSubmit: ()=>setSubmitted(true),
                    cancelTo: "/account/listings"
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 89,
                    columnNumber: 343
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/pages/account.jsx",
            lineNumber: 89,
            columnNumber: 24
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/pages/account.jsx",
        lineNumber: 89,
        columnNumber: 11
    }, this);
}
_s2(UserCreateListing, "tNRTCjghr/WtyTlbUwfu2lNYzqo=");
_c3 = UserCreateListing;
function UserEditListing() {
    _s3();
    const { slug } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const temple = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bySlug"])(slug);
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (submitted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicShell"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wrap, {
            className: "max-w-2xl py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card p-8 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                        size: 44,
                        className: "mx-auto text-saffron-600"
                    }, void 0, false, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 96,
                        columnNumber: 110
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-3 text-2xl font-semibold",
                        children: "Changes submitted"
                    }, void 0, false, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 96,
                        columnNumber: 171
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-brown-500",
                        children: "The current public page remains unchanged while staff reviews your update."
                    }, void 0, false, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 96,
                        columnNumber: 237
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/account/listings",
                        className: "btn-p mt-5",
                        children: "Back to my listings"
                    }, void 0, false, {
                        fileName: "[project]/components/pages/account.jsx",
                        lineNumber: 96,
                        columnNumber: 358
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/pages/account.jsx",
                lineNumber: 96,
                columnNumber: 72
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/pages/account.jsx",
            lineNumber: 96,
            columnNumber: 38
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/pages/account.jsx",
        lineNumber: 96,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicShell"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wrap, {
            className: "max-w-4xl py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/account/listings",
                    className: "text-sm font-semibold text-brown-500",
                    children: "← My listings"
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 97,
                    columnNumber: 57
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "mt-2 text-3xl font-semibold",
                    children: [
                        "Edit · ",
                        temple.name
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 97,
                    columnNumber: 157
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-6 text-sm text-brown-500",
                    children: "Submit changes for staff approval."
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 97,
                    columnNumber: 226
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pages$2f$partners$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListingForm"], {
                    existing: temple,
                    onSubmit: ()=>setSubmitted(true),
                    cancelTo: "/account/listings"
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 97,
                    columnNumber: 307
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/pages/account.jsx",
            lineNumber: 97,
            columnNumber: 24
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/pages/account.jsx",
        lineNumber: 97,
        columnNumber: 11
    }, this);
}
_s3(UserEditListing, "1pqVXDNneyVWMkfvOoC7+g5IRpE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c4 = UserEditListing;
function PartnerApplication() {
    _s4();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const nav = (path, opts)=>router.push(path, opts);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [consent, setConsent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [partner, setPartner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        legalName: 'Anand',
        address: 'Kozhikode, Kerala, India',
        bankAccount: '',
        ifsc: '',
        bankName: '',
        upi: '',
        pan: '',
        aadhaar: ''
    });
    const [docs, setDocs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        photo: '',
        aadhaar: '',
        pan: '',
        bank: ''
    });
    const setField = (key, value)=>setPartner((a)=>({
                ...a,
                [key]: value
            }));
    const selectDoc = (key, event)=>setDocs((d)=>({
                ...d,
                [key]: event.target.files?.[0]?.name || ''
            }));
    const detailsReady = partner.legalName && partner.address && partner.bankAccount && partner.ifsc && partner.bankName && partner.pan && partner.aadhaar;
    const ready = detailsReady && consent;
    const saveDraft = ()=>{
        sessionStorage.setItem('ta-partner-status', 'draft');
        nav('/account');
    };
    const submit = ()=>{
        if (!ready) {
            setNotice('Complete the required details and confirm consent before submitting. Uploads are optional.');
            return;
        }
        sessionStorage.setItem('ta-partner-status', 'review');
        nav('/account');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicShell"], {
        hideChatbot: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wrap, {
            className: "max-w-4xl py-6 sm:py-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/account",
                    className: "inline-flex items-center gap-1 text-sm font-semibold text-brown-500 hover:text-saffron-600",
                    children: "← Back to my account"
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 119,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 overflow-hidden rounded-3xl bg-brown-900 px-5 py-7 text-white sm:px-8 sm:py-9",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pill"], {
                            tone: "gold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 120,
                                    columnNumber: 123
                                }, this),
                                "Partner application"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 120,
                            columnNumber: 105
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-3 text-3xl font-semibold sm:text-4xl",
                            children: "Partner KYC verification"
                        }, void 0, false, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 120,
                            columnNumber: 172
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 max-w-2xl text-sm text-brown-100",
                            children: "Complete this form at your own pace. It remains a draft until you submit it to TempleAddress staff."
                        }, void 0, false, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 120,
                            columnNumber: 257
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 120,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card mt-5 p-4 sm:p-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Steps"], {
                            items: [
                                'KYC details',
                                'Documents',
                                'Review'
                            ],
                            at: step
                        }, void 0, false, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 122,
                            columnNumber: 43
                        }, this),
                        step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold",
                                            children: "Personal and settlement details"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 123,
                                            columnNumber: 45
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-brown-500",
                                            children: "Use the same legal name shown on your PAN and bank account."
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 123,
                                            columnNumber: 119
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 123,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-4 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Legal name",
                                            hint: "Must match PAN and Aadhaar",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: partner.legalName,
                                                onChange: (e)=>setField('legalName', e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 124,
                                                columnNumber: 69
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 124,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "PAN card number",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: partner.pan,
                                                onChange: (e)=>setField('pan', e.target.value.toUpperCase()),
                                                placeholder: "ABCDE1234F",
                                                maxLength: 10
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 125,
                                                columnNumber: 40
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 125,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Aadhaar number",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: partner.aadhaar,
                                                onChange: (e)=>setField('aadhaar', e.target.value),
                                                placeholder: "XXXX XXXX XXXX",
                                                inputMode: "numeric"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 126,
                                                columnNumber: 39
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 126,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "UPI ID (optional)",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: partner.upi,
                                                onChange: (e)=>setField('upi', e.target.value),
                                                placeholder: "name@bank"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 127,
                                                columnNumber: 42
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 127,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Full address",
                                            className: "sm:col-span-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                className: "input",
                                                rows: 4,
                                                value: partner.address,
                                                onChange: (e)=>setField('address', e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 128,
                                                columnNumber: 63
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 128,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Bank account number",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: partner.bankAccount,
                                                onChange: (e)=>setField('bankAccount', e.target.value),
                                                inputMode: "numeric"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 129,
                                                columnNumber: 44
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 129,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "IFSC",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: partner.ifsc,
                                                onChange: (e)=>setField('ifsc', e.target.value.toUpperCase()),
                                                placeholder: "FDRL0001234"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 130,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 130,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                            label: "Bank name",
                                            className: "sm:col-span-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: partner.bankName,
                                                onChange: (e)=>setField('bankName', e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/pages/account.jsx",
                                                lineNumber: 131,
                                                columnNumber: 60
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 131,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 123,
                                    columnNumber: 226
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 123,
                            columnNumber: 18
                        }, this),
                        step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold",
                                            children: "Optional KYC documents"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 134,
                                            columnNumber: 45
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-brown-500",
                                            children: "Upload available copies now or provide them later. PDF, JPG and PNG files are accepted."
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 134,
                                            columnNumber: 110
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 134,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl bg-blue-50 p-3 text-sm text-blue-900",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            size: 14,
                                            className: "mr-1 inline"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 134,
                                            columnNumber: 310
                                        }, this),
                                        "Uploads are optional and visible only to authorised KYC reviewers."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 134,
                                    columnNumber: 245
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 grid gap-4 sm:grid-cols-2",
                                    children: [
                                        [
                                            'photo',
                                            'Your recent photo',
                                            'A clear portrait photo'
                                        ],
                                        [
                                            'aadhaar',
                                            'Aadhaar copy',
                                            'Front and back in one file'
                                        ],
                                        [
                                            'pan',
                                            'PAN card copy',
                                            'The card must be readable'
                                        ],
                                        [
                                            'bank',
                                            'Bank passbook or statement',
                                            'Must show name, account number and IFSC'
                                        ]
                                    ].map(([key, label, hint])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `block rounded-2xl border-2 border-dashed p-4 ${docs[key] ? 'border-emerald-300 bg-emerald-50' : 'border-brown-200 bg-white'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: [
                                                        docs[key] ? '✓ ' : '',
                                                        label
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 135,
                                                    columnNumber: 431
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-1 block text-xs text-brown-500",
                                                    children: docs[key] || hint
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 135,
                                                    columnNumber: 496
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    accept: ".pdf,.jpg,.jpeg,.png",
                                                    onChange: (e)=>selectDoc(key, e),
                                                    className: "mt-3 block w-full text-xs"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 135,
                                                    columnNumber: 572
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 135,
                                            columnNumber: 279
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 134,
                                    columnNumber: 423
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 134,
                            columnNumber: 18
                        }, this),
                        step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold",
                                            children: "Review and submit"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 138,
                                            columnNumber: 45
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-brown-500",
                                            children: "Check your information before sending it to staff."
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 138,
                                            columnNumber: 105
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 138,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-4 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-brown-50 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-semibold uppercase text-brown-500",
                                                    children: "Applicant"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 138,
                                                    columnNumber: 291
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: partner.legalName || 'Not entered'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 138,
                                                    columnNumber: 370
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-brown-500",
                                                    children: partner.address || 'Address not entered'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 138,
                                                    columnNumber: 411
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-sm",
                                                    children: [
                                                        "PAN: ",
                                                        partner.pan || '—',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 138,
                                                            columnNumber: 544
                                                        }, this),
                                                        "Aadhaar: ",
                                                        partner.aadhaar ? 'Provided' : '—'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 138,
                                                    columnNumber: 493
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 138,
                                            columnNumber: 246
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-brown-50 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-semibold uppercase text-brown-500",
                                                    children: "Settlement"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 138,
                                                    columnNumber: 645
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    children: partner.bankName || 'Bank not entered'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 138,
                                                    columnNumber: 725
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-brown-500",
                                                    children: [
                                                        "A/c ",
                                                        partner.bankAccount || '—',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/components/pages/account.jsx",
                                                            lineNumber: 138,
                                                            columnNumber: 838
                                                        }, this),
                                                        partner.ifsc || 'IFSC —'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 138,
                                                    columnNumber: 770
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-sm",
                                                    children: [
                                                        "UPI: ",
                                                        partner.upi || 'Not provided'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 138,
                                                    columnNumber: 871
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 138,
                                            columnNumber: 600
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 138,
                                    columnNumber: 203
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 rounded-2xl border border-brown-100 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: "Optional documents"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 139,
                                            columnNumber: 71
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4",
                                            children: [
                                                [
                                                    'Photo',
                                                    'photo'
                                                ],
                                                [
                                                    'Aadhaar',
                                                    'aadhaar'
                                                ],
                                                [
                                                    'PAN card',
                                                    'pan'
                                                ],
                                                [
                                                    'Bank proof',
                                                    'bank'
                                                ]
                                            ].map(([label, key])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: docs[key] ? 'text-emerald-700' : 'text-brown-500',
                                                    children: [
                                                        docs[key] ? '✓' : '○',
                                                        " ",
                                                        label
                                                    ]
                                                }, key, true, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 139,
                                                    columnNumber: 267
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 139,
                                            columnNumber: 96
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 139,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "mt-4 flex items-start gap-3 rounded-2xl bg-brown-50 p-4 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: consent,
                                            onChange: (e)=>setConsent(e.target.checked),
                                            className: "mt-1 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 140,
                                            columnNumber: 92
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "I confirm these details are correct and consent to KYC verification by authorised TempleAddress staff."
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 140,
                                            columnNumber: 202
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 140,
                                    columnNumber: 9
                                }, this),
                                (!ready || notice) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 rounded-xl bg-saffron-50 p-3 text-sm text-saffron-800",
                                    children: notice || 'Complete the required fields and confirm consent. Document uploads are optional.'
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 141,
                                    columnNumber: 28
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 138,
                            columnNumber: 18
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-7 flex flex-col-reverse gap-3 border-t border-brown-100 pt-5 sm:flex-row sm:items-center sm:justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: saveDraft,
                                    className: "btn-g",
                                    children: "Save draft & return"
                                }, void 0, false, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 144,
                                    columnNumber: 135
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        step > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setNotice('');
                                                setStep((s)=>s - 1);
                                            },
                                            className: "btn-g flex-1 sm:flex-none",
                                            children: "Back"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 144,
                                            columnNumber: 246
                                        }, this),
                                        step < 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setStep((s)=>s + 1),
                                            className: "btn-p flex-1 sm:flex-none",
                                            children: "Continue"
                                        }, void 0, false, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 144,
                                            columnNumber: 360
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: !ready,
                                            onClick: submit,
                                            className: "btn-p flex-1 sm:flex-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pages/account.jsx",
                                                    lineNumber: 144,
                                                    columnNumber: 535
                                                }, this),
                                                "Submit for review"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/pages/account.jsx",
                                            lineNumber: 144,
                                            columnNumber: 454
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/pages/account.jsx",
                                    lineNumber: 144,
                                    columnNumber: 209
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pages/account.jsx",
                            lineNumber: 144,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 122,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 px-2 text-center text-xs text-brown-500",
                    children: "Your application ID will be generated after submission. Review status and staff feedback appear on your account page."
                }, void 0, false, {
                    fileName: "[project]/components/pages/account.jsx",
                    lineNumber: 146,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/pages/account.jsx",
            lineNumber: 118,
            columnNumber: 35
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/pages/account.jsx",
        lineNumber: 118,
        columnNumber: 10
    }, this);
}
_s4(PartnerApplication, "sJKdED0ibfOXVT6AWx/N17NkgzM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c5 = PartnerApplication;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Wrap");
__turbopack_context__.k.register(_c1, "Account");
__turbopack_context__.k.register(_c2, "UserListings");
__turbopack_context__.k.register(_c3, "UserCreateListing");
__turbopack_context__.k.register(_c4, "UserEditListing");
__turbopack_context__.k.register(_c5, "PartnerApplication");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_pages_account_jsx_1acdi2c9f6w4v._.js.map