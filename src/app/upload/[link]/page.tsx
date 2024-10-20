import { getPlanPreview } from '@/db/queries';
import { redirect } from 'next/navigation';
import GuestUpload from './_components/guest-upload-form';

export default async function UploadPage({
  params,
}: {
  params: { link: string };
}) {
  const plan = await getPlanPreview(params.link);
  if (!plan) redirect('/');

  return (
    <main className='flex min-h-[calc(100vh-52px)] items-center justify-center'>
      <GuestUpload planPreview={plan} link={params.link} />
    </main>
  );
}
