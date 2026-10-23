import { Suspense } from 'react'
import { VCharts } from '@/components/pages/vendor'
export default function Page(props) { return <Suspense fallback={null}><VCharts {...props}/></Suspense> }