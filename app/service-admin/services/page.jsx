import { Suspense } from 'react'
import { SServices } from '@/components/pages/vendorService'
export default function Page(props) { return <Suspense fallback={null}><SServices {...props}/></Suspense> }