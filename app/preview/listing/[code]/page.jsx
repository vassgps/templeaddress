import { Suspense } from 'react'
import ListingPreview from '@/components/pages/listingPreview'
export default function Page(props) { return <Suspense fallback={null}><ListingPreview {...props}/></Suspense> }