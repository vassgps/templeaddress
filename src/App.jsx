import React from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import * as P from './pages/public'
import * as V from './pages/vendor'
import * as FC from './pages/vendorFestival'
import * as SP from './pages/vendorService'
import * as X from './pages/partners'
import * as A from './pages/account'
import { PublicShell } from './ui'

const routes = [
  ['/', P.Home], ['/temples', P.Temples], ['/t/:slug', P.TemplePage], ['/claim/:slug', P.Claim], ['/book/:slug', P.Book], ['/receipt', P.Receipt], ['/donate/:slug', P.Donate],
  ['/special', P.Special], ['/special/:id', P.SpecialDetail], ['/festival', P.Festival], ['/services', P.Services], ['/service/:id', P.ServiceDetail], ['/sponsor', P.Sponsor], ['/login', P.Login], ['/account', A.Account], ['/account/agent-application', A.AgentApplication], ['/whatsapp', P.WhatsApp],
  ['/vendor', V.VToday], ['/vendor/poojas', V.VPoojas], ['/vendor/donations', V.VDonations], ['/vendor/payouts', V.VPayouts], ['/vendor/settings', V.VSettings], ['/vendor/page', V.VPage], ['/vendor/data', V.VData],
  ['/festival-admin', FC.FOverview], ['/festival-admin/programme', FC.FProgramme], ['/festival-admin/offerings', FC.FOfferings], ['/festival-admin/bookings', FC.FBookings], ['/festival-admin/sponsors', FC.FSponsors], ['/festival-admin/artists', FC.FArtists], ['/festival-admin/finance', FC.FFinance], ['/festival-admin/page', FC.FPage], ['/festival-admin/settings', FC.FSettings],
  ['/service-admin', SP.SToday], ['/service-admin/services', SP.SServices], ['/service-admin/availability', SP.SAvailability], ['/service-admin/enquiries', SP.SEnquiries], ['/service-admin/special', SP.SSpecials], ['/service-admin/reviews', SP.SReviews], ['/service-admin/earnings', SP.SEarnings], ['/service-admin/profile', SP.SProfile],
  ['/agent', X.AWallet], ['/agent/profile', X.AProfile], ['/agent/listings', X.AListings], ['/agent/listings/:slug/edit', X.AEditListing], ['/agent/share', X.AShare], ['/agent/submit', X.ASubmit], ['/agent/submissions', X.ASubmissions], ['/dealer', X.DDash], ['/dealer/profile', X.DProfile], ['/dealer/agents', X.DAgents],
  ['/staff', X.SQueues], ['/staff/analytics', X.SAnalytics], ['/staff/listing', X.SListing], ['/staff/kyc', X.SKyc], ['/staff/charts', X.SCharts], ['/staff/special', X.SSpecial], ['/staff/payouts', X.SPayouts], ['/staff/withdrawals', X.SWithdrawals], ['/staff/ownership', X.SOwnership], ['/staff/sponsors', X.SSponsors], ['/staff/backup', X.SBackup], ['/staff/config', X.SConfig], ['/staff/tables', X.STables],
]
const groups = [
  ['Public / devotee', ['/','/temples','/t/kottur-sree-mahavishnu-temple','/t/bilathikulam-sree-shiva-temple','/claim/kottur-sree-mahavishnu-temple','/book/kottur-sree-mahavishnu-temple','/receipt','/donate/kottur-sree-mahavishnu-temple','/special','/special/sp1','/festival','/services','/service/sv1','/sponsor','/login','/account','/account/agent-application','/whatsapp']],
  ['Vendor · Temple committee', ['/vendor','/vendor/poojas','/vendor/donations','/vendor/payouts','/vendor/payouts?mode=own','/vendor/payouts?mode=manual','/vendor/settings','/vendor/settings?tab=6','/vendor/page','/vendor/data']],
  ['Vendor · Festival committee', ['/festival-admin','/festival-admin/programme','/festival-admin/offerings','/festival-admin/bookings','/festival-admin/sponsors','/festival-admin/artists','/festival-admin/finance','/festival-admin/page','/festival-admin/settings']],
  ['Vendor · Service provider', ['/service-admin','/service-admin/services','/service-admin/availability','/service-admin/enquiries','/service-admin/special','/service-admin/reviews','/service-admin/earnings','/service-admin/profile']],
  ['Agent & dealer', ['/agent','/agent/profile','/agent/listings','/agent/listings/vengamala-bhagavathi-temple/edit','/agent/share','/agent/submit','/agent/submissions','/dealer','/dealer/profile','/dealer/agents']],
  ['Staff / super admin', ['/staff','/staff/analytics','/staff/payouts','/staff/ownership','/staff/listing','/staff/kyc','/staff/charts','/staff/special','/staff/withdrawals','/staff/sponsors','/staff/backup','/staff/config','/staff/tables']],
]
function SiteMap(){ return (<PublicShell><div className="mx-auto max-w-6xl px-4 py-10"><h1 className="text-3xl font-semibold">Prototype site map</h1><p className="text-brown-500">Every route in the MVP. Business rules: custom-gateway listings show no payouts · bank-only listings are paid by manual NEFT sheet · 80G receipt generated with the booking receipt · gateways: Razorpay, PayU, Stripe (platform) and Omniware (temple's own).</p>
  <div className="mt-6 grid gap-4 md:grid-cols-2">{groups.map(([g,rs])=><div key={g} className="card p-5"><h3 className="font-semibold">{g}</h3><div className="mt-2 grid gap-1">{rs.map(r=><Link key={r} to={r} className="rounded-lg px-2 py-1 text-sm hover:bg-brown-50">{r}</Link>)}</div></div>)}</div></div></PublicShell>) }
export default function App(){ return (<HashRouter><Routes>{routes.map(([p,C])=><Route key={p} path={p} element={<C/>}/>)}<Route path="/map" element={<SiteMap/>}/><Route path="*" element={<SiteMap/>}/></Routes></HashRouter>) }
