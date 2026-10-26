import { Suspense } from 'react'
import { SListing } from '@/components/pages/partners'
export const metadata = { title: 'Listing Queue' }
export default function Page(props) { return <Suspense fallback={null}><SListing {...props}/></Suspense> }