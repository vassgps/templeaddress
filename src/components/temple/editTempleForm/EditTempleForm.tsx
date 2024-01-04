"use client";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MdFindReplace } from "react-icons/md";
import Image from "next/image";
import Styles from "../templeForm/templeForm.module.css";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { socialmediaValiDate, templeValiDate } from "@/utils/formValidate";
import { TempleForm } from "@/models/interfaces";
import Loader from "@/components/ui/loader/Loader";
import { errorToast, successToast } from "@/toasts/toasts";
import { IoMdClose } from "react-icons/io";
import Http from "@/config/Http";
import CropShow from "@/components/crop-show/Img-Crop";

const EditTempleForm = ({ id, admin }: { id: string; admin?: boolean }) => {
  const fileInputRef = useRef(null);
  const fileQrInputRef = useRef(null);
  const [crop, setCrop] = useState(false);

  const galleryImageRef = useRef(null);
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [cropImage, setCropImage] = useState<{
    key: string;
    image: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  // for thumbnail Image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // for Gallery Image
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<
    string[] | null
  >(null);
  const [galleryImageFile, setGalleryImageFile] = useState<any>(null);
  const [replaceIndex, setReplaceIndex] = useState<string>("");

  // for Qr Code Image
  const [selectedQrCodeImage, setSelectedQrCodeImage] = useState<string | null>(
    null
  );
  const [qrCodeImageFile, setQrCodeImageFile] = useState<File | null>(null);

  const [deity, setDeity] = useState("");
  const [editedFormData, setEditedFormData] = useState<TempleForm | null>();
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

  const [formData, setFormData] = useState<TempleForm>({
    images: [],
    zipcode: "",
    time_slot_1: "",
    upi_qr: "",
    email: "",
    website: "",
    gallery: {},
    time_slot_2: "",
    time_slot_3: "",
    image: "",
    name: "",
    embedded_url: "",
    landmark: "",
    location: "",
    deity: "",
    deity_list: [],
    mobile: "",
    map_url: "",
    telephone: "",
    description: "",
    country: "India",
    state: "",
    district: "",
    town: "",
    account_name: "",
    acc_number: "",
    bank_name: "",
    ifsc_code: "",
    upi_id: "",
  });
  const [formError, setFormError] = useState({
    name_err: "",
    zipcode_err: "",
    whatsapp_number_err: "",
    time_slot_3_err: "",
    time_slot_1_err: "",
    time_slot_2_err: "",
    embedded_url_err: "",
    upi_id_err: "",
    ifsc_code_err: "",
    bank_name_err: "",
    deity_list_err: "",
    acc_number_err: "",
    account_name_err: "",
    location_err: "",
    email_err: "",
    gallery_image_err: "",
    website_err: "",
    landmark_err: "",
    deity_err: "",
    mobile_err: "",
    map_url_err: "",
    description_err: "",
    telephone_err: "",
    upi_qr_err: "",
    image_err: "",
    common_err: "",
    state_err: "",
    district_err: "",
    town_err: "",
  });

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);

        const { data } = await Http.get(`cms/temples/temple-details/${id}`);

        if (data.success) {
          setEditedFormData(data.data);

          setFormData(data.data);
          if (data.data.social_media && data.data.social_media[0]) {
            setSocialMedia(data.data.social_media[0]);
          }

          if (data.data?.gallery[0]) {
            setSelectedGalleryImage(data.data?.gallery[0] || {});
          }
        } else {
          router.push("/dashboard");
        }
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [id]);

  const addDeity = () => {
    if (deity && !formData.deity_list.includes(deity)) {
      setFormError({
        ...formError,
        deity_list_err: "",
      });
      setFormData((prevFormData) => ({
        ...prevFormData,
        deity_list: [...prevFormData.deity_list, deity],
      }));
      setDeity("");
    } else {
      setFormError({
        ...formError,
        deity_list_err: " Deity already exists or is empty",
      });
    }
  };

  const removeDeity = (index: number) => {
    setFormData((prevFormData) => {
      const updatedDeities = [...prevFormData.deity_list];
      updatedDeities.splice(index, 1);
      return {
        ...prevFormData,
        deity_list: updatedDeities,
      };
    });
  };

  const handleGalleryFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newKey = null;
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
      setCrop(false);

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
        gallery_image_err:
          "Please select a valid file type (JPG, PNG,gif,avif,plain).",
      });
    }
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    image: string,
    err: string
  ) => {
    setFormError({
      ...formError,
      [err]: "",
    });

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
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setCropImage({ key: image, image: event.target.result + "" });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormError({
        ...formError,
        [err]: "Please select a valid file type (JPG, PNG,gif,avif,plain).",
      });
      fileInput.value = "";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    templeValiDate({ ...formData, [name]: value }, setFormError, formError);
  };

  const removeImage = (setFile, setSelected) => {
    setFile(null);
    setSelected(null);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    const valid = templeValiDate(formData, setFormError, formError);
    const valid2 = socialmediaValiDate(
      social_media,
      setSocial_media_err,
      social_media_err
    );
    if (valid && valid2) {
      setLoading(true);
      let newformData = new FormData();
      for (const key in formData) {
        if (
          key != "pooja_details" &&
          key != "gallery" &&
          key != "festivals" &&
          key != "deity_list"
        ) {
          if (editedFormData[key] != formData[key]) {
            newformData.append(key, formData[key]);
          }
        }
      }
      newformData.append("social_media", JSON.stringify([social_media]));
      if (qrCodeImageFile) {
        newformData.append("upi_qr", qrCodeImageFile);
      }
      if (file) {
        newformData.append("image", file);
      }
      if (formData.deity_list.length > 0) {
        newformData.append("deity_list", JSON.stringify(formData.deity_list));
      } else {
        newformData.append("deity_list", JSON.stringify([]));
      }

      let { data } = await Http.patch(
        `cms/temples/temple-details/${formData.uuid}/`,
        newformData
      );

      if (data.success) {
        if (galleryImageFile) {
          const galleryFormData = new FormData();
          for (const key in galleryImageFile) {
            galleryFormData.append(key, galleryImageFile[key]);
          }
          galleryFormData.append("temple_uuid", formData.uuid);
          if (formData?.gallery?.length > 0) {
            const uuid = formData?.gallery[0].uuid;
            await Http.put(
              `cms/temples/temple-gallery/${uuid}/`,
              galleryFormData
            );
          } else {
            galleryFormData.append("status", "true");
            await Http.post(
              "cms/temples/temple-gallery-details/",
              galleryFormData
            );
          }
          successToast("Temples edited successfully");
          if(admin){
            return router.push("/admin/temples");
          }else{
            return router.push("/dashboard/");
          }
        } else {
          successToast("Temples edited successfully");
          if(admin){
            return router.push("/admin/temples");
          }else{
            return router.push("/dashboard/");
          }
        }
      } else {
        setLoading(false);
        const updatedFormError = { ...formError };
        for (const key in data.data) {
          if (updatedFormError.hasOwnProperty(`${key}_err`)) {
            updatedFormError[`${key}_err`] = data.data[key][0];
          }
        }
        setFormError(updatedFormError);
      }
    } else {
      errorToast("Please enter valid details")

      setFormError({
        ...formError,
        common_err: "Please enter valid details",
      });
    }
  };

  const galleryImageClick = (key) => {
    if (galleryImageRef.current) {
      setReplaceIndex(key);
      galleryImageRef.current.click();
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleQrButtonClick = () => {
    if (fileQrInputRef.current) {
      fileQrInputRef.current.click();
    }
  };

  return (
    <div className={`${Styles["TempleForm"]} w-full  mt-5  `}>
      <h1 className="font-semibold w-full text-center  pt-5 text-2xl underline">
        Edit Temple
      </h1>
      {!loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:mx-20 mx-10 pb-10 pt-5">
          <div className="md:col-span-2 flex justify-center px-5  pt-5">
            <>
              {!selectedImage && !formData.image ? (
                <label htmlFor="file-upload" id="file-drag">
                  <div className=" border border-black w-72  h-40  flex justify-center items-center rounded-lg">
                    <div>
                      <Image
                        height={50} 
                        width={60}
                        src='https://antiquebetabucket.s3.ap-south-1.amazonaws.com/file1704346903055'
                        className="ml-10"
                        alt="file Image"
                      />
                      <h1 className="mt-5">Upload Your image</h1>
                    </div>
                  </div>
                  <span className="text-[red] text-[13px]">
                    {formError.image_err}
                  </span>
                </label>
              ) : (
                <div className=" mt-3 w-[40vh]  min-h-40 flex justify-center items-center rounded-lg">
                  <div className=" relative ">
                    <Image
                      width={300}
                      height={200}
                      src={selectedImage ? selectedImage : formData.image}
                      alt="file Image"
                    />
                    <span className="text-[red] text-[13px]">
                      {formError.image_err}
                    </span>
                    {selectedImage ? (
                      <img
                        onClick={() => removeImage(setFile, setSelectedImage)}
                        className="h-19 w-10 absolute top-0 right-0 cursor-pointer"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc47LHgqc-lC_8J4ZONvbnMe6J2ULlddID1A&usqp=CAU"
                        alt=""
                      />
                    ) : (
                      <div className="flex justify-center mt-3">
                        <Button
                          onClick={handleButtonClick}
                          name="Upload New  Image  "
                          bg={true}
                          tick={false}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <input
                onChange={(e) => handleFileChange(e, "image", "image_err")}
                id="file-upload"
                type="file"
                name="fileUpload"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
              />
            </>
          </div>

          <h1 className="md:col-span-2 font-semibold w-full text-left  text-primary  text-xl underline">
            Main Details<strong className="text-black">*</strong>
          </h1>
          <Input
            err={formError.name_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.name || ""}
            type={"text"}
            title={"Name"}
            name={"name"}
          />
          <Input
            err={formError.email_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.email || ""}
            type={"text"}
            title={"Email"}
            name={"email"}
          />
          <Input
            err={formError.location_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.location || ""}
            type={"text"}
            title={"Location"}
            name={"location"}
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
            err={formError.zipcode_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.zipcode || ""}
            type={"text"}
            title={"zipcode"}
            name={"zipcode"}
          />
          <Input
            err={formError.mobile_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.mobile || ""}
            type={"text"}
            title={"mobile Number"}
            name={"mobile"}
          />
          <Input
            err={formError.map_url_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.map_url || ""}
            type={"text"}
            title={"Google Map Link"}
            name={"map_url"}
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
          <Input
            err={formError.telephone_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.telephone || ""}
            type={"text"}
            title={"telephone Number"}
            name={"telephone"}
          />
          <Input
            err={formError.description_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.description || ""}
            type={"text"}
            title={"Description"}
            name={"description"}
          />

          {/*  */}

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
            err={formError.town_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.town || ""}
            type={"text"}
            title={"Town"}
            name={"town"}
          />
          <Input
            err={formError.website_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.website || ""}
            type={"text"}
            title={"Website Link"}
            name={"website"}
          />

          <h1 className="md:col-span-2  text-primary font-semibold w-full text-left  text-xl underline">
            Deity
          </h1>
          <div className="md:col-span-2 ">
            <Input
              err={formError.deity_err}
              submit={submit}
              handleChange={handleChange}
              value={formData.deity || ""}
              type={"text"}
              title={"Main Deity"}
              name={"deity"}
            />
          </div>

          <div className="  ">
            <div className="flex">
              <Input
                err={formError.deity_list_err}
                submit={true}
                handleChange={(e) => setDeity(e.target.value)}
                value={deity || ""}
                type={"text"}
                title={"Deity"}
                name={"deity"}
              />
              <div className="mt-10 ml-1">
                <Button onClick={addDeity} name="Add" bg={true} tick={false} />
              </div>
            </div>
            {formData?.deity_list?.length > 0 &&
              formData?.deity_list?.map((item, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 p-4 rounded-lg mt-1 flex justify-between"
                >
                  {item}{" "}
                  <div
                    className="text-primary cursor-pointer"
                    onClick={() => removeDeity(index)}
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
            err={formError.account_name_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.account_name || ""}
            type={"text"}
            title={"Account Name"}
            name={"account_name"}
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
            err={formError.bank_name_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.bank_name || ""}
            type={"text"}
            title={"Bank Name"}
            name={"bank_name"}
          />

          <Input
            err={formError.ifsc_code_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.ifsc_code || ""}
            type={"text"}
            title={"IFSC Code"}
            name={"ifsc_code"}
          />
          <Input
            err={formError.upi_id_err}
            submit={submit}
            handleChange={handleChange}
            value={formData.upi_id || ""}
            type={"text"}
            title={"UPI ID"}
            name={"upi_id"}
          />

          <div className="w-full col-span-1">
            <label className="block ">Qr Code</label>

            <input
              onChange={(e) => handleFileChange(e, "upi_qr", "upi_qr_err")}
              className={` ${
                selectedQrCodeImage || formData.upi_qr ? " hidden " : " block "
              }   outline-none py-2 pl-4 w-full bg-transparent border mt-2 rounded-lg border-black`}
              ref={fileQrInputRef}
              id="file-upload"
              type="file"
              name="fileUpload"
              accept="image/*"
            />
            {selectedQrCodeImage || formData.upi_qr ? (
              <div className="w-[40vh] min-h-40 flex justify-center items-center rounded-lg">
                <div className="mt-2 relative">
                  <Image
                    width={150}
                    height={150}
                    src={
                      selectedQrCodeImage
                        ? selectedQrCodeImage
                        : formData.upi_qr
                    }
                    alt="file Image"
                  />
                  {selectedQrCodeImage ? (
                    <img
                      onClick={() =>
                        removeImage(setQrCodeImageFile, setSelectedQrCodeImage)
                      }
                      className="h-19 w-10 absolute top-0 right-0 cursor-pointer"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc47LHgqc-lC_8J4ZONvbnMe6J2ULlddID1A&usqp=CAU"
                      alt=""
                    />
                  ) : (
                    <div className="flex justify-center mt-3">
                      <Button
                        onClick={handleQrButtonClick}
                        name="Upload New  Image  "
                        bg={true}
                        tick={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            <span className="text-[red] text-[13px]">
              {formError.upi_qr_err}
            </span>
          </div>

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
          <h1 className="md:col-span-2 text-primary font-semibold w-full text-left  text-xl underline">
            Social media
          </h1>
          <Input
            err={social_media_err.whatsapp_number_err}
            submit={submit}
            handleChange={handleSocialMediaChange}
            value={social_media.whatsapp_number || ""}
            type={"text"}
            title={"Whatsapp Number"}
            name={"whatsapp_number"}
          />
          <Input
            err={social_media_err.facebook_link_err}
            submit={submit}
            handleChange={handleSocialMediaChange}
            value={social_media.facebook_link || ""}
            type={"text"}
            title={"Facebook Link"}
            name={"facebook_link"}
          />
          <Input
            err={social_media_err.instagram_link_err}
            submit={submit}
            handleChange={handleSocialMediaChange}
            value={social_media.instagram_link || ""}
            type={"text"}
            title={"Instagram Link"}
            name={"instagram_link"}
          />
          <Input
            err={social_media_err.youtube_link_err}
            submit={submit}
            handleChange={handleSocialMediaChange}
            value={social_media.youtube_link || ""}
            type={"text"}
            title={"Youtube Link"}
            name={"youtube_link"}
          />

          <h1 className="md:col-span-2 text-primary font-semibold w-full text-left  text-xl underline">
            Gallery
          </h1>

          <label
            className="md:col-span-2 font-semibold w-full text-left  text-base "
            htmlFor="qr_code"
          >
            Add temple images :-
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
                      <div className="absolute flex gap-2 top-0 right-0 cursor-pointer  m-1 rounded-lg text-primary">
                        <span
                          onClick={() => galleryImageClick(key)}
                          className="bg-white"
                        >
                          {React.createElement(MdFindReplace, { size: "40" })}
                        </span>
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
              className={`${
                galleryImageFile &&
                Object.keys(galleryImageFile).length === 8 &&
                "hidden"
              } outline-none py-2 pl-4 w-full bg-transparent border mt-2 rounded-lg border-black`}
            />

            <span className="text-[red] text-[13px]">
              {formError.gallery_image_err}
            </span>
          </div>
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
          {cropImage && cropImage?.key != "" && cropImage?.image != "" && (
            <CropShow
              setSelectedImg={
                crop
                  ? cropImage.key == "image"
                    ? setSelectedImage
                    : setSelectedQrCodeImage
                  : setSelectedGalleryImage
              }
              setFileImg={
                crop
                  ? cropImage.key == "image"
                    ? setFile
                    : setQrCodeImageFile
                  : setGalleryImageFile
              }
              cropItem={crop}
              cropImage={cropImage}
              setCropImage={setCropImage}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full  h-full">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default EditTempleForm;
