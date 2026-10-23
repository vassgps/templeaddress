import { Suspense } from 'react'
import { SQueues } from '@/components/pages/partners'
export const metadata = { title: 'Staff Dashboard' }
export default function Page(props) { return <Suspense fallback={null}><SQueues {...props}/></Suspense> }