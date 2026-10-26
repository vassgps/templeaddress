import { Suspense } from 'react'
import { SGatewayConfig } from '@/components/pages/partners'
export const metadata = { title: 'Gateway Config' }
export default function Page(props) { return <Suspense fallback={null}><SGatewayConfig {...props}/></Suspense> }