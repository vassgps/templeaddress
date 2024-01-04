import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { errorToast, successToast } from "@/toasts/toasts";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";
import Http from "@/config/Http";

const Forms = ({ setOpen, id, setItem }) => {
  const [submit, setSubmit] = useState(false);
  const [tranaction_id, setTranaction_id] = useState("");
  const [tranaction_id_err, setTranaction_id_err] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "tranaction_id") {
      setTranaction_id(value);
      if (value.trim().length < 3) {
        setTranaction_id_err("Please enter a valid  Tranaction id");
      } else {
        setTranaction_id_err("");
      }
    }
  };

  const handleSubmit = async () => {
    setSubmit(true);
    setLoading(true);
    if (tranaction_id.trim().length < 3) {
      setLoading(false);
      return setTranaction_id_err("Please enter a valid  Tranaction id");
    } else {
      setTranaction_id_err("");
      console.log(id);
      
      const { data } = await Http.post(`user/wallet/admin`, {
        uuid: id,
        txn_id: tranaction_id,
        txn_data: {
          bank,
          txn_date: date,
          amount: amount,
        },
      });
      setLoading(false);
      if (data.success) {
        setItem(data.data);
        successToast(`Tranaction Id Added successfully`);
        setOpen(false);
      } else {
        errorToast(data.message);
      }
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute md:w-1/3 border-2 border-primary rounded-xl p-5  overflow-y-auto overflow-x-hidden  bg-white  z-50 justify-center items-center w-full">
        <div className="flex text-primary cursor-pointer w-full justify-end">
          <span onClick={() => setOpen(false)}>
            {React.createElement(IoMdCloseCircle, { size: "30" })}
          </span>
        </div>
        <div className="w-full">
          <Input
            err={tranaction_id_err}
            submit={submit}
            handleChange={handleChange}
            value={tranaction_id}
            type={"text"}
            title={"Tranaction Id"}
            name={"tranaction_id"}
          />
        </div>
        <div className="w-full">
          <Input
            err={""}
            submit={submit}
            handleChange={(e) => setAmount(e.target.value)}
            value={amount}
            type={"number"}
            title={"Amount"}
            name={"amount"}
          />
        </div>
        <div className="w-full">
          <Input
            err={""}
            submit={submit}
            handleChange={(e) => setBank(e.target.value)}
            value={bank}
            type={"text"}
            title={"Bank"}
            name={"bank"}
          />
        </div>

        <div className="w-full">
          <Input
            err={""}
            submit={submit}
            handleChange={(e) => setDate(e.target.value)}
            value={date}
            type={"text"}
            title={"Date"}
            name={"date"}
          />
        </div>

        <div className="flex mt-5">
          {loading ? (
            <LoadingButton />
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

export default Forms;
