"use client";
import React, {  useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLock, FaLockOpen } from "react-icons/fa";

import Styles from "./register.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { registerValiDate } from "@/utils/formValidate";
import { errorToast, successToast } from "@/toasts/toasts";
import Http from "@/config/Http";

const Signup = () => {
  const searchParams = useSearchParams()
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 
  const referralCode = searchParams.get('referralCode')
  const [show_password, setShowPassword] = useState(false);

  
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
    mobile_number:"",
    referred_by:"",
  });


  const [formError, setFormError] = useState({
    first_name_err: "",
    email_err: "",
    mobile_number_err: "",
    password_err: "",
    referred_by_err: "",
    common_err: "",
  });

  useEffect(()=>{
    if(referralCode&& referralCode!=undefined){
      setFormData((prevFormData) => ({
        ...prevFormData,
        referred_by:referralCode,
      }));
    }
  },[referralCode])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    registerValiDate({...formData,[name]: value}, setFormError, formError);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    const Valid= registerValiDate(formData, setFormError, formError);

    if (Valid) {
      setLoading(true)
      const {data} = await Http.post(`user/register/`, {...formData,status:true}) 
      setLoading(false)
      if (data?.success) {
          successToast("Registration Successful, Please Login")
          router.push("/login")
      }else{        
        const updatedFormError = { ...formError };

        for (const key in data.data.error) {
          if (updatedFormError.hasOwnProperty(`${key}_err`)) {
            updatedFormError[`${key}_err`] = data.data.error[key];
          }
        }
        setFormError(updatedFormError);
        if (data?.error) {
          errorToast(data.data.error)
          setFormError({
            ...formError,
            common_err: data.data.error,
          });
          }       
      }
    } else {
      setFormError({
        ...formError,
        common_err: "Please enter your details",
      });
    }
  };

  return (
    <section className="flex relative w-full h-[100vh] ">
      <div
        className={`${Styles["image-div"]} relative  w-[130vh] h-[20%] md:h-[100vh] hidden md:block`}
      >
        <Image
          src='https://antiquebetabucket.s3.ap-south-1.amazonaws.com/file1704350565121'
          width={1000}
          alt="image"
          height={1000}
          className={`${Styles["img-box"]} rounded-r-3xl absolute top-0 left-0 w-full h-full object-cover`}
        />
      </div>
      <div
        className={`${Styles["container"]} overflow-auto w-full md:w-[80%] p-5  lg:p-[60px] `}
      >
        <div className={`${Styles["form-box"]} m-auto flex justify-center `}>
          <h1 className="text-[27px] flex font-bold text-primary text-center mb-6 lg:mt-0 mt-6">
            TempleAddress{" "}
            <p className="text-[27px] flex font-bold text-[#000] ml-2 text-center mb-6 ">
              Register
            </p>
          </h1>
        </div>
          <div className="mb-3">
            <label className="mb-2 block font-medium ">Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="w-full py-3 pl-4 outline-none border border-[#00000052] text-[#000] rounded-[6px]"
              placeholder="Enter Your Name"
              onChange={handleChange}
              value={formData.first_name}
            />
            {submit && (
              <span className="text-[red] text-[13px]">
                {formError.first_name_err}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2 block">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full py-3 pl-4 outline-none border border-[#00000052] text-[#000] rounded-[6px]"
              placeholder="Enter Your Email"
              onChange={handleChange}
              value={formData.email}
            />
            {submit && (
              <span className="text-[red] text-[13px]">
                {formError.email_err}
              </span>
            )}
          </div>

          

          <div className="mb-3">
            <label className="mb-2 block font-medium">Mobile Number</label>
            <input
              type="number"
              name="mobile_number"
              id="mobile_number"
              className="w-full py-3 pl-4 outline-none border border-[#00000052] text-[#000] rounded-[6px]"
              placeholder="Enter Your Mobile Number"
              onChange={handleChange}
              value={formData.mobile_number}
            />
            {submit && (
              <span className="text-[red] text-[13px]">
                {formError.mobile_number_err}
              </span>
            )}
          </div>
          <span>Password</span>
            <div className="w-full flex bg-white border border-[#00000052] text-[#000] rounded-[6px] mt-2">
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
              onClick={() => {setShowPassword(!show_password);}}>
              {show_password ? <FaLockOpen /> : <FaLock />}
            </button>
            </div>
              {submit && (
                <span className="text-[red] text-[13px]">
                  {formError.password_err}
                </span>
              )}

          <div className="mb-3 mt-4"> 
            <label className="mb-2  font-medium flex ">referrer id <p className="text-slate-400">  (optional)</p> </label>
            <input
              type="text"
              name="referred_by"
              id="referred_by"
              onChange={handleChange}
              className="w-full py-3 pl-4 outline-none border border-[#00000052] text-[#000] rounded-[6px]"
              placeholder=" Enter your referrer id"
              value={formData.referred_by}
            />
            {submit && (
              <span className="text-[red] text-[13px]">
                {formError.referred_by_err}
              </span>
            )}
          </div>

          <div className="mt-5 flex justify-center items-center">
            <div className="grid grid-cols-1 ">
              {submit && (
                <span className="text-[red] block text-center text-sm">
                  {formError.common_err}
                </span>
              )}
             {loading? <button
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
              </button>:<button
                type="button"
                className="py-[9px] mt-5 font-semibold text-[#fff] px-36 bg-primary rounded-[10px]"
                onClick={handleSubmit}
              >
                Register
              </button>}
            </div>
          </div>
          <div className="mt-2 text-center ">
            Already a member?
            <Link href="/login" className="underline text-blue-500">
              Login
            </Link>
          </div>
      </div>
    </section>
  );
};

export default Signup;
