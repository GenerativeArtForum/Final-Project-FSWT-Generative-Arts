import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/lib/env";
import { extname } from "path";

const mimeTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

class R2Client {
  s3client: S3Client;
  bucket: string;

  constructor({ bucket }: { bucket: string }) {
    this.s3client = new S3Client({
      region: env("R2_REGION"),
      credentials: {
        accessKeyId: env("R2_ACCESS_KEY"),
        secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
      },
      endpoint: env("R2_ENDPOINT"),
    });
    this.bucket = bucket;
  }

  async getPresignedUrl(filename: string) {
    const extension = extname(filename);
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: filename,
      ContentType: mimeTypes[extension] || "application/octet-stream",
    });

    return getSignedUrl(this.s3client, command, { expiresIn: 3600 });
  }

  destroy() {
    this.s3client.destroy();
  }
}

export const r2client = new R2Client({
  bucket: env("R2_BUCKET"),
});