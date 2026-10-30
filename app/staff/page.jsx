import { Suspense } from 'react'
import StaffDashboard from '@/components/phase1/StaffDashboard'
export const metadata = { title: 'Staff Dashboard' }
export default function Page() { return <Suspense fallback={null}><StaffDashboard/></Suspense> }
