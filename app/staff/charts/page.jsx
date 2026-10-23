import { Suspense } from 'react'
import { SCharts } from '@/components/pages/partners'
export const metadata = { title: 'Daily Charts' }
export default function Page(props) { return <Suspense fallback={null}><SCharts {...props}/></Suspense> }