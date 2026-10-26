import { Suspense } from 'react'
import { DProfile } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><DProfile {...props}/></Suspense> }