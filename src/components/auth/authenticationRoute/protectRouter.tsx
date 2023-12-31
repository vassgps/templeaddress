
"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

 function ProtectRouter({ children }: { children: ReactNode }) {
  const router = useRouter();
 const token=typeof window !== "undefined"?localStorage.getItem("access_token"):null
  useEffect(() => {
    const checkToken = async () => {
      if (typeof window !== "undefined") {
        if (!token) {
          await router.push("/login");
        }
      }
    };

    checkToken();
  }, [token]);

  return <>{children}</>;
}

export default ProtectRouter;
