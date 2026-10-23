import { Suspense } from 'react'
import { Login } from '@/components/pages/public'
export const metadata = { title: 'Login' }
export default function Page(props) { return <Suspense fallback={null}><Login {...props}/></Suspense> }