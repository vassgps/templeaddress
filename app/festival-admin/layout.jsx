'use client'
import { DashShell } from '@/components/ui'
import { LayoutDashboard, CalendarDays, Gift, BookOpen, Sparkles, Globe2, Settings } from 'lucide-react'

const items = [{ group: 'Festival', collapsible: false, primary: true, links: [
  ['/festival-admin',             'Overview',    LayoutDashboard],
  ['/festival-admin/programme',   'Programme',   CalendarDays],
  ['/festival-admin/offerings',   'Offerings',   Gift],
  ['/festival-admin/bookings',    'Bookings',    BookOpen],
  ['/festival-admin/sponsors',    'Sponsors',    Sparkles],
  ['/festival-admin/profile',     'Festival page', Globe2],
  ['/festival-admin/settings',    'Settings',    Settings],
]}]

export default function FestivalAdminLayout({ children }) {
  return <DashShell role="Festival Committee" user="Festival Convenor" items={items}>{children}</DashShell>
}
