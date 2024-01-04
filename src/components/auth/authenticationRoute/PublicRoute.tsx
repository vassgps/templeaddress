"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

 function PublicRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token=typeof window !== "undefined"?localStorage.getItem("access_token"):null
  const role=typeof window !== "undefined"?localStorage.getItem("role"):null

  useEffect(() => {
    const checkToken = async () => {
      if (typeof window !== "undefined") {
      if (token&& role==="user_role") {
        await router.push("/");
      }
    }
    };
    checkToken();
  }, [role,token]);

  return <>{children}</>;
}

export default PublicRoute;
