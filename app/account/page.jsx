import { Suspense } from 'react'
import { Account } from '@/components/pages/account'
export const metadata = { title: 'My Account' }
export default function Page(props) { return <Suspense fallback={null}><Account {...props}/></Suspense> }