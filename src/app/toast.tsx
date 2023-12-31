"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ToastConfig = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  return <ToastContainer />;
};

export default ToastConfig;
