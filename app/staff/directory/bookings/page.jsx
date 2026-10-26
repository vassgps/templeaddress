import { Suspense } from 'react'
import { StaffBookingsDirectory } from '@/components/pages/staffDirectory'
export default function Page(props) { return <Suspense fallback={null}><StaffBookingsDirectory {...props}/></Suspense> }