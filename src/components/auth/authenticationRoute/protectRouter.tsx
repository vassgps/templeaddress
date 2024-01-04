"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ProtectRouter({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null
  );
  const [role, setRole] = useState(
    typeof window !== "undefined" ? localStorage.getItem("role") : null
  );

  useEffect(() => {
    const checkToken = async () => {
      if (typeof window !== "undefined") {
        if (!token || role != "user_role") {
          setRole(localStorage.getItem("role"));
          setToken(localStorage.getItem("access_token"));
          await router.push("/login");
        }
      }
    };
    checkToken();
  }, [role,token]);
  if (token && role != "user_role") {
    return <>{children}</>;
  } 
}

export default ProtectRouter;
