"use client";

import { actionUploadImage } from "@/actions/upload-image";
import { useState } from "react";
import Image from "next/image";


export default function Page() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const upload = async (formData: FormData) => {
    try {
      const filename = await actionUploadImage(formData);
      const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
      setImageUrl(`${publicUrl}/${filename}`);
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
          <Image src={imageUrl} alt="test image" width={500} height={300} />
        )}
      </form>
    </main>
  );
}