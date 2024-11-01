import { getUserPlan } from '@/db/queries';
import getSession from '@/lib/getSession';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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

  const images = plan.images.filter((image) =>
    guest ? image.guest === guest : true,
  );

  const presignedUrls = await Promise.all(
    images.map(async (image) => {
      const params = {
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
        Key: image.key,
      };

      const command = new GetObjectCommand(params);
      const presignedUrl = await getSignedUrl(client, command, {
        expiresIn: 3600, // 1 hour
      });

      return { key: image.key, url: presignedUrl };
    }),
  );

  return new Response(JSON.stringify(presignedUrls));
}
