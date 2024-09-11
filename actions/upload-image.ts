"use server";

import { r2client } from "@/lib/R2";
import { extname } from "path";
import { auth, clerkClient } from "@clerk/nextjs/server";
import sharp from 'sharp';

function buf2hex(buffer: ArrayBuffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

//SetUp de Rate Limiting
const userUploads = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5; // 5 uploads por hora
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hora en milisegunndos

function RateLimiting(
  userId: string,
  userUploads: Map<string, { count: number; lastReset: number }>,
  RATE_LIMIT: number,
  RATE_LIMIT_WINDOW: number
) {
  const now = Date.now();
  const userUploadInfo = userUploads.get(userId) || {
    count: 0,
    lastReset: now,
  };
  if (now - userUploadInfo.lastReset > RATE_LIMIT_WINDOW) {
    userUploadInfo.count = 0;
    userUploadInfo.lastReset = now;
  }
  if (userUploadInfo.count >= RATE_LIMIT) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }
  userUploadInfo.count++;
  console.log(userUploadInfo.count);
  userUploads.set(userId, userUploadInfo);
}

export async function actionUploadImage(formData: FormData) {
  // Check user authentication
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  // Check if user's email is verified
  const user = await clerkClient.users.getUser(userId);
  if (
    !user.emailAddresses.some(
      (email) => email.verification?.status === "verified"
    )
  ) {
    throw new Error("Forbidden: Email not verified");
  }

  RateLimiting(userId, userUploads, RATE_LIMIT, RATE_LIMIT_WINDOW);

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
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Validación de contenido de fichero
  const image = sharp(buffer);
  const metadata = await image.metadata();
  if (!['jpeg', 'png', 'webp', 'gif'].includes(metadata.format || '')) {
    throw new Error("Invalid image format. Only JPEG, PNG, WebP, and GIF are allowed.");
  }

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
