import { Suspense } from 'react'
import { SStaffManagement } from '@/components/pages/partners'
export const metadata = { title: 'Staff Management' }
export default function Page(props) { return <Suspense fallback={null}><SStaffManagement {...props}/></Suspense> }