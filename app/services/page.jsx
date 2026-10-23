import { Suspense } from 'react'
import { Services } from '@/components/pages/public'
export const metadata = { title: 'Service Professionals' }
export default function Page(props) { return <Suspense fallback={null}><Services {...props}/></Suspense> }