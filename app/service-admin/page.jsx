import { Suspense } from 'react'
import { SSummary } from '@/components/pages/vendorService'
export default function Page(props) { return <Suspense fallback={null}><SSummary {...props}/></Suspense> }