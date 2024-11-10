import { createDownloadUrl, getDownloadUrl, getUserPlan } from '@/db/queries';
import getSession from '@/lib/getSession';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Archiver from 'archiver';
import { NextRequest } from 'next/server';
import stream from 'stream';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const event = searchParams.get('event');
  if (!event) return new Response('Event Required', { status: 400 });
  const guest = searchParams.get('guest');

  const session = await getSession();
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });

  const plan = await getUserPlan(session.user.id, decodeURIComponent(event));
  if (!plan) return new Response('Plan not found', { status: 404 });

  const images = plan.images.filter((image) =>
    guest ? image.guest === guest : true,
  );

  const Key = `${images[0].key.split('/')[0]}/download${guest ? `-${guest}` : ''}.zip`;

  const downloadUrl = await getDownloadUrl(Key);
  if (downloadUrl) return new Response(downloadUrl);

  console.time('create-download');

  const passThroughStream = new stream.PassThrough();
  const archive = Archiver('zip', {
    zlib: { level: 9 },
  });

  archive.on('error', (err: any) => {
    throw err;
  });

  archive.on('warning', function (err: any) {
    if (err.code === 'ENOENT') {
    } else {
      throw err;
    }
  });

  archive.pipe(passThroughStream);

  for (const image of images) {
    const res = await fetch(image.url);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    archive.append(buffer, { name: image.key });
  }

  archive.finalize();

  const Body = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    passThroughStream.on('data', (chunk) => chunks.push(chunk));
    passThroughStream.on('end', () => resolve(Buffer.concat(chunks)));
    passThroughStream.on('error', reject);
  });

  console.timeEnd('create-download');
  console.time('upload');

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
      Key,
      Body,
      ContentType: 'application/zip',
    }),
  );

  console.timeEnd('upload');

  // Create presigned URL
  const presignedUrl = await getSignedUrl(
    client,
    new GetObjectCommand({ Bucket: process.env.CLOUDFLARE_BUCKET_NAME!, Key }),
    { expiresIn: 60 * 60 },
  );

  const newDownloadUrl = await createDownloadUrl(Key, presignedUrl);

  return new Response(newDownloadUrl);
}
