"use server";

import { r2client } from "@/lib/R2";
import { extname } from "path";
import { auth, clerkClient } from "@clerk/nextjs/server";
import sharp from 'sharp';

function buf2hex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

const userUploads = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function RateLimiting(
  userId: string,
  userUploads: Map<string, { count: number; lastReset: number }>,
  RATE_LIMIT: number,
  RATE_LIMIT_WINDOW: number
) {
  // ... (keep the existing RateLimiting function)
}

export async function actionUploadImage(imageFile: File) {
  
  console.log('imagefile ', imageFile);
  
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }


  const user = await clerkClient.users.getUser(userId);
  if (
    !user.emailAddresses.some(
      (email) => email.verification?.status === "verified"
    )
  ) {
    throw new Error("Forbidden: Email not verified");
  }

  RateLimiting(userId, userUploads, RATE_LIMIT, RATE_LIMIT_WINDOW);

  const fileField = imageFile;
  if (fileField === null) {
    throw new Error(`Missing 'file' field in form`);
  }
  const object = fileField.valueOf();
  if (typeof object === "string") {
    throw new Error(`'file' is not an object (it is a string)`);
  }

  const file = object as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const image = sharp(buffer);
  const metadata = await image.metadata();
  if (!['jpeg', 'png', 'webp', 'gif'].includes(metadata.format || '')) {
    throw new Error("Invalid image format. Only JPEG, PNG, WebP, and GIF are allowed.");
  }

  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error("File size exceeds the maximum limit of 5MB.");
  }

  const hashBytes = await crypto.subtle.digest("SHA-256", buffer);
  const hash = buf2hex(hashBytes);

  const extension = extname(file.name);
  const uploadFilename = `${userId}/${hash}${extension}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${uploadFilename}`;

  const presignedUrl = await r2client.getPresignedUrl(uploadFilename);

  return { presignedUrl, imageUrl };
}