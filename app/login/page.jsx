import { Suspense } from 'react'
import { Login } from '@/components/pages/public'
export const metadata = { title: 'Login', robots: { index: false, follow: false } }
export default function Page(props) { return <Suspense fallback={null}><Login {...props}/></Suspense> }
