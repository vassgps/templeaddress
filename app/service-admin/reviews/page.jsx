import { Suspense } from 'react'
import { SReviews } from '@/components/pages/vendorService'
export default function Page(props) { return <Suspense fallback={null}><SReviews {...props}/></Suspense> }