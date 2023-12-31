import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import {User} from "@/models/interfaces"
import React, { ReactNode } from "react";
async function AdminPublicRoute({ children }:{children: ReactNode}){
const session = await auth();

  if (session && (session?.user as User) && (session?.user as User)?.accessToken) {    
    if((session?.user as User)?.role==="adminRole"){
      return redirect("/admin/users");
    } 
  }
  return <>{children}</>;
};

export default AdminPublicRoute;
