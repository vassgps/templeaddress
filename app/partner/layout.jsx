'use client'
import { DashShell } from '@/components/ui'
import { Wallet, User, Building2, Share2, Send, ClipboardList } from 'lucide-react'

const items = [{ group: 'Partner', collapsible: false, primary: true, links: [
  ['/partner',             'Wallet',      Wallet],
  ['/partner/profile',     'Profile',     User],
  ['/partner/listings',    'Listings',    Building2],
  ['/partner/share',       'Share',       Share2],
  ['/partner/submit',      'Submit',      Send],
  ['/partner/submissions', 'Submissions', ClipboardList],
]}]

export default function PartnerLayout({ children }) {
  return <DashShell role="Field Partner" user="Partner" items={items}>{children}</DashShell>
}
