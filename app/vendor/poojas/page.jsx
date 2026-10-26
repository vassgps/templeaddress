import { Suspense } from 'react'
import { VPoojas } from '@/components/pages/vendor'
export default function Page(props) { return <Suspense fallback={null}><VPoojas {...props}/></Suspense> }