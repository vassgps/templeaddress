import { Suspense } from 'react'
import { SSponsors } from '@/components/pages/partners'
export const metadata = { title: 'Sponsors' }
export default function Page(props) { return <Suspense fallback={null}><SSponsors {...props}/></Suspense> }