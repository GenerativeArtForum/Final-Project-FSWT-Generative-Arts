"use client";

import { actionUploadImage } from "@/actions/upload-image";
import { useState } from "react";
import Image from "next/image";
import ImageOverlay from "@/components/common/image/ImageOverlay";

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const upload = async (formData: FormData) => {
    try {
      const { presignedUrl, imageUrl } = await actionUploadImage(formData);
      
      // Upload the file using the presigned URL
      const file = formData.get("file") as File;
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
      setImageUrl(`${imageUrl}`);
    } catch (e: any) {
      setMessage(`Error: ${e.toString()}`);
    }
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <form action={upload}>
        <h2>Upload image</h2>
        <label>
          <span className="mr-3">Image</span>
          <input type="file" name="file" />
        </label>
        <div>
          <button>Upload</button>
        </div>
        <div className="mt-2">{message}</div>
        {imageUrl && (
          <ImageOverlay src={imageUrl} alt="test image" width={500} height={300} />
        )}
      </form>
    </main>
  );
}