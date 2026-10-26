import { Suspense } from 'react'
import { FSponsors } from '@/components/pages/vendorFestival'
export default function Page(props) { return <Suspense fallback={null}><FSponsors {...props}/></Suspense> }