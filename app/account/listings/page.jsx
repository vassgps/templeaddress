import { Suspense } from 'react'
import { UserListings } from '@/components/pages/account'
export const metadata = { title: 'My Listings' }
export default function Page(props) { return <Suspense fallback={null}><UserListings {...props}/></Suspense> }