import { Suspense } from 'react'
import { FBookings } from '@/components/pages/vendorFestival'
export default function Page(props) { return <Suspense fallback={null}><FBookings {...props}/></Suspense> }