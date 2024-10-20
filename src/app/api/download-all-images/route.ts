import { addDownloadUsage, getUserPlan } from '@/db/queries';
import getSession from '@/lib/getSession';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import JSZip from 'jszip';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
});

export async function POST(req: Request) {
  const { event, guest } = await req.json();
  const session = await getSession();
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });

  const plan = await getUserPlan(session.user.id, decodeURIComponent(event));
  if (!plan) return new Response('Plan not found', { status: 404 });

  if (plan.plan !== 'enterprise' && plan.downloadUsed > 1024 ** 2) {
    return new Response('Downloads exeeded, contact support', { status: 403 });
  }

  const images = plan.images.filter((image) =>
    guest ? image.guest === guest : true,
  );

  // Download all images from R2 via s3 api and return a zip file
  const imageBlobs = await Promise.all(
    images.map(async (image) => {
      const command = new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
        Key: image.key,
      });

      const response = await client.send(command);
      const blob = await response.Body?.transformToByteArray();
      return {
        blob,
        key: image.key,
        guest: image.guest,
        createdAt: image.createdAt,
      };
    }),
  );

  // Create a zip file
  const zip = new JSZip();

  imageBlobs.forEach((image, index) => {
    if (image.blob) {
      const date = new Date(image.createdAt)
        .toLocaleString('en-GB', { hour12: false })
        .replace(/\//g, '-')
        .replace(/, /g, '_')
        .replace(/:/g, '-');

      zip.file(
        `${image.guest}/${date}_${image.key.split('/')[1].slice(6)}`,
        image.blob,
      );
    }
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });

  const downloadSize =
    images.reduce((acc, image) => acc + image.size, 0) / 1024 ** 2;
  await addDownloadUsage(session.user.id, plan.eventName, downloadSize);

  return new Response(zipBlob, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${event}.zip"`,
    },
  });
}
