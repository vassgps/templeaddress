import React from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import * as P from './pages/public'
import * as V from './pages/vendor'
import * as FC from './pages/vendorFestival'
import * as SP from './pages/vendorService'
import * as X from './pages/partners'
import * as A from './pages/account'
import { StaffDirectory } from './pages/staffDirectory'
import { PartnerCheckout } from './pages/checkout'
import { PublicShell } from './ui'

const routes = [
  ['/staff/directory/:kind', StaffDirectory],
  ['/', P.Home], ['/temples', P.Temples], ['/t/:slug', P.TemplePage], ['/claim/:slug', P.Claim], ['/book/:slug', P.Book], ['/receipt', P.Receipt], ['/donate/:slug', P.Donate],
  ['/special', P.Special], ['/special/:id', P.SpecialDetail], ['/festival', P.Festival], ['/services', P.Services], ['/service/:id', P.ServiceDetail], ['/sponsor', P.Sponsor], ['/login', P.Login], ['/account', A.Account], ['/account/partner-application', A.PartnerApplication], ['/whatsapp', P.WhatsApp],
  ['/vendor', V.VToday], ['/vendor/bookings', V.VBookings], ['/vendor/charts', V.VCharts], ['/vendor/charts/:chartId', V.VChartDetail], ['/vendor/poojas', V.VPoojas], ['/vendor/donations', V.VDonations], ['/vendor/payouts', V.VPayouts], ['/vendor/settings', V.VSettings], ['/vendor/page', V.VPage], ['/vendor/data', V.VData],
  ['/festival-admin', FC.FOverview], ['/festival-admin/programme', FC.FProgramme], ['/festival-admin/offerings', FC.FOfferings], ['/festival-admin/bookings', FC.FBookings], ['/festival-admin/sponsors', FC.FSponsors], ['/festival-admin/profile', FC.FPage], ['/festival-admin/settings', FC.FSettings],
  ['/service-admin', SP.SSummary], ['/service-admin/appointments', SP.SAppointments], ['/service-admin/services', SP.SServices], ['/service-admin/enquiries', SP.SEnquiries], ['/service-admin/reviews', SP.SReviews], ['/service-admin/profile', SP.SProfile],
  ['/partner', X.AWallet], ['/partner/profile', X.AProfile], ['/partner/listings', X.AListings], ['/partner/listings/:slug/edit', X.AEditListing], ['/partner/share', X.AShare], ['/partner/submit', X.ASubmit], ['/partner/submissions', X.ASubmissions], ['/partner/checkout', PartnerCheckout], ['/dealer', X.DDash], ['/dealer/wallet', X.DWallet], ['/dealer/profile', X.DProfile], ['/dealer/partners', X.DPartners],
  ['/staff', X.SQueues], ['/staff/analytics', X.SAnalytics], ['/staff/listing', X.SListing], ['/staff/kyc', X.SKyc], ['/staff/charts', X.SCharts], ['/staff/special', X.SSpecial], ['/staff/support', X.SSupport], ['/staff/review/:queue/:id', X.SReviewDetail], ['/staff/payouts', X.SPayouts], ['/staff/withdrawals', X.SWithdrawals], ['/staff/ownership', X.SOwnership], ['/staff/sponsors', X.SSponsors], ['/staff/backup', X.SBackup], ['/staff/wallet-credit', X.SWalletCredit], ['/staff/config', X.SConfig], ['/staff/tables', X.STables],
  // Administrator-only pages (Portal admin's own section — see the 3-way split in partners.jsx)
  ['/staff/staff-management', X.SStaffManagement], ['/staff/masterdata', X.SMasterData], ['/staff/gateway-config', X.SGatewayConfig], ['/staff/plans', X.SPlansAdmin], ['/staff/branding', X.SBranding], ['/staff/notifications', X.SNotifications], ['/staff/audit-logs', X.SAuditLogs],
]
const groups = [
  ['Public / devotee', ['/','/temples','/t/kottur-sree-mahavishnu-temple','/t/bilathikulam-sree-shiva-temple','/claim/kottur-sree-mahavishnu-temple','/book/kottur-sree-mahavishnu-temple','/receipt','/donate/kottur-sree-mahavishnu-temple','/special','/special/sp1','/festival','/services','/service/sv1','/sponsor','/login','/account','/account/partner-application','/whatsapp']],
  ['Vendor · Temple committee', ['/vendor','/vendor/bookings','/vendor/charts','/vendor/charts/CH-T1028-260912','/vendor/poojas','/vendor/donations','/vendor/payouts','/vendor/payouts?mode=own','/vendor/payouts?mode=manual','/vendor/settings','/vendor/settings?tab=6','/vendor/page','/vendor/data']],
  ['Vendor · Festival committee', ['/festival-admin','/festival-admin/programme','/festival-admin/offerings','/festival-admin/bookings','/festival-admin/sponsors','/festival-admin/profile','/festival-admin/settings']],
  ['Vendor · Service provider', ['/service-admin','/service-admin/appointments','/service-admin/services','/service-admin/enquiries','/service-admin/reviews','/service-admin/profile']],
  ['Partner & dealer', ['/partner','/partner/profile','/partner/listings','/partner/listings/vengamala-bhagavathi-temple/edit','/partner/share','/partner/submit','/partner/submissions','/partner/checkout','/dealer','/dealer/wallet','/dealer/profile','/dealer/partners']],
  ['Staff · Moderator', ['/staff?role=moderator','/staff/listing?role=moderator','/staff/kyc?role=moderator','/staff/charts?role=moderator','/staff/special?role=moderator','/staff/ownership?role=moderator','/staff/support?role=moderator']],
  ['Staff · Accountant', ['/staff?role=accountant','/staff/payouts?role=accountant','/staff/withdrawals?role=accountant','/staff/sponsors?role=accountant']],
  ['Staff · Portal admin — Administrator', ['/staff?role=admin','/staff/analytics?role=admin','/staff/staff-management?role=admin','/staff/tables?role=admin','/staff/masterdata?role=admin','/staff/gateway-config?role=admin','/staff/config?role=admin','/staff/plans?role=admin','/staff/backup?role=admin','/staff/branding?role=admin','/staff/notifications?role=admin','/staff/audit-logs?role=admin','/staff/wallet-credit?role=admin']],
]
function SiteMap(){ return (<PublicShell><div className="mx-auto max-w-6xl px-4 py-10"><h1 className="text-3xl font-semibold">Prototype site map</h1><p className="text-brown-500">Every route in the MVP. Business rules: custom-gateway listings show no payouts · bank-only listings are paid by manual NEFT sheet · 80G receipt generated with the booking receipt · gateways: Razorpay, PayU, Stripe (platform) and Omniware (temple's own).</p>
  <div className="mt-6 grid gap-4 md:grid-cols-2">{groups.map(([g,rs])=><div key={g} className="card p-5"><h3 className="font-semibold">{g}</h3><div className="mt-2 grid gap-1">{rs.map(r=><Link key={r} to={r} className="rounded-lg px-2 py-1 text-sm hover:bg-brown-50">{r}</Link>)}</div></div>)}</div></div></PublicShell>) }
export default function App(){ return (<HashRouter><Routes>{routes.map(([p,C])=><Route key={p} path={p} element={<C/>}/>)}<Route path="/map" element={<SiteMap/>}/><Route path="*" element={<SiteMap/>}/></Routes></HashRouter>) }
