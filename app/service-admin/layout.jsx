'use client'
import { DashShell } from '@/components/ui'
import { LayoutDashboard, CalendarDays, Briefcase, MessageSquare, Star, User } from 'lucide-react'

const items = [{ group: 'Service Provider', collapsible: false, primary: true, links: [
  ['/service-admin',              'Summary',     LayoutDashboard],
  ['/service-admin/appointments', 'Appointments', CalendarDays],
  ['/service-admin/services',     'Services',    Briefcase],
  ['/service-admin/enquiries',    'Enquiries',   MessageSquare],
  ['/service-admin/reviews',      'Reviews',     Star],
  ['/service-admin/profile',      'Profile & page', User],
]}]

export default function ServiceAdminLayout({ children }) {
  return <DashShell role="Service Provider" user="Provider" items={items}>{children}</DashShell>
}
