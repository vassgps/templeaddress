import AdminProtectRouter from '@/components/auth/authenticationRoute/AdminProtectRouter'
const SideBar = dynamic(() => import('@/components/admin/side-bar/SideBar'))

import React from 'react'
import dynamic from 'next/dynamic'
const UserTable = dynamic(() => import('@/components/admin/userTable/UserTable'))
const page =({searchParams}) => {
  return (
    <AdminProtectRouter>
    <SideBar>
      <UserTable search={searchParams?.search||""}/>
    </SideBar>
    </AdminProtectRouter>
  )
}

export default page
