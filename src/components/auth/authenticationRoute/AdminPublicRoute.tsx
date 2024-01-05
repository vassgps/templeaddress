"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

 function AdminPublicRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token=typeof window !== "undefined"?localStorage.getItem("access_token"):null
  const role=typeof window !== "undefined"?localStorage.getItem("role"):null
  const key=process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET

  useEffect(() => {
    const checkToken = async () => {
      if (token&& role==="admin_role_"+key) {
        await router.push("/admin/users");
      }
    };
    checkToken();
  }, [token,role,key]);

  return <>{children}</>;
}

export default AdminPublicRoute;
