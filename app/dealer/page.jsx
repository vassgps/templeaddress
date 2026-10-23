import { Suspense } from 'react'
import { DDash } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><DDash {...props}/></Suspense> }