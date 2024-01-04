"use client";
import React, { useEffect, useState } from "react";
import { HiUsers } from "react-icons/hi2";
import { MdTempleBuddhist } from "react-icons/md";
import { FaServicestack } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { CiLogout } from "react-icons/ci";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SideBar = ({ children }) => {
  const router = useRouter();
  const arr = [
    { icon: HiUsers, name: "Users", link: "/admin/users" },
    { name: "Temples", icon: MdTempleBuddhist, link: "/admin/temples" },
    { name: "Services", icon: FaServicestack, link: "/admin/services" },
    {
      name: "Withdraw forms",
      icon: FcMoneyTransfer,
      link: "/admin/withdraw-forms",
    }
    ];
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  const signOutHandel = async () => {
    await signOut();
    router.push("/admin/login");
  };

  return (
    <div className="flex">
      <div className="h-screen bg-primary w-64 pt-10 p-2  sticky top-0 ">
        {arr.map((item) => (
          <button
           type="button"
           onClick={()=>router.push(item.link)}
            key={item.name}
            className={`${
              window?.location?.pathname === item.link ? "bg-white text-black " : "text-white  "
            }flex  text-center w-full p-3 cursor-pointer mt-5  hover:text-black font-semibold  hover:bg-white rounded-lg`}
          >
            <div className="mr-3 ml-2 ">
              {React.createElement(item.icon, { size: "20" })}
            </div>
            <p>{item.name}</p>
          </button>
        ))}
        <div
          onClick={signOutHandel}
          className={`flex  text-center p-3 cursor-pointer mt-5 text-white hover:text-black font-semibold  hover:bg-white rounded-lg`}
        >
          <div className="mr-3 ml-2 ">
            {React.createElement(CiLogout, { size: "20" })}
          </div>
          <p>Log Out</p>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default SideBar;
