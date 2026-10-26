import { Suspense } from 'react'
import { ASubmit } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><ASubmit {...props}/></Suspense> }