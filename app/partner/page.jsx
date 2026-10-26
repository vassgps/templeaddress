import { Suspense } from 'react'
import { AWallet } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><AWallet {...props}/></Suspense> }