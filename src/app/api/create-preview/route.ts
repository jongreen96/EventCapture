import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { NextRequest } from 'next/server';
import Sharp from 'sharp';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
});

export async function POST(req: NextRequest) {
  const { key } = await req.json();
  if (!key) return new Response('Missing key', { status: 400 });

  const { Body } = await client.send(
    new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
      Key: key,
    }),
  );
  if (!Body) return new Response('File not found', { status: 404 });

  // Create preview image
  const previewImage = await Sharp(await Body.transformToByteArray())
    .rotate()
    .resize(80, 80, {
      fit: 'cover',
      position: 'center',
    })
    .toFormat('webp')
    .toBuffer();

  // Upload preview
  await client.send(
    new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
      Key: `${key}-preview.webp`,
      Body: previewImage,
      ContentType: 'image/webp',
    }),
  );

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
