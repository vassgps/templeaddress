import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { errorToast, successToast } from "@/toasts/toasts";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { put } from "@/Api/Api";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";

const Forms = ({ setOpen, id, setActive ,setTranactionId}) => {
  const [submit, setSubmit] = useState(false);
  const [tranaction_id, setTranaction_id] = useState("");
  const [tranaction_id_err, setTranaction_id_err] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTranaction_id(e.target.value);
    if (e.target.value.trim().length < 3) {
      setTranaction_id_err("Please enter a valid  Tranaction id");
    } else {
      setTranaction_id_err("");
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
      const data = await put(`admin/withdraw-forms-list/status-success`, {
        form_id: id,
        tranaction_id,
      });
      setLoading(false);

      if (data.status) {
        setTranactionId(tranaction_id)
        successToast(`status changed  successfully`);
        setActive(data.withdrawForm.status);
        setOpen(false);
      } else {
        errorToast(data.message);
      }
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute md:w-1/3 border-2 border-primary rounded-xl p-5  overflow-y-auto overflow-x-hidden  top-60 bg-white  z-50 justify-center items-center w-full">
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

        <div className="flex mt-5">
          {loading ? (
            <LoadingButton/>
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
