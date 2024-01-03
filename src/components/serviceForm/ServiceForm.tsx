"use client";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdFindReplace } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import fileImage from "../../assets/fileImage.png";
import Styles from "./ServiceForm.module.css";
import Button from "../ui/button/Button";
import { serviceValiDate, socialmediaValiDate } from "@/utils/formValidate";
import { ServiceForm } from "@/models/interfaces";
import Loader from "../ui/loader/Loader";
import Input from "../ui/input/Input";
import { errorToast, successToast } from "@/toasts/toasts";
import Http from "@/config/Http";
import CropShow from "@/components/crop-show/Img-Crop";

const ServiceForm = ({
  id,
  edit,
  admin,
}: {
  id?: string;
  edit?: boolean;
  admin?: boolean;
}) => {
  const router = useRouter();
  const galleryImageRef = useRef(null);
  const fileInputRef = useRef(null);
  const [crop, setCrop] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  // for Gallery Image
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<
    string[] | null
  >(null);
  const [galleryImageFile, setGalleryImageFile] = useState<any>(null);

  const [replaceIndex, setReplaceIndex] = useState("");
  const [loading, setLoading] = useState(true);
  const [enable_booking, setEnable_booking] = useState(false);
  const [editedFormData, setEditedFormData] = useState<ServiceForm | null>();
  const [service_area, setService_area] = useState("");
  const [cropImage, setCropImage] = useState<{key:string,image:string}|null>(null);

  const [formData, setFormData] = useState<ServiceForm>({
    name: "",
    district: "",
    state: "",
    account_name: "",
    website: "",
    profile_page_link: "",
    zipcode: "",
    time_slot_1: "",
    time_slot_2: "",
    time_slot_3: "",
    town: "",
    telephone: "",
    bank_name: "",
    acc_number: "",
    landmark: "",
    upi_id: "",
    ifsc_code: "",
    youtube_link: "",
    instagram_link: "",
    facebook_link: "",
    embedded_url: "",
    email: "",
    service: "",
    description: "",
    location: "",
    address: "",
    enable_booking: false,
    mobile: "",
    whatsapp_number: "",
    image: "",
    map_url: "",
    images: [],
  });
  const [formError, setFormError] = useState({
    name_err: "",
    telephone_err: "",
    website_err: "",
    zipcode_err: "",
    state_err: "",
    district_err: "",
    time_slot_1_err: "",
    time_slot_2_err: "",
    time_slot_3_err: "",
    town_err: "",
    bank_name_err: "",
    acc_number_err: "",
    map_url_err: "",
    embedded_url_err: "",
    ifsc_code_err: "",
    upi_id_err: "",
    profile_page_link_err: "",
    youtube_link_err: "",
    email_err: "",
    whatsApp_number_err: "",
    service_err: "",
    instagram_link_err: "",
    description_err: "",
    location_err: "",
    consulting_time_err: "",
    landmark_err: "",
    service_areas_err: "",
    booking_available_err: "",
    contact_number_err: "",
    common_err: "",
    image_err: "",
    google_map_link_err: "",
    facebook_link_err: "",
    gallery_image_err: "",
  });
  
  const [social_media, setSocialMedia] = useState({
    facebook_link: "",
    instagram_link: "",
    whatsapp_number: "",
    youtube_link: "",
  });
  const [social_media_err, setSocial_media_err] = useState({
    facebook_link_err: "",
    instagram_link_err: "",
    whatsapp_number_err: "",
    youtube_link_err: "",
  });

  const add_service_areas= () => {
    if(service_area &&!formData.service_areas?.includes(service_area)){
      setFormError({
        ...formError,
        service_areas_err: "",
      });
    setFormData((prevFormData) => ({
      ...prevFormData,
      service_areas: [...(prevFormData?.service_areas || []), service_area],
    }));
    setService_area("");
  }else{
    setFormError({
      ...formError,
      service_areas_err: " service area already exists or is empty",
    });
  }
  };

  const removeService_area = (index: number) => {
    setFormData((prevFormData) => {
      const updatedDeities = [...prevFormData.service_areas];
      updatedDeities.splice(index, 1);
      return {
        ...prevFormData,
        service_areas: updatedDeities,
      };
    });
  };


  useEffect(() => {
    if (edit || admin) {
      (async () => {
        setLoading(true);
        const { data } = await Http.get(`cms/temples/service-details/${id}`);
        if (data.success) {
          setEditedFormData(data.data);          
          setSocialMedia(data.data.social_media[0]);
          setFormData(data.data);
          setSelectedGalleryImage(data.data?.gallery[0] || {});
          setLoading(false);
        } else {
          if (admin) {
            router.push("/admin/services");
          } else {
            router.push("/dashboard/services");
          }
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormError({
      ...formError,
      image_err: "",
    }); 
    const fileInput = e.target;
    const file = fileInput.files && fileInput.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "text/plain",
      "image/gif",
      "image/avif"
    ];
    
    if (file && allowedTypes.includes(file.type)) {
      setCrop(true)
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setCropImage({key:"image",image:event.target.result + ""})
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormError({
        ...formError,
        image_err: "Please select a valid file type (JPG, PNG,gif,avif,plain).",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData };
    updatedData[name] = value;
    setFormData(updatedData);
    serviceValiDate({ ...formData, [name]: value }, setFormError, formError);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    const valid = serviceValiDate(formData, setFormError, formError);
    const valid2 = socialmediaValiDate(
      social_media,
      setSocial_media_err,
      social_media_err
    );
    if (valid && valid2) {
      if (file || edit ) {
        setLoading(true);
        let response;
        if (edit) {
          const newformData = new FormData();
          for (const key in formData) {
            if (editedFormData[key] != formData[key] && key!="service_areas") {
              newformData.append(key, formData[key]);
            }
          }
          if(formData?.service_areas?.length>0){
            newformData.append("service_areas", JSON.stringify(formData.service_areas));
          }
          newformData.append("social_media", JSON.stringify([social_media]));
          if (file) {
            newformData.append("image", file);
          }
          let { data } = await Http.patch(
            `cms/temples/service-details/${formData.uuid}/`,
            newformData
          );
          response = data;
        } else {
          const newformData = new FormData();
          for (const key in formData) {
            newformData.append(key, formData[key]);
          }
          newformData.append("image", file);
          let { data } = await Http.post(
            "cms/temples/service-details/",
            newformData
          );
          response = data;
        }
        const { success } = response;
        if (success) {
          if (edit) {

            if (galleryImageFile) {
              const galleryFormData = new FormData();
              for (const key in galleryImageFile) {
                galleryFormData.append(key, galleryImageFile[key]);
              }
              galleryFormData.append("service_uuid", formData.uuid);

              if (formData?.gallery?.length > 0) {
                const uuid = formData?.gallery[0].uuid;
                await Http.put(
                  `cms/temples/service-gallery-details/${uuid}/`,
                  galleryFormData
                );
              } else {
                galleryFormData.append("status", "true");

                await Http.post(
                  "cms/temples/service-gallery-details/",
                  galleryFormData
                );
              }
              successToast("Service edited successfully");
              return router.push("/dashboard/services");
            } else {
              successToast("Service edited successfully");
              return router.push("/dashboard/services");
            }
          } else {
            successToast("Service added successfully");
            return router.push("/dashboard/services");
          }
        } else {
          setLoading(false);
          if(response.data){

            const updatedFormError = { ...formError };
            for (const key in response.data) {
              if (updatedFormError.hasOwnProperty(`${key}_err`)) {
                updatedFormError[`${key}_err`] = response.data[key][0];
              }
            }
            setFormError(updatedFormError);
          }
        }

        setLoading(false);
      } else {
        errorToast("Please select your image");

        setFormError({
          ...formError,
          common_err: "Please select your image",
        });
      }
    } else {
      errorToast("Please enter service details");

      setFormError({
        ...formError,
        common_err: "Please enter service details",
      });
    }
  };
  const removeImage = () => {
    setFile(null);
    setSelectedImage(null);
  };
  let newKey = null;
  const handleGalleryFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files && fileInput.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "text/plain",
      "image/gif",
      "image/avif"
    ];
    if (file && allowedTypes.includes(file.type)) {
      if (replaceIndex !== "") {
        
      } else {
        if (formData?.gallery?.length > 0) {
          newKey = Object.keys(selectedGalleryImage).find(
            (key) =>
              selectedGalleryImage[key] === null && key.startsWith("image_")
          );
        } else {
          if (galleryImageFile && Object.keys(galleryImageFile).length > 0) {
            const lastKey = Object.keys(galleryImageFile)
              .reverse()
              .find(
                (key) =>
                  galleryImageFile[key] !== null && key.startsWith("image_")
              );
            if (lastKey) {
              let lastNumber = parseInt(lastKey.replace("image_", ""), 10);
              lastNumber++;
              newKey = `image_${lastNumber}`;
            }
          } else {
            newKey = "image_1";
          }
        }
      
      }

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          if (replaceIndex !== "") {
            setCropImage({
              key: replaceIndex,
              image: event.target.result + "",
            });
          } else {
            setCropImage({ key: newKey, image: event.target.result + "" });
          }
        }
      };
      reader.readAsDataURL(file);
      setReplaceIndex("");
    } else {
      setFormError({
        ...formError,
        gallery_image_err: "Please select a valid file type (JPG, PNG,gif,avif,plain).",
      });
    }
  };

  const galleryImageClick = (index) => {
    if (galleryImageRef.current) {
      setReplaceIndex(index);
      galleryImageRef.current.click();
    }
  };

  const handleEnable_booking = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "false") {
      setEnable_booking(false);
    } else {
      setEnable_booking(true);
    }
  };
  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedSocialMedia = { ...social_media };
    updatedSocialMedia[name] = value;
    setSocialMedia(updatedSocialMedia);
    socialmediaValiDate(
      { ...social_media, [name]: value },
      setSocial_media_err,
      social_media_err
    );
  };
  return (
    <div className={`${Styles["TempleForm"]} w-full  mt-5 `}>
      <h1 className="font-semibold w-full text-center  pt-5 text-2xl underline">
        {edit || admin ? "Edit" : "Add"} Service
      </h1>
      {!loading ? (
        <>
          <div className="md:col-span-2 flex justify-center px-5  pt-5">
            {!selectedImage && !formData.image ? (
              <label htmlFor="file-upload" id="file-drag">
                <div className=" border border-black w-72  h-40  flex justify-center items-center rounded-lg">
                  <div>
                    <Image src={fileImage} className="ml-10" alt="file Image" />
                    <h1 className="mt-5">Upload Your image</h1>
                  </div>
                </div>
                <span className="text-[red] text-[13px]">
                  {formError.image_err}
                </span>
              </label>
            ) : (
              <div className="  w-[40vh] min-h-40 flex justify-center items-center rounded-lg">
                <div className="mt-5 relative">
                  <Image
                    className={`${!selectedImage && " "} `}
                    width={1000}
                    height={1000}
                    src={selectedImage ? selectedImage : formData.image}
                    alt="file Image"
                  />
                  {selectedImage ? (
                    <img
                      onClick={removeImage}
                      className="h-19 w-10 absolute top-0 right-0 cursor-pointer"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc47LHgqc-lC_8J4ZONvbnMe6J2ULlddID1A&usqp=CAU"
                      alt=""
                    />
                  ) : (
                    <div className="flex justify-center mt-3">
                      <Button
                        onClick={handleButtonClick}
                        name="Upload New Image  "
                        bg={true}
                        tick={false}
                      />
                    </div>
                  )}
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
          <div className="grid md:grid-cols-2 grid-cols-1 gap-7 md:mx-20 mx-10 pb-10 mt-10">
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
              err={formError.email_err}
              submit={submit}
              handleChange={handleChange}
              value={formData.email}
              type={"email"}
              title={"Email"}
              name={"email"}
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
              err={formError.consulting_time_err}
              submit={submit}
              handleChange={handleChange}
              value={formData.time_slot_1}
              type={"text"}
              title={"Consulting Time"}
              name={"time_slot_1"}
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
              err={formError.contact_number_err}
              submit={submit}
              handleChange={handleChange}
              value={formData.mobile}
              type={"text"}
              title={"mobile Number"}
              name={"mobile"}
            />
              <Input
                  err={formError?.map_url_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData?.map_url || ""}
                  type={"text"}
                  title={"Google Map Link"}
                  name={"map_url"}
                />
            {(edit || admin) && (
              <>
                <Input
                  err={formError.telephone_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.telephone || ""}
                  type={"text"}
                  title={"Telephone"}
                  name={"telephone"}
                />
                <Input
                  err={formError.state_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.state || ""}
                  type={"text"}
                  title={"State"}
                  name={"state"}
                />

                <Input
                  err={formError.district_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.district || ""}
                  type={"text"}
                  title={"District"}
                  name={"district"}
                />
                <Input
                  err={formError.zipcode_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.zipcode || ""}
                  type={"text"}
                  title={"zipcode"}
                  name={"zipcode"}
                />

                <Input
                  err={formError.town_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.town || ""}
                  type={"text"}
                  title={"Town"}
                  name={"town"}
                />
                <Input
                  err={formError.landmark_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.landmark || ""}
                  type={"text"}
                  title={"Landmark"}
                  name={"landmark"}
                />
                <Input
                  err={formError.embedded_url_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.embedded_url || ""}
                  type={"text"}
                  title={"Google Map Embed Link"}
                  name={"embedded_url"}
                />
              
                <h1 className="md:col-span-2 text-primary font-semibold w-full text-left  text-xl underline">
                  Social media
                </h1>
                <Input
                  err={formError.website_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.website || ""}
                  type={"text"}
                  title={"Website Link"}
                  name={"website"}
                />
                <Input
                  err={social_media_err?.whatsapp_number_err}
                  submit={submit}
                  handleChange={handleSocialMediaChange}
                  value={social_media?.whatsapp_number || ""}
                  type={"text"}
                  title={"Whatsapp Number"}
                  name={"whatsapp_number"}
                />
                <Input
                  err={social_media_err?.facebook_link_err}
                  submit={submit}
                  handleChange={handleSocialMediaChange}
                  value={social_media?.facebook_link || ""}
                  type={"text"}
                  title={"Facebook Link"}
                  name={"facebook_link"}
                />
                <Input
                  err={social_media_err?.instagram_link_err}
                  submit={submit}
                  handleChange={handleSocialMediaChange}
                  value={social_media?.instagram_link || ""}
                  type={"text"}
                  title={"Instagram Link"}
                  name={"instagram_link"}
                />
                <Input
                  err={social_media_err.youtube_link_err}
                  submit={submit}
                  handleChange={handleSocialMediaChange}
                  value={social_media?.youtube_link || ""}
                  type={"text"}
                  title={"Youtube Link"}
                  name={"youtube_link"}
                />
                <div className="md:col-span-2">

                 <div className="flex">
              <Input
                err={formError.service_areas_err}
                submit={true}
                handleChange={(e) => setService_area(e.target.value)}
                value={service_area || ""}
                type={"text"}
                title={"Service Areas"}
                name={"deity"}
              />
              <div className="mt-10 ml-1">
                <Button onClick={add_service_areas} name="Add" bg={true} tick={false} />
              </div>

            </div>
            {formData?.service_areas?.length > 0 &&
              formData?.service_areas?.map((item, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 p-4 rounded-lg mt-1 flex justify-between"
                >
                  {item}{" "}
                  <div
                    className="text-primary cursor-pointer"
                    onClick={() => removeService_area(index)}
                  >
                    {React.createElement(IoMdClose, { size: "20" })}
                  </div>{" "}
                </div>
              ))}
                </div>


                <h1 className="md:col-span-2  text-primary font-semibold w-full text-left  text-xl underline">
                  Account Details
                </h1>

                <Input
                  err={""}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData?.account_name || ""}
                  type={"text"}
                  title={"Account Name"}
                  name={"account_name"}
                />
                <Input
                  err={formError.bank_name_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData?.bank_name || ""}
                  type={"text"}
                  title={"Bank Name"}
                  name={"bank_name"}
                />
                <Input
                  err={formError.acc_number_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData.acc_number || ""}
                  type={"text"}
                  title={"Account number"}
                  name={"acc_number"}
                />

                <Input
                  err={formError.ifsc_code_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData?.ifsc_code}
                  type={"text"}
                  title={"IFSC Code"}
                  name={"ifsc_code"}
                />

                <Input
                  err={formError.upi_id_err}
                  submit={submit}
                  handleChange={handleChange}
                  value={formData?.upi_id}
                  type={"text"}
                  title={"UIP/VPA ID"}
                  name={"upi_id"}
                />
                <h1 className="md:col-span-2 text-primary font-semibold w-full text-left  text-xl underline">
                  Temple Timing
                </h1>

                <div className="flex md:col-span-2 gap-7">
                  <Input
                    err={formError.time_slot_1_err}
                    submit={submit}
                    handleChange={handleChange}
                    value={formData.time_slot_1 || ""}
                    type={"text"}
                    title={"Time 1"}
                    name={"time_slot_1"}
                  />
                </div>

                <div className="flex md:col-span-2 gap-7">
                  <Input
                    err={formError.time_slot_2_err}
                    submit={submit}
                    handleChange={handleChange}
                    value={formData.time_slot_2 || ""}
                    type={"text"}
                    title={"Time 2"}
                    name={"time_slot_2"}
                  />
                </div>

                <div className="flex md:col-span-2 gap-7">
                  <Input
                    err={formError.time_slot_3_err}
                    submit={submit}
                    handleChange={handleChange}
                    value={formData.time_slot_3 || ""}
                    type={"text"}
                    title={"Time 3"}
                    name={"time_slot_3"}
                  />
                </div>

                <h1 className="md:col-span-2  text-primary font-semibold w-full text-left  text-xl underline">
                  More Details
                </h1>

                <label
                  className="md:col-span-2 font-semibold w-full text-left  text-base "
                  htmlFor="qr_code"
                >
                  Add Service Images :-
                </label>
                <div className="w-full md:col-span-2">
                  <div className="w-full gap-2  grid md:grid-cols-4 grid-cols-2 items-center rounded-lg">
                    {selectedGalleryImage &&
                      Object.keys(selectedGalleryImage)
                        .filter(
                          (key) =>
                            key.startsWith("image_") &&
                            selectedGalleryImage[key] !== null
                        )
                        .map((key) => (
                          <div className="mt-2 relative " key={key}>
                            <img
                              src={selectedGalleryImage[key]}
                              className="h-52 w-full"
                              alt="file Image"
                            />
                            <div
                              onClick={() => galleryImageClick(key)}
                              className="absolute top-0 right-0 cursor-pointer bg-white m-1 rounded-lg text-primary"
                            >
                              {React.createElement(MdFindReplace, {
                                size: "40",
                              })}
                            </div>
                          </div>
                        ))}
                  </div>
                  <input
                    onChange={handleGalleryFileChange}
                    ref={galleryImageRef}
                    id="file-upload"
                    type="file"
                    name="fileUpload"
                    accept="image/*"
                    className={` outline-none py-2 pl-4 w-full bg-transparent border mt-2 rounded-lg border-black`}
                  />

                  <span className="text-[red] text-[13px]">
                    {formError.gallery_image_err}
                  </span>
                </div>
              </>
            )}
            <div className="flex-row md:col-span-2">
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
            {(cropImage &&  cropImage?.key!="" && cropImage?.image!="") && <CropShow setSelectedImg={crop? setSelectedImage: setSelectedGalleryImage} setFileImg={crop? setFile:  setGalleryImageFile} cropItem={crop} cropImage={cropImage} setCropImage={setCropImage}/>}

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

export default ServiceForm;
