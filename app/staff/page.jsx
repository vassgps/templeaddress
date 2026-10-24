import { Suspense } from 'react'
import { StaffReviews } from '@/components/phase1/Staff'
export const metadata = { title: 'Staff Dashboard' }
export default function Page() { return <Suspense fallback={null}><StaffReviews/></Suspense> }
