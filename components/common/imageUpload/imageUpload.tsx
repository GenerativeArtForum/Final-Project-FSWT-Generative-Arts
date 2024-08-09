import Image from "next/image";
import { useState } from "react";
import BinIcon from "../../../assets/icons/common/bin";
import useThreadModal from "@/hooks/useThreadModal";
import { ImageUploadWrapper } from "./imageUpload.style";
import UploadFileIcon from "../../../assets/icons/common/upload-file";
import { TagColors } from "@/constants/Colors";

const MAX_IMAGES = 4;
const FEEDBACK_DURATION = 3000;

const ImageUpload = () => {
  const { images, setImages } = useThreadModal();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];

    if (selectedFiles.length + images.length > MAX_IMAGES) {
      setFeedback(`You can only upload ${MAX_IMAGES} images`);
      setTimeout(() => setFeedback(null), FEEDBACK_DURATION);
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
      {feedback && <div className="feedback">{feedback}</div>}
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
            <BinIcon className="bin-icon" onClick={() => removeImage(index)} />
          </div>
        ))}
      </div>
      <button className="upload-button" onClick={handleUploadButtonClick}>
        <UploadFileIcon stroke={TagColors.text}/>
        Upload Images
      </button>
    </ImageUploadWrapper>
  );
};

export default ImageUpload;
