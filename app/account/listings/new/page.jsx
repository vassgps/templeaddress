import { Suspense } from 'react'
import { UserCreateListing } from '@/components/pages/account'
export const metadata = { title: 'Create Listing' }
export default function Page(props) { return <Suspense fallback={null}><UserCreateListing {...props}/></Suspense> }