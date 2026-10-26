import { Suspense } from 'react'
import { FPage } from '@/components/pages/vendorFestival'
export default function Page(props) { return <Suspense fallback={null}><FPage {...props}/></Suspense> }