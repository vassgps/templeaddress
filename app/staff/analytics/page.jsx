import { Suspense } from 'react'
import { SAnalytics } from '@/components/pages/partners'
export const metadata = { title: 'Analytics' }
export default function Page(props) { return <Suspense fallback={null}><SAnalytics {...props}/></Suspense> }