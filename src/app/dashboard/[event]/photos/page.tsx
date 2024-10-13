import { Button } from '@/components/ui/button';
import { getUserPlan } from '@/db/queries';
import getSession from '@/lib/getSession';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ImagePreview from '../../_components/image-preview';

export default async function PhotosPage({
  params,
}: {
  params: { event: string };
}) {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plan = await getUserPlan(
    session.user.id,
    decodeURIComponent(params.event),
  );
  if (!plan) redirect('/plans');
  if (plan.images.length === 0) redirect(`/dashboard/${params.event}/overview`);

  return (
    <>
      <Button asChild variant='outline'>
        <Link href={`/dashboard/${params.event}/overview`}>
          <ArrowLeft className='mr-2 size-4' />
          Back to Overview
        </Link>
      </Button>

      <div className='grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2'>
        {plan.images.map((image, index) => (
          <div
            key={index}
            className='relative w-full'
            style={{ paddingTop: '100%' }}
          >
            <ImagePreview key={index} image={image} />
          </div>
        ))}
      </div>
    </>
  );
}
