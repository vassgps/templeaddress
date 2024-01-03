"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

 function AdminProtectRouter({ children }: { children: ReactNode }) {
  const router = useRouter();
 const token=typeof window !== "undefined"?localStorage.getItem("access_token"):null
 const role=typeof window !== "undefined"?localStorage.getItem("role"):null
 const key=process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET

  useEffect(() => {
    const checkToken = async () => {
      if (typeof window !== "undefined") {
        if (!token ||role!="admin_role_"+key) {
          await router.push("/admin/login");
        }
      }
    };
    checkToken();
  }, [token,role,key]);
  return <>{children}</>;
}

export default AdminProtectRouter;
