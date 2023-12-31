import AdminProtectRouter from '@/components/auth/authenticationRoute/AdminProtectRouter'
const SideBar = dynamic(() => import('@/components/admin/side-bar/SideBar'))
import React from 'react'
import dynamic from 'next/dynamic'
const TempleTable = dynamic(() => import('@/components/admin/templeTable/TempleTable'))
const page = ({searchParams}) => {
  return (
    <AdminProtectRouter>

    <SideBar>
      <TempleTable search={searchParams?.search||""}/>
    </SideBar>
    </AdminProtectRouter>
  )
}

export default page
