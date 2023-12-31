"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

 function PublicRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token=typeof window !== "undefined"?localStorage.getItem("access_token"):null

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        await router.push("/");
      }
    };
    checkToken();
  }, [token]);

  return <>{children}</>;
}

export default PublicRoute;
