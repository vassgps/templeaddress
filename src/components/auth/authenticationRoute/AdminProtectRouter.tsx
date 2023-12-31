import { auth } from '@/config/auth';
import { redirect } from 'next/navigation';
import React, { ReactNode } from "react";
import {User} from "@/models/interfaces"

async function AdminProtectRouter({ children }:{children: ReactNode})  {  
  const session = await auth();   
  if(!session || !(session?.user as User)||(session?.user as User)?.role!=="adminRole") {
    return redirect("/admin/login")
  }
  if(session && (session?.user as User) && (session?.user as User)?.accessToken && (session?.user as User)?.role==="adminRole")  return <>{children}</>;else return redirect("/admin/login")

}

export default AdminProtectRouter;