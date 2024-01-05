import PublicRoute from "@/components/auth/authenticationRoute/PublicRoute";
import React from "react";
import dynamic from 'next/dynamic'
const ForgottenPassword = dynamic(() => import('@/components/ForgottenPassword/ForgottenPassword'))
import Navbar from "@/components/layout/navbar/Navbar";
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))


const page = () => {
  return (
    <PublicRoute>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="main lg:mx-40 mx-5 mb-10">
          <ForgottenPassword />
        </div>
        <Footer />
      </div>
    </PublicRoute>
  );
};

export default page;
