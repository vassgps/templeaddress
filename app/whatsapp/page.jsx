import { Suspense } from 'react'
import { WhatsApp } from '@/components/pages/public'
export const metadata = { title: 'Book on WhatsApp' }
export default function Page(props) { return <Suspense fallback={null}><WhatsApp {...props}/></Suspense> }