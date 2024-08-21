import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { extname } from "path";
import { env } from "@/lib/env";
import { readFile } from "fs/promises";


const bucket = env("R2_BUCKET");

const client = new S3Client({
    region: env("R2_REGION"),
    credentials: {
        accessKeyId: env("R2_ACCESS_KEY"),
        secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
    },
    endpoint: env("R2_ENDPOINT"),
});

const command = new PutObjectCommand({
    Bucket: bucket,
    Key: "test",
    Body: await readFile("bun.lockb"),
    ACL: "public-read",
    ContentType: "application/octet-stream",
});

await client.send(command);

client.destroy();