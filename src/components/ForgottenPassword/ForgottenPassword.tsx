"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import LoadingButton from "../ui/loadingButton/LoadingButton";
import { successToast } from "@/toasts/toasts";
import { useRouter } from "next/navigation";
const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
import { FaLock, FaLockOpen } from "react-icons/fa";
import Http from "@/config/Http";

const ForgottenPassword = () => {
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show_input, setShowInput] = useState(false);
  const [show_reset_password, setShowReset_password] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState({
    password_err: "",
    email_err: "",
    common_err: "",
    otp_err: "",
  });

  const handlecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length > 5) {
      setFormError((prevFormData) => ({
        ...prevFormData,
        common_err: "",
      }));
    } else {
      return setFormError((prevFormData) => ({
        ...prevFormData,
        common_err: "Please enter a valid password",
      }));
    }
  };

  const sentOtphandle = async () => {
    setFormError((prevFormData) => ({
      ...prevFormData,
      common_err: "",
    }));
    setSubmit(true);
    if (!emailRegex.test(email)) {
      return setFormError((prevFormData) => ({
        ...prevFormData,
        common_err: "Please enter a valid email",
      }));
    }
    setLoading(true);
    const { data } = await Http.post("user/password-forgot/", { email });
    if (data.status === "OK") {
      successToast("OTP successfully sent! Please check your email");
      setShowInput(true);
      setLoading(false);
    } else {
      setLoading(false);
      return setFormError((prevFormData) => ({
        ...prevFormData,
        common_err:
          "There is an issue with the email. It may be invalid. Please review and try again",
      }));
    }
  };

  const handleSubmit = async () => {
    setSubmit(true);

    if (otp.length < 6) {
      return setFormError((prevFormData) => ({
        ...prevFormData,
        common_err: "Please enter a valid otp",
      }));
    }
    if (password.length < 6) {
      return setFormError((prevFormData) => ({
        ...prevFormData,
        common_err: "password must be longer than or equal to 6 characters",
      }));
    } else {
      const capitalRegex = /[A-Z]/;
      if (!capitalRegex.test(password)) {
        return setFormError((prevFormData) => ({
          ...prevFormData,
          common_err: "Password must contain at least one capital letter",
        }));
      }
    }

    setLoading(true);

    const { data } = await Http.post("user/password-forgot/confirm/", {
      token: otp,
      password,
    });
    console.log(data);

    setLoading(false);
    if (data.status === "OK") {
      successToast("Password updated succesfully");
      router.push("/login");
    } else {
      if (data?.detail === "Not found.") {
        return setFormError((prevFormData) => ({
          ...prevFormData,
          common_err: "wrong Reset Code",
        }));
      } else {
        
        if (data?.password?.length > 0) {
          return setFormError((prevFormData) => ({
            ...prevFormData,
            common_err: data.password[0],
          }));
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full mt-5">
      <div className=" md:w-1/3 border-2 border-primary rounded-xl p-5   justify-center items-center w-full">
        <Input
          err={formError.email_err}
          submit={submit}
          bg={true}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
          type={"text"}
          title={"email"}
          name={"email"}
        />
        {show_input && (
          <>
            <Input
              err={formError.otp_err}
              submit={submit}
              bg={true}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setOtp(e.target.value);
                setFormError((prevFormData) => ({
                  ...prevFormData,
                  common_err: "",
                }));
              }}
              value={otp}
              type={"text"}
              title={"Reset Code"}
              name={"otp"}
            />
            <div className="w-full mt-5">
              <label className="block " htmlFor={"name"}>
                Password
              </label>
              <div className="flex border mt-2 rounded-lg bg-white border-black">
                <input
                  type={`${!show_reset_password ? "password" : "text"}`}
                  name="reset_password"
                  id="reset_password"
                  onChange={handlecChange}
                  value={password}
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
                  {formError.password_err}
                </span>
              )}{" "}
            </div>
          </>
        )}

        {submit && (
          <span className="text-[red] text-[13px]">{formError.common_err}</span>
        )}
        <div className="flex mt-5">
          {loading ? (
            <LoadingButton />
          ) : !show_input ? (
            <Button
              name="Sent Otp"
              onClick={sentOtphandle}
              bg={true}
              tick={false}
            />
          ) : (
            <Button
              name="Submit"
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

export default ForgottenPassword;
