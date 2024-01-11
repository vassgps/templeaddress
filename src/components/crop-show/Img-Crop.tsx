import React, { useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { IoMdCloseCircle } from "react-icons/io";
import Button from "../ui/button/Button";

interface Props {
  cropImage: { image: string; key: string };
  setCropImage: any;
  setSquare?:React.Dispatch<React.SetStateAction<any>>;
  square?:boolean;
  cropItem: boolean;
  setSelectedImg: React.Dispatch<React.SetStateAction<any>>;
  setFileImg: React.Dispatch<React.SetStateAction<any>>;
}
const ASPECT_RATIO = 2;
const MIN_DIMENSION = 150;

const Cropper: React.FC<Props> = ({
  cropImage,
  setFileImg,
  setSelectedImg,
  setCropImage,
  cropItem,
  square,
  setSquare
}) => {
  const [error, setError] = useState("");
  const [aspect, setAspect] = useState(square?1:cropImage.key == "upi_qr" ? 1 : 2);
  useEffect(()=>{
    setAspect(square?1:cropImage.key == "upi_qr" ? 1 : 2)
    
  },[cropImage.key])

  const [crop, setCrop] = useState<any>({
    unit: "%",
    aspect: ASPECT_RATIO,
  });
  const [image, setImage] = useState<any>(null);

  const cropImageNow = () => {
    if (!crop?.height||!crop?.width||crop.width < 100 ) {
      setError(`Minimum dimension for crop is ${100}px`);
      return;
    }
    setError("");

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx: any = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    canvas.toBlob((blob) => {
      const croppedFile = new File([blob], "cropped-image.webp", {
        type: "image/webp",
      });

      if (cropItem) {
        setFileImg(croppedFile);
        setSelectedImg(base64Image);
        setCropImage(null);
        if(square){
          setSquare(false)
        }
      } else {
        setSelectedImg((prevSelectedGalleryImage) => {
          const updatedGalleryImageImage = { ...prevSelectedGalleryImage };
          updatedGalleryImageImage[cropImage.key] = base64Image;
          return updatedGalleryImageImage;
        });
        setFileImg((prevGalleryImageFile) => {
          const updatedGalleryImageFile = { ...prevGalleryImageFile };
          updatedGalleryImageFile[cropImage.key] = croppedFile;
          return updatedGalleryImageFile;
        });
        setCropImage(null);
        if(square){
          setSquare(false)
        }
      }
      
    }, "image/jpeg");
  };

  return (
    <div className="fixed top-0 inset-0 z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute md:w-1/3 border-2 border-primary rounded-xl md:h-[65vh] h-96 p-5 overflow-hidden  bg-white z-50 justify-center items-center w-full">
        <div className="flex text-primary cursor-pointer w-full justify-end">
          <span onClick={() =>{ setCropImage(null);square&&setSquare(false)}}>
            {React.createElement(IoMdCloseCircle, { size: "30" })}
          </span>
        </div>
        {cropImage && cropImage.image && (
          <div className="flex justify-center">
            <div className="">
              <ReactCrop
                maxHeight={400}
                aspect={aspect}
                minWidth={square?150:MIN_DIMENSION}
                crop={crop}
                onChange={setCrop}
                
              >
                <img
                  className="h-64 md:h-80	 w-full"
                  src={cropImage.image}
                  onLoad={(e) => setImage(e.target)}
                  alt="Your Alt Text"
                />
              </ReactCrop>
              <br />
              {error && <small className="text-red-500 text-center">{error}</small>}
              <div className="flex justify-center">
                <Button
                  name="Crop Image"
                  onClick={cropImageNow}
                  bg={true}
                  tick={false}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cropper;
