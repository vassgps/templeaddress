import AdminProtectRouter from "@/components/auth/authenticationRoute/AdminProtectRouter";
import React from "react";
import dynamic from 'next/dynamic'
const EditTempleForm = dynamic(() => import('@/components/temple/editTempleForm/EditTempleForm'))
const SideBar = dynamic(() => import('@/components/admin/side-bar/SideBar'))

const page = ({ params }) => {
  return (
    <AdminProtectRouter>
      <SideBar>
        <div className="mx-5">
          <EditTempleForm id={params.id} admin={true} />
        </div>
      </SideBar>
    </AdminProtectRouter>
  );
};

export default page;
