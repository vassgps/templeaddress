import AdminProtectRouter from "@/components/auth/authenticationRoute/AdminProtectRouter";
import React from "react";
import dynamic from 'next/dynamic'
const SideBar = dynamic(() => import('@/components/admin/side-bar/SideBar'))

const WithdrawFormTable = dynamic(() => import('@/components/admin/withdraw-form-table/WithdrawFormTable'))
const page = ({ searchParams }) => {
  return (
    <AdminProtectRouter>
      <SideBar>
        <WithdrawFormTable search={searchParams?.search||""} />
      </SideBar>
    </AdminProtectRouter>
  );
};

export default page;
