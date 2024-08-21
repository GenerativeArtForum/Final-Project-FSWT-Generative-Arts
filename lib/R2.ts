import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { extname } from "path";
import { env } from "@/lib/env";
import { readFile } from "fs/promises";

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
  
    async uploadFile(filename: string, buffer: Buffer) {
      const extension = extname(filename);
      await this.s3client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: filename,
          Body: buffer,
          ACL: "public-read",
          ContentType: mimeTypes[extension] || "application/octet-stream",
        })
      );
    }
  
    destroy() {
      this.s3client.destroy();
    }
  }
  
  //Generates the R2Client
  export const r2client = new R2Client({
    bucket: env("R2_BUCKET"),
  });
