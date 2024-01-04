import { resetPasswordForm } from "@/utils/formValidate";
import React, {  useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Button from "../ui/button/Button";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { errorToast, successToast } from "@/toasts/toasts";
import Http from "@/config/Http";

const ResetPassword = ({ setOpen }) => {
  const [submit, setSubmit] = useState(false);
  const [show_password, setShowPassword] = useState(false);
  const [show_reset_password, setShowReset_password] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    new_password: "",
    old_password: "",
  });
  const [formError, setFormError] = useState({
    new_password_err: "",
    old_password_err: "",
    common_err: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    resetPasswordForm(
      { ...formData, [name]: value },
      setFormError,
      formError    );
  };

  const handleSubmit = async () => {
   const valid= resetPasswordForm(formData, setFormError, formError);
    setSubmit(true);
    if (valid) {
      setLoading(true);
      const {data}  = await Http.put("user/change-password/",formData);   
      console.log(data);
         
      if (data.success) {
        successToast("Password Reset successfully");
        setOpen(false);
      } else {
        console.log("koko");
        
        const updatedFormError = { ...formError };        
        for (const key in data.data.error) {
          if (updatedFormError.hasOwnProperty(`${key}_err`)) {            
            updatedFormError[`${key}_err`] = data.data.error[key];
          }
        }
        updatedFormError.common_err="Check your password, something is wrong. Please try again. "
        setFormError(updatedFormError)
      }
      setLoading(false);
    } else {
      errorToast("Please enter your details")
      setFormError({
        ...formError,
        common_err: "Please enter your details",
      });
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute md:w-1/3 border-2 border-primary rounded-xl p-5  overflow-y-auto overflow-x-hidden   bg-white  z-50 justify-center items-center w-full">
        <div className="flex text-primary cursor-pointer w-full justify-end">
          <span onClick={() => setOpen(false)}>
            {React.createElement(IoMdCloseCircle, { size: "30" })}
          </span>
        </div>
        <div className="w-full">
          <label className="block " htmlFor={"name"}>
            password
          </label>
          <div className="flex border mt-2 rounded-lg border-black">
            <input
              type={`${!show_password ? "password" : "text"}`}
              name="old_password"
              id="password"
              onChange={handleChange}
              value={formData.old_password}
              className={`outline-none py-3 pl-4 w-full  bg-transparent`}
            />

            <button
              type="button"
              className="p-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowPassword(!show_password);
              }}
            >
              {show_password ? <FaLockOpen /> : <FaLock />}
            </button>
          </div>
          {submit && (
            <span className="text-[red] text-[13px]">
              {formError.old_password_err}
            </span>
          )}
        </div>

        <div className="w-full mt-5">
          <label className="block " htmlFor={"name"}>
            New Password
          </label>
          <div className="flex border mt-2 rounded-lg border-black">
            <input
              type={`${!show_reset_password ? "password" : "text"}`}
              name="new_password"
              id="new_password"
              onChange={handleChange}
              value={formData.new_password}
              className={`outline-none py-3 pl-4 w-full  bg-transparent`}
            />

            <button
              type="button"
              className="p-2 cursor-pointer"
              onClick={(e) => {
                setShowReset_password(!show_reset_password);
              }}
            >
              {show_reset_password ? <FaLockOpen /> : <FaLock />}
            </button>
          </div>
          {submit && (
            <span className="text-[red] text-[13px]">
              {formError.new_password_err}
            </span>
          )}
        </div>
        {submit && (
          <span className="text-[red] text-[13px]">{formError.common_err}</span>
        )}
        <div className="flex mt-5">
          {loading ? (
            <button
              type="button"
              className=" mt-5  py-2 px-10  font-semibold text-[#fff] bg-primary rounded-[10px] hover:opacity-75"
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
            <Button
              name="submit"
              onClick={handleSubmit}
              bg={true}
              tick={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
