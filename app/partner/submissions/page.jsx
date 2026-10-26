import { Suspense } from 'react'
import { ASubmissions } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><ASubmissions {...props}/></Suspense> }