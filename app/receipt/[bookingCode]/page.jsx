import { Suspense } from 'react'
import { BookingReceipt } from '@/components/pages/booking'
export default function Page(props) { return <Suspense fallback={null}><BookingReceipt {...props}/></Suspense> }