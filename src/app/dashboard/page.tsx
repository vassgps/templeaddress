
import React from "react";
import ProtectRouter from "@/components/auth/authenticationRoute/protectRouter";
import dynamic from 'next/dynamic'
import Navbar from "@/components/layout/navbar/Navbar";
const Dashboard = dynamic(() => import('@/components/dashboard/Dashboard'))
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))

const page = ({searchParams}) => {
  return (
    <ProtectRouter>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className=" lg:mx-40 mx-5 mt-7 mb-10">
      <Dashboard service={false} search={searchParams?.search||""} />
      </div>
      <Footer />
    </div>
    </ProtectRouter>
  );
};

export default page;
