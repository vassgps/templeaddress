import { Suspense } from 'react'
import { AEditListing } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><AEditListing {...props}/></Suspense> }