import { Suspense } from 'react'
import { VDonations } from '@/components/pages/vendor'
export default function Page(props) { return <Suspense fallback={null}><VDonations {...props}/></Suspense> }