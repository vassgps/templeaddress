import { Suspense } from 'react'
import { AShare } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><AShare {...props}/></Suspense> }