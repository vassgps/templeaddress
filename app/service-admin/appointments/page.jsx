import { Suspense } from 'react'
import { SAppointments } from '@/components/pages/vendorService'
export default function Page(props) { return <Suspense fallback={null}><SAppointments {...props}/></Suspense> }