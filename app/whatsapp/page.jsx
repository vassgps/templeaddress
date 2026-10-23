import { Suspense } from 'react'
import { WhatsApp } from '@/components/pages/public'
export const metadata = { title: 'Book Pooja on WhatsApp', description: 'Use TempleAddress on WhatsApp to find temples and book poojas.', alternates: { canonical: '/whatsapp' } }
export default function Page(props) { return <Suspense fallback={null}><WhatsApp {...props}/></Suspense> }
