import { Suspense } from 'react'
import { Home } from '@/components/pages/public'
export default function Page(props) { return <Suspense fallback={null}><Home {...props}/></Suspense> }