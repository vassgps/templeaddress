'use client'
import { DashShell } from '@/components/ui'
import { useSearchParams } from 'next/navigation'
import {
  LayoutDashboard, ClipboardList, UserCheck, BarChart2, Sparkles,
  Banknote, ArrowDownToLine, Landmark, Users, Database, Settings,
  Bell, ShieldCheck, FileText, Globe2, Package, CreditCard, Archive,
  TrendingUp, Key, Wallet
} from 'lucide-react'

const moderatorItems = [
  { group: 'Moderator', collapsible: false, primary: true, links: [
    ['/staff?role=moderator',   'Dashboard',  LayoutDashboard],
    ['/staff/listing?role=moderator', 'Listings', ClipboardList],
    ['/staff/kyc?role=moderator',     'KYC',     UserCheck],
    ['/staff/charts?role=moderator',  'Charts',  BarChart2],
    ['/staff/special?role=moderator', 'Special poojas', Sparkles],
    ['/staff/ownership?role=moderator','Ownership', Landmark],
    ['/staff/support?role=moderator', 'Support', ClipboardList],
    ['/staff/directory/bookings?role=moderator','Bookings directory', Database],
  ]},
]
const accountantItems = [
  { group: 'Accountant', collapsible: false, primary: true, links: [
    ['/staff?role=accountant',  'Dashboard',  LayoutDashboard],
    ['/staff/payouts?role=accountant',     'Payouts',    Banknote],
    ['/staff/withdrawals?role=accountant', 'Withdrawals', ArrowDownToLine],
    ['/staff/sponsors?role=accountant',    'Sponsors',   Sparkles],
  ]},
]
const adminItems = [
  { group: 'Admin', collapsible: false, primary: true, links: [
    ['/staff?role=admin',       'Dashboard',  LayoutDashboard],
    ['/staff/analytics?role=admin','Analytics', TrendingUp],
    ['/staff/tables?role=admin','Tables',     Database],
  ]},
  { group: 'Configuration', defaultOpen: false, links: [
    ['/staff/staff-management?role=admin', 'Staff',       Users],
    ['/staff/masterdata?role=admin',       'Master data', Settings],
    ['/staff/gateway-config?role=admin',   'Gateways',    Key],
    ['/staff/plans?role=admin',            'Plans',       Package],
    ['/staff/config?role=admin',           'Config',      Settings],
    ['/staff/branding?role=admin',         'Branding',    Globe2],
    ['/staff/notifications?role=admin',    'Notifications',Bell],
    ['/staff/audit-logs?role=admin',       'Audit logs',  FileText],
    ['/staff/backup?role=admin',           'Backup',      Archive],
    ['/staff/wallet-credit?role=admin',    'Wallet credit',Wallet],
  ]},
]

export default function StaffLayout({ children }) {
  const sp = useSearchParams()
  const role = sp.get('role') || 'admin'
  const items = role === 'moderator' ? moderatorItems : role === 'accountant' ? accountantItems : adminItems
  const label = role === 'moderator' ? 'Moderator' : role === 'accountant' ? 'Accountant' : 'Portal Admin'
  return <DashShell role={label} user="Staff" items={items} badge="5">{children}</DashShell>
}
