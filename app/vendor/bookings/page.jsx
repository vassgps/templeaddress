import { Suspense } from 'react'
import { VBookings } from '@/components/pages/vendor'
export default function Page(props) { return <Suspense fallback={null}><VBookings {...props}/></Suspense> }