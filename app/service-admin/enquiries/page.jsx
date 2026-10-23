import { Suspense } from 'react'
import { SEnquiries } from '@/components/pages/vendorService'
export default function Page(props) { return <Suspense fallback={null}><SEnquiries {...props}/></Suspense> }