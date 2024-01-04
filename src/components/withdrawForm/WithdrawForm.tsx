"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import Loader from "../ui/loader/Loader";
import Styles from "../serviceForm/ServiceForm.module.css";
import { User } from "@/models/interfaces";
import { useRouter } from "next/navigation";
import { withdrawForm } from "@/utils/formValidate";
import { errorToast, successToast } from "@/toasts/toasts";
import Http from "@/config/Http";

const WithdrawForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Upi");
  const [user, setUser] = useState<User | undefined>();
  const [wallet,setWallet]=useState(0)
  const [formData, setFormData] = useState({
    name: "",
    money: 0,
    account_number: "",
    ifsc_code: "",
    upi_code: "",
  });
  const [formError, setFormError] = useState({
    name_err: "",
    money_err: "",
    account_number_err: "",
    ifsc_code_err: "",
    upi_code_err: "",
    paymentMethod_err: "",
    common_err: "",
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const {data}  = await Http.get("user/profile/");
      const {data: dashboardData}  = await Http.get("cms/temples/dashboard/");
      console.log(data);
          
      if (data.success) {
        if (Number(data.data.wallet_balance) * Number(dashboardData.data.coin_value) > 0) {
          setUser(data.data);
          
          setWallet(Number(data.data.wallet_balance) * Number(dashboardData.data.coin_value))
          setFormData((prevFormData) => ({
            ...prevFormData,
            money: Number(data.data.wallet_balance) * Number(dashboardData.data.coin_value),
          }));
        } else {
          setLoading(false);
          router.push("/profile");
        }
      }
      setLoading(false);
    })();
  }, []);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    withdrawForm(
      { ...formData, [name]: value },
      setFormError,
      formError,
      paymentMethod
    );
  };

  const handleSubmit = async () => {
   const valid =  withdrawForm(formData, setFormError, formError, paymentMethod);
    setSubmit(true);
    if (valid) {
      if(Number(formData.money)<=wallet){
        setLoading(true);
        const {data} = await Http.post("user/wallet/", {txn_data:{account_number:formData.account_number, payment_method: paymentMethod,name:formData.name,ifsc_code:formData.ifsc_code,upi_code:formData.upi_code,status:false},user:user.id,points:Number(formData.money)})
        if (data.success) {
          successToast("withdraw Form submitted successfully");
          router.push("/profile");
          setLoading(false);
        }
      }else{
        setFormError({
          ...formError,
          money_err: "Please enter your details",
        });
      }
    } else {
      errorToast("Please enter your details");
      setFormError({
        ...formError,
        common_err: "Please enter your details",
      });
    }
  };

  const handlePaymentMethodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className={`${Styles["TempleForm"]} w-full  mt-5  `}>
      {!loading ? (
        <>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-7 md:mx-20 mx-10 pb-10 p-10">
            <Input
              err={formError.name_err}
              submit={submit}
              handleChange={handleChange}
              value={formData.name}
              type={"text"}
              title={"Name"}
              name={"name"}
            />
            <Input
              err={formError.money_err}
              submit={submit}
              handleChange={handleChange}
              value={formData.money.toString()}
              type={"number"}
              title={"Amount"}
              name={"money"}
            />
            <div>
              <label htmlFor="account" className="block mb-4">
                select payment method
              </label>
              <select
                id="countries"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="outline-none py-3 pl-4 w-full bg-transparent border  rounded-lg border-black"
              >
                <option value="Upi">Upi</option>
                <option value="Bank">Bank</option>
              </select>
              {submit && (
                <span className="text-[red] text-[13px]">
                  {formError.paymentMethod_err}
                </span>
              )}
            </div>
            {paymentMethod === "Bank" && (
              <>
                <Input
                  err={formError.account_number_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.account_number}
                  type={"text"}
                  title={"Account number"}
                  name={"account_number"}
                />
                <Input
                  err={formError.ifsc_code_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.ifsc_code}
                  type={"text"}
                  title={"IFSC code"}
                  name={"ifsc_code"}
                />{" "}
              </>
            )}

            {paymentMethod === "Upi" ? (
              <Input
                err={formError.upi_code_err}
                submit={submit}
                handleChange={handleChange}
                value={formData.upi_code}
                type={"text"}
                title={"Upi code"}
                name={"upi_code"}
              />
            ) : (
              <div></div>
            )}
            <div className="flex-row">
              <div className="w-full justify-center items-center">
                {submit && (
                  <span className="text-[red]  text-[13px]">
                    {formError.common_err}
                  </span>
                )}
              </div>
              <div className="flex mt-5">
                <Button
                  name="submit"
                  onClick={handleSubmit}
                  bg={true}
                  tick={false}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full  h-full">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default WithdrawForm;
