import { isAuthorized, isPaused } from '@/db/queries';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { files, pin, planId } = await req.json();
    if (!pin || !planId || !files)
      return new Response('Missing pin, planId or files', { status: 400 });

    const paused = await isPaused(planId);
    if (paused) return new Response('Uploads are paused', { status: 403 });

    const authorized = await isAuthorized(pin, planId);
    if (!authorized) return new Response('Invalid pin', { status: 401 });

    const presignedUrls = await Promise.all(
      files.map(async (file: any) => {
        const params = {
          Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
          Key: file.name,
          ContentType: file.type,
        };

        const command = new PutObjectCommand(params);
        const presignedUrl = await getSignedUrl(client, command, {
          expiresIn: 3600, // 1 hour
        });

        return {
          url: presignedUrl,
          key: file.name,
        };
      }),
    );

    return new NextResponse(JSON.stringify(presignedUrls));
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: 'Error Generating Presigned URL' }),
      { status: 500 },
    );
  }
}
