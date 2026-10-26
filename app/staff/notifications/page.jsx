import { Suspense } from 'react'
import { SNotifications } from '@/components/pages/partners'
export const metadata = { title: 'Notifications' }
export default function Page(props) { return <Suspense fallback={null}><SNotifications {...props}/></Suspense> }