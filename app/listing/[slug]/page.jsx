import { Suspense } from 'react'
import { TemplePage } from '@/components/pages/public'
export default function Page(props) { return <Suspense fallback={null}><TemplePage {...props}/></Suspense> }