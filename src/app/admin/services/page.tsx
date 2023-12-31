import AdminProtectRouter from '@/components/auth/authenticationRoute/AdminProtectRouter'
import React from 'react'
import dynamic from 'next/dynamic'
const ServicesTable = dynamic(() => import('@/components/admin/servicesTable/ServiceTable'))
const SideBar = dynamic(() => import('@/components/admin/side-bar/SideBar'))

const page = ({searchParams}) => {
  return (
    <AdminProtectRouter>
    <SideBar>
      <ServicesTable  search={searchParams?.search||""}/>
    </SideBar>
    </AdminProtectRouter>
  )
}

export default page
