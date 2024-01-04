"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Styles from "../templeForm/templeForm.module.css";
import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";
import { poojaForm } from "@/utils/formValidate";
import { errorToast } from "@/toasts/toasts";
import Http from "@/config/Http";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader/Loader";
import { Pooja } from "@/models/interfaces";

const AddPooja = ({ id, edit }: { id: string; edit?: boolean }) => {
  const [enable_booking, setEnable_booking] = useState(false);
  const [editedFormData, setEditedFormData] = useState<Pooja | null>();

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [formError, setFormError] = useState({
    name_err: "",
    description_err: "",
    amount_err: "",
    common_err: "",
  });
  const [formData, setFormData] = useState<Pooja>({
    name: "",
    description: "",
    amount: 0,
  });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (edit) {
      (async () => {
        const { data } = await Http.get(`cms/temples/pooja-details/${id}`);

        if (data.success) {
          setEnable_booking(data.data.booking_available)
          setEditedFormData(data.data);
          setFormData(data.data);
        } else {
          router.push("/dashboard");
        }
      })();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    poojaForm({ ...formData, [name]: value }, setFormError, formError);
  };

  const handleEnable_booking = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "false") {
      setEnable_booking(false);
    } else {
      setEnable_booking(true);
    }
  };

  const handleSubmit = async () => {
    setSubmit(true);
    const valid = poojaForm(formData, setFormError, formError);
    let response: undefined | { success: boolean; data: any };
    if (valid) {
      setLoading(true);
      if (edit) {
        let newformData = new FormData();

        for (const key in formData) {
          if (editedFormData[key] != formData[key] ) {
            newformData.append(key, formData[key]);
          }
        }
        newformData.append("booking_available", "" + enable_booking);
        let { data } = await Http.put(
          `cms/temples/pooja-details/${id}/`,
          newformData
        );
        response = data;
      } else {
        let { data } = await Http.post("cms/temples/pooja-details/", {
          ...formData,
          temple_uuid: id,
          booking_available: enable_booking,
        });
        response = data;
      }
      if (response.success) {
          if (edit) {
              router.push(`/temple/${formData.temple_uuid}/view-poojas`);
              setLoading(false);
        } else {
          router.push(`/temple/${id}/view-poojas`);
          setLoading(false);
        }
      } else {
        setLoading(false);
        const updatedFormError = { ...formError };
        for (const key in response.data) {
          if (updatedFormError.hasOwnProperty(`${key}_err`)) {
            updatedFormError[`${key}_err`] = response.data[key][0];
          }
        }
        updatedFormError.common_err = "something is wrong, please try again";
        errorToast("something is wrong, please try again");
        setFormError(updatedFormError);
      }
    } else {
      errorToast("Please enter  Pooja details");
      setFormError({
        ...formError,
        common_err: "Please enter  Pooja details",
      });
    }
  };

  return (
    <div className={`${Styles["TempleForm"]} w-full  mt-5  `}>
      {!loading ? (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 md:mx-20 mx-10  pb-10 pt-5">
          <Input
            err={formError.name_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.name}
            type={"text"}
            title={"Name"}
            name={"name"}
          />

          <div>
            <label htmlFor="account" className="block mb-2 mt-2">
              Booking Available
            </label>
            <select
              id="bookingStatus"
              value={String(enable_booking)}
              onChange={handleEnable_booking}
              className="outline-none py-3 pl-4 w-full bg-transparent border  rounded-lg border-black"
            >
              <option value="true">Yes</option>
              <option value="false"> No</option>
            </select>
          </div>

          <Input
            err={formError.description_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.description}
            type={"text"}
            title={"Description"}
            name={"description"}
          />
          <Input
            err={formError.amount_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.amount.toString()}
            type={"number"}
            title={"Amount"}
            name={"amount"}
          />
          <div className="flex-row md:col-span-2">
            <div className="w-full justify-center items-center">
              {submit && (
                <span className="text-[red]  text-[13px]">
                  {formError.common_err}
                </span>
              )}
            </div>
            <div className="flex mt-5 w-full justify-center">
              <Button
                name="submit"
                onClick={handleSubmit}
                bg={true}
                tick={false}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full  h-full">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AddPooja;
