import { Suspense } from 'react'
import { DPartners } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><DPartners {...props}/></Suspense> }