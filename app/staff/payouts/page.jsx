import { Suspense } from 'react'
import { SPayouts } from '@/components/pages/partners'
export const metadata = { title: 'Payouts' }
export default function Page(props) { return <Suspense fallback={null}><SPayouts {...props}/></Suspense> }