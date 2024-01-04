"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLock, FaLockOpen } from "react-icons/fa";

import login_img from "../../../assets/login_img.jpg";
import Styles from "./login.module.css";
import { loginValiDate } from "@/utils/formValidate";
import { errorToast, successToast } from "@/toasts/toasts";
import Http from "@/config/Http";

const Login = ({admin}:{admin?:boolean}) => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show_password, setShowPassword] = useState(false);

  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email_err: "",
    password_err: "",
    common_err: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    loginValiDate({ ...formData, [name]: value }, setFormError, formError);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    // const checkValid: boolean = await loginValiDate(
    //   formData,
    //   setFormError,
    //   formError
    // );
    const checkValid=true
    if (checkValid) {
      setLoading(true);
        const {data} = await Http.post(`user/login/`, formData)        
        if (data.success) {
          successToast("Logged successfully");
          localStorage.clear();
          setLoading(false);                    
            if(data.data.scope== 2||data.data.scope== 3){              
              localStorage.setItem("access_token",data.access_token)
              localStorage.setItem("refresh_token",data.refresh_token)
              localStorage.setItem("role",`admin_role_${process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET}`)
              router.push("/admin/users")
            }else{
              localStorage.setItem("role","user_role")
              localStorage.setItem("access_token",data.access_token)
              localStorage.setItem("refresh_token",data.refresh_token)
              router.push("/")
            }
        } else {
          setLoading(false);
          errorToast(data.data.error)
          setFormError({
            ...formError,
            common_err: data.data.error,
          });
        }
    } else {
      setFormError({
        ...formError,
        common_err: "Please enter your details",
      });
    }
  };

  return (
    <>
      <section className="flex relative w-full h-[100vh] ">
        <div className="relative w-[130vh]  h-[20%] md:h-[100vh] hidden md:block">
          <Image
            alt="Login"
            src={login_img}
            width={1000}
            height={1000}
            className={`${Styles["img-box"]} rounded-r-3xl absolute top-0 left-0 w-full h-full object-cover`}
          />
        </div>
        <div
          className={`flex w-full md:w-[80%] h-[100%] justify-center items-center `}
        >
          <div className="w-full lg:px-[50px]">
            <div
              className={`${Styles["form-box"]} flex flex-col justify-center items-center m-auto`}
            >
              <h1 className="text-[30px] font-bold text-primary mb-5">
                TempleAddress
              </h1>
              <h2 className="text-[30px] font-bold text-[#000] mb-4 ">
                {admin && "Admin "}Login
              </h2>
            </div>
            <form action="" className="px-5">
              <div className="mb-5">
                <span>Email or Phone number</span>
                <input
                  type="text"
                  name="identifier"
                  id="identifier"
                  className="w-full py-3 pl-4 outline-none border border-[#00000052] text-[#000] rounded-lg mt-2"
                  placeholder="Enter your email"
                  required
                  onChange={handleChange}
                  value={formData.identifier}
                />
                {submit && (
                  <span className="text-[red] text-[13px]">
                    {formError.email_err}
                  </span>
                )}
              </div>
              <span>Password</span>
              <div className="w-full flex bg-white border border-[#00000052] text-[#000] rounded-lg mt-2">
                <input
                  type={`${!show_password ? "password" : "text"}`}
                  name="password"
                  id="password"
                  className="outline-none pl-4  py-3 w-full  rounded-lg "
                  placeholder=" Enter your password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
                <button
                  type="button"
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    setShowPassword(!show_password);
                  }}
                >
                  {show_password ? <FaLockOpen /> : <FaLock />}
                </button>
              </div>
              {submit && (
                <span className="text-[red] text-[13px]">
                  {formError.password_err}
                </span>
              )}

              {!admin && (
                <div className="mt-2 text-left text-blue-500 underline">
                  <Link href="/forgotten-password">Forgotten password?</Link>
                </div>
              )}

              <div className="mt-4 flex justify-center items-center">
                <div className="flex-row">
                  {submit && (
                    <span className="text-[red] block text-center text-sm">
                      {formError.common_err}
                    </span>
                  )}
                  {loading ? (
                    <button
                      type="button"
                      className="py-[8px] mt-5    font-semibold text-[#fff] px-36 bg-primary rounded-[10px] hover:opacity-75"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#1C64F2"
                        />
                      </svg>
                      Loading...
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="py-[9px] font-semibold mt-5 text-[#fff] px-[150px] bg-primary rounded-[10px]"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>

              {!admin && (
                <div className="mt-3 text-center text-blue-500 underline">
                  <Link href="/signup">Create an Account?</Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
