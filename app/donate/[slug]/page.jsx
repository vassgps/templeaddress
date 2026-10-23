import { Suspense } from 'react'
import { Donate } from '@/components/pages/public'
export default function Page(props) { return <Suspense fallback={null}><Donate {...props}/></Suspense> }