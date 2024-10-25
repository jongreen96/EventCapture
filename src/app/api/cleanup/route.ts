import { deleteSpecificImage, getExpiredPlans } from '@/db/queries';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
});

export async function GET() {
  console.log('Running cleanup');

  const expiredPlans = await getExpiredPlans();

  expiredPlans.forEach(async (plan) => {
    await Promise.all(
      plan.images.map(async (image) => {
        const command = new DeleteObjectCommand({
          Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
          Key: image.key,
        });
        const command2 = new DeleteObjectCommand({
          Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
          Key: image.key + '-preview.webp',
        });

        await client.send(command);
        await client.send(command2);

        await deleteSpecificImage(image.key);
      }),
    );
  });

  console.log('Cleanup completed. Deleted', expiredPlans.length, 'plans');

  return new Response('Cleanup done');
}
