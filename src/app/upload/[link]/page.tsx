import { getPlanPreview } from '@/db/queries';
import { redirect } from 'next/navigation';
import GuestUpload from './_components/guest-upload';

export default async function UploadPage({
  params,
}: {
  params: { link: string };
}) {
  const plan = await getPlanPreview(params.link);
  if (!plan) redirect('/');

  return <GuestUpload planPreview={plan} link={params.link} />;
}
