import Image from "next/image";

import useModal from "@/hooks/useModal";

import { useToast } from "@/components/ui/use-toast";

import BinIcon from "../../../assets/icons/common/bin.svg";
import UploadFileIcon from "../../../assets/icons/common/upload-file";

import { TagColors } from "@/constants/Colors";

import { ImageUploadWrapper } from "./imageUpload.style";

const ImageUpload = ({ maxImages }: { maxImages: number }) => {
  const { toast } = useToast();
  const { images, setImages } = useModal();

  const setToast = (
    toastName: string,
    title?: string,
    description?: string,
    duration?: number
  ) => {
    toast({
      title,
      toastName,
      description,
      duration,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];

    if (selectedFiles.length + images.length > maxImages) {
      setToast(
        "error",
        undefined,
        `You can only upload ${maxImages} ${maxImages === 1 ? 'image' : 'images'}` || undefined
      );
      return;
    }

    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleUploadButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    (document.querySelector(".input") as HTMLInputElement)?.click();
  };

  return (
    <ImageUploadWrapper>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="input"
        style={{ display: "none" }}
      />
      <div className="image-preview">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <Image
              src={URL.createObjectURL(image)}
              alt={`preview ${index + 1}`}
              width={100}
              height={100}
              className="image"
            />
            <div className="bin-icon" onClick={() => removeImage(index)}>
              <Image src={BinIcon} alt="delete" />
            </div>
          </div>
        ))}
      </div>
      <button className="upload-button" onClick={handleUploadButtonClick}>
        <UploadFileIcon stroke={TagColors.text} />
        Upload Images
      </button>
    </ImageUploadWrapper>
  );
};

export default ImageUpload;
