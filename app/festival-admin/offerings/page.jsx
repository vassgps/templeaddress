import { Suspense } from 'react'
import { FOfferings } from '@/components/pages/vendorFestival'
export default function Page(props) { return <Suspense fallback={null}><FOfferings {...props}/></Suspense> }