'use client'
import { DashShell } from '@/components/ui'
import { LayoutDashboard, CalendarDays, BarChart2, BookOpen, HeartHandshake, Banknote, Settings, PenLine, Database } from 'lucide-react'

const items = [{ group: 'Temple', collapsible: false, primary: true, links: [
  ['/vendor',           'Today',       LayoutDashboard],
  ['/vendor/bookings',  'Bookings',    CalendarDays],
  ['/vendor/charts',    'Charts',      BarChart2],
  ['/vendor/poojas',    'Poojas & prices', BookOpen],
  ['/vendor/donations', 'Donations',   HeartHandshake],
  ['/vendor/payouts',   'Payouts',     Banknote],
  ['/vendor/settings',  'Settings',    Settings],
  ['/vendor/editor',    'Page editor', PenLine],
  ['/vendor/data',      'My data',     Database],
]}]

export default function VendorLayout({ children }) {
  return <DashShell role="Temple Committee" user="Temple Admin" items={items} badge="3">{children}</DashShell>
}
