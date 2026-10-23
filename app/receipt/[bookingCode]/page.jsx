import { Suspense } from 'react'
import { BookingReceipt } from '@/components/pages/booking'
export const metadata = { title: 'Booking Receipt', robots: { index: false, follow: false, nocache: true } }
export default function Page(props) { return <Suspense fallback={null}><BookingReceipt {...props}/></Suspense> }
