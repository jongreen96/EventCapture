import { Button } from '@/components/ui/button';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DownloadIcon } from 'lucide-react';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
});

export default async function DownloadImageButton({
  image,
}: {
  image: { url: string; guest: string; key: string };
}) {
  const command = new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
    Key: image.key,
    ResponseContentDisposition: `attachment; filename="${image.key.split('-').pop()}"`,
  });

  const presignedUrl = await getSignedUrl(client, command, {
    expiresIn: 600, // 10 minutes
  });

  return (
    <Button asChild size='icon' variant='outline'>
      <a download href={presignedUrl}>
        <DownloadIcon className='size-5' />
      </a>
    </Button>
  );
}
