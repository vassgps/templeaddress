import { Suspense } from 'react'
import { FOverview } from '@/components/pages/vendorFestival'
export default function Page(props) { return <Suspense fallback={null}><FOverview {...props}/></Suspense> }