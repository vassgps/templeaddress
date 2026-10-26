import { Suspense } from 'react'
import { VChartDetail } from '@/components/pages/vendor'
export default function Page(props) { return <Suspense fallback={null}><VChartDetail {...props}/></Suspense> }