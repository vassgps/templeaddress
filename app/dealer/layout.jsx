'use client'
import { DashShell } from '@/components/ui'
import { LayoutDashboard, Wallet, User, Users } from 'lucide-react'

const items = [{ group: 'Dealer', collapsible: false, primary: true, links: [
  ['/dealer',           'Dashboard', LayoutDashboard],
  ['/dealer/wallet',    'Wallet',    Wallet],
  ['/dealer/profile',   'Profile',   User],
  ['/dealer/partners',  'Partners',  Users],
]}]

export default function DealerLayout({ children }) {
  return <DashShell role="Dealer" user="Dealer" items={items}>{children}</DashShell>
}
