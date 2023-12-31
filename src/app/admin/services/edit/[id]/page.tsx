import AdminProtectRouter from "@/components/auth/authenticationRoute/AdminProtectRouter";
import React from "react";
import dynamic from 'next/dynamic'
const ServiceForm = dynamic(() => import('@/components/serviceForm/ServiceForm'))
const SideBar = dynamic(() => import('@/components/admin/side-bar/SideBar'))

const page = ({ params }) => {
  return (
    <AdminProtectRouter>
      <SideBar>
        <div className="mx-5">
        <ServiceForm id={params.id} admin={true}  />
        </div>
      </SideBar>
    </AdminProtectRouter>
  );
};

export default page;
