import { Suspense } from 'react'
import { AProfile } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><AProfile {...props}/></Suspense> }