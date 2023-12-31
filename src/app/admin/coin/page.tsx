
import AdminProtectRouter from "@/components/auth/authenticationRoute/AdminProtectRouter";
import React from "react";
import dynamic from 'next/dynamic'
const Coin = dynamic(() => import('@/components/admin/coin/Coin'))
const SideBar = dynamic(() => import('@/components/admin/side-bar/SideBar'))

const page = async () => {
  
  return (
    <AdminProtectRouter>
      <SideBar>
        <div className="w-full flex mt-5 justify-center">
        <Coin />
        </div>
      </SideBar>
    </AdminProtectRouter>
  );
};

export default page;
