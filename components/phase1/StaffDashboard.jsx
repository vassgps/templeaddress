'use client'

import Link from 'next/link'
import { ArrowRight, ListChecks, FileText, CalendarDays, ShieldCheck, MessageSquare, ClipboardList, Users, Landmark } from 'lucide-react'
import StaffShell, { useStaffUser } from './StaffShell'
import { canUseStaff } from '@/lib/staff-access'
import { useStaffQuery } from './StaffData'
import { StaffNotice, StaffPageHeading } from './StaffUI'

export default function StaffDashboard() {
  const user = useStaffUser(), { data, error, loading } = useStaffQuery('staff/overview')
  const queues = [
    ['Listing submissions', 'Submitted profiles awaiting content review.', '/staff/reviews', data?.awaiting_review, ListChecks],
    ['Saved drafts', 'Profiles saved by their creators before submission.', '/staff/reviews?status=draft', data?.draft_revisions, FileText],
    ['Event review', 'Review free events and their schedules.', '/staff/events?status=review', data?.event_reviews, CalendarDays],
    ['Enquiries', 'Follow up with visitors and listing contacts.', '/staff/enquiries', data?.new_enquiries, MessageSquare],
    ['Listing suggestions', 'New public suggestions to follow up.', '/staff/enquiries?view=leads', data?.new_leads, FileText],
    ...(canUseStaff(user, 'portal admin') ? [['Bank verification', 'Review the exact beneficiary account version.', '/staff/bank-verification', data?.bank_reviews, ShieldCheck]] : []),
  ]
  return <StaffShell><StaffPageHeading title="Workspace overview" description="Review submissions and manage daily operations from one place." action={<Link className="btn-p" href="/staff/reviews">Open listing review<ArrowRight size={16}/></Link>}/><StaffNotice error={error}/>
    <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[['Published listings', data?.published_listings, '/staff/listing?status=published'], ['Users', data?.users, '/staff/directory/users'], ['Payment pending', data?.pending_bookings, '/staff/directory/bookings?status=payment_pending'], ['Prepared charts', data?.prepared_charts, '/staff/charts?status=prepared']].map(([label, value, href]) => <Link href={href} key={label} className="rounded-2xl border border-brown-100 bg-white p-5 transition hover:border-saffron-400"><p className="text-sm text-brown-500">{label}</p><p className="mt-3 text-3xl font-semibold text-brown-900">{loading ? '…' : Number(value || 0).toLocaleString('en-IN')}</p></Link>)}</div>
    <section><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold">Needs attention</h2><span className="text-xs text-brown-500">Live queue counts</span></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{queues.map(([label, description, href, count, Icon]) => <Link key={label} href={href} className="group flex items-start gap-4 rounded-2xl border border-brown-100 bg-white p-5 transition hover:border-saffron-400 hover:shadow-sm"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-saffron-50 text-saffron-700"><Icon size={21}/></span><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><h3 className="font-semibold">{label}</h3><span className="rounded-full bg-brown-50 px-2.5 py-1 text-sm font-bold">{loading ? '…' : count || 0}</span></div><p className="mt-2 text-sm text-brown-500">{description}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-saffron-700">Open queue<ArrowRight size={13}/></span></div></Link>)}</div></section>
    <section className="mt-8"><h2 className="mb-4 text-xl font-semibold">Daily operations</h2><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[[ClipboardList, 'Daily charts', '/staff/charts'], [CalendarDays, 'Bookings', '/staff/directory/bookings'], [Users, 'User directory', '/staff/directory/users'], ...(canUseStaff(user, 'accountant') ? [[Landmark, 'Payouts & bank files', '/staff/payouts']] : [])].map(([Icon, label, href]) => <Link key={href} href={href} className="flex items-center gap-3 rounded-xl border border-brown-100 bg-white p-4 text-sm font-semibold"><Icon size={18} className="text-brown-500"/>{label}<ArrowRight size={14} className="ml-auto text-brown-500"/></Link>)}</div></section>
  </StaffShell>
}
