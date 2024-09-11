"use server";

import { r2client } from "@/lib/R2";
import { extname } from "path";
import { auth, clerkClient } from "@clerk/nextjs/server";


function buf2hex(buffer: ArrayBuffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
}

export async function actionUploadImage(formData: FormData) {

  // Check user authentication
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  // Check if user's email is verified
  const user = await clerkClient.users.getUser(userId);
  if (!user.emailAddresses.some(email => email.verification?.status === "verified")) {
    throw new Error("Forbidden: Email not verified");
  }
  
  const fileField = formData.get("file");
  if (fileField === null) {
    throw new Error(`Missing 'file' field in form`);
  }
  const object = fileField.valueOf();
  if (typeof object === "string") {
    throw new Error(`'file' is not an object (it is a string)`);
  }

  // Obtener buffer del fichero
  const file = object as File;
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes);

  // Calcula hash del fichero para el nombre
  const hashBytes = await crypto.subtle.digest("SHA-256", buffer);
  const hash = buf2hex(hashBytes);

  //Nombre del Fichero
  const extension = extname(file.name);
  const uploadFilename = `${userId}/${hash}${extension}`;

  //Enviamos el fichero a r2
  await r2client.uploadFile(uploadFilename, buffer);
  
  return uploadFilename;
}