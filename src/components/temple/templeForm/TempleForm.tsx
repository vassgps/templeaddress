"use client";
import React, { useState, ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Styles from "./templeForm.module.css";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { templeValiDate } from "@/utils/formValidate";
import Loader from "@/components/ui/loader/Loader";
import { errorToast, successToast } from "@/toasts/toasts";
import Http from "@/config/Http";
import CropShow from "@/components/crop-show/Img-Crop";

const TempleForm = () => {
  const fileInputRef = useRef(null);
  const [crop, setCrop] = useState(false);
  const [cropImage, setCropImage] = useState<{
    key: string;
    image: string;
  } | null>(null);
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
 



  const [formData, setFormData] = useState({
    images: [],
    location:"",
    name: "",
    landmark: "",
    deity: "",
    mobile: "",
    map_url: "",
    telephone: "",
    description: "",
    country: "India",
    state: "",
    district: "",
    town: "",
    local_area: "",
    account_name: "",
    account_number: "",
    bank_name: "",
    ifse_code: "",
    upi_id: "",
  });
  const [formError, setFormError] = useState({
    name_err: "",
    map_url_err:"",
    landmark_err: "",
    location_err:"",
    deity_err: "",
    mobile_err: "",
    google_map_link_err: "",
    description_err:"",
    telephone_err: "",
    town_err:"",
    image_err: "",
    common_err: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files && fileInput.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "text/plain",
      "image/gif",
      "image/avif",
    ];
    if (file && allowedTypes.includes(file.type)) {
      setCrop(true);

      const reader = new FileReader();
      reader.onload =async (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setCropImage({ key: 'image', image: event.target.result + "" });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormError({
        ...formError,
        image_err: "Please select a valid image file.",
      });
    }
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    templeValiDate(
      { ...formData, [name]: value },
      setFormError,
      formError,
    );
  };

  const removeImage = () => {
    setFile(null);
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    const valid=templeValiDate(formData, setFormError, formError);
    if (valid) {
      if (file) {
        setLoading(true);
        const newformData = new FormData();

        for (const key in formData) {
          newformData.append(key, formData[key]);
        }
        newformData.append("image", file);
        newformData.append("status", 'true');

         
        let {data} = await Http.post("cms/temples/temple-details/",newformData);
        const {  success } = data;

        if (success) {
          successToast("Successfully created")
          return router.push("/dashboard/");
        }else{
          setLoading(false);
          const updatedFormError = { ...formError };
          for (const key in data.data) {
            if (updatedFormError.hasOwnProperty(`${key}_err`)) {
              updatedFormError[`${key}_err`] = data.data[key][0];
            }
          }
          
          setFormError(updatedFormError);
        }
        
        setLoading(false);
      } else {
        errorToast("Please select your image")

        setFormError({
          ...formError,
          common_err: "Please select your image",
        });
      }
    } else {
      errorToast("Please enter Temple details")

      setFormError({
        ...formError,
        common_err: "Please enter Temple details",
      });
    }
  };

  return (
    <div className={`${Styles["TempleForm"]} w-full  mt-5  `}>
      <h1 className="font-semibold w-full text-center  pt-5 text-2xl underline">
        Add Temple
      </h1>
      {!loading ? (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 md:mx-20 mx-10  pb-10 pt-5">
          <div className="md:col-span-2 flex justify-center px-5  pt-5">
            {!selectedImage ? (
              <label htmlFor="file-upload" id="file-drag">
                <div className=" border border-black w-72  h-40  flex justify-center items-center rounded-lg">
                  <div>
                    <Image height={50} width={60} src='https://antiquebetabucket.s3.ap-south-1.amazonaws.com/file1704346903055' className="ml-10" alt="file Image" />
                    <h1 className="mt-5">Upload Your image</h1>
                  </div>
                </div>
                <span className="text-[red] p-3 text-[13px]">
                  {formError.image_err}
                </span>
              </label>
            ) : (
              <div className=" mt-3 w-[40vh] min-h-40 flex justify-center items-center rounded-lg">
                <div className="mt-5 relative">
                  <Image
                    width={1000}
                    height={1000}
                    src={selectedImage}
                    alt="file Image"
                  />
                  <img
                    onClick={removeImage}
                    className="h-19 w-10 absolute top-0 right-0 cursor-pointer"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc47LHgqc-lC_8J4ZONvbnMe6J2ULlddID1A&usqp=CAU"
                    alt=""
                  />
                </div>
              </div>
            )}

            <input
              onChange={handleFileChange}
              id="file-upload"
              type="file"
              name="fileUpload"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
            />
          </div>
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
            err={formError.location_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.location}
            type={"text"}
            title={"Location"}
            name={"location"}
          />
          <Input
            err={formError.town_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.town}
            type={"text"}
            title={"town"}
            name={"town"}
          />
          <Input
            err={formError.deity_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.deity}
            type={"text"}
            title={"Deity"}
            name={"deity"}
          />
          <Input
            err={formError.mobile_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.mobile}
            type={"text"}
            title={"mobile Number"}
            name={"mobile"}
          />
          <Input
            err={formError.map_url_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.map_url}
            type={"text"}
            title={"Google map link"}
            name={"map_url"}
          />
          <Input
            err={formError.telephone_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.telephone}
            type={"text"}
            title={"Telephone Number"}
            name={"telephone"}
          />
          <Input
            err={formError.description_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.description}
            type={"text"}
            title={"Description"}
            name={"description"}
          />
  {cropImage && cropImage?.key != "" && cropImage?.image != "" && (
            <CropShow
              setSelectedImg={setSelectedImage}
              setFileImg={setFile}
              cropItem={crop}
              cropImage={cropImage}
              setCropImage={setCropImage}
            />
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
      ) : (
        <div className="flex justify-center items-center w-full  h-full">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default TempleForm;
