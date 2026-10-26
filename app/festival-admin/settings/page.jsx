import { Suspense } from 'react'
import { FSettings } from '@/components/pages/vendorFestival'
export default function Page(props) { return <Suspense fallback={null}><FSettings {...props}/></Suspense> }