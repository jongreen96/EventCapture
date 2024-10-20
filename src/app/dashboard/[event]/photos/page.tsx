import ImagePreview from '@/app/dashboard/_components/image-preview';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { getUserPlan } from '@/db/queries';
import getSession from '@/lib/getSession';
import { ArrowLeft, SortDesc } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DownloadAllImagesButton from '../../_components/download-all-images-button';

export default async function PhotosPage({
  params,
  searchParams,
}: {
  params: { event: string };
  searchParams: URLSearchParams;
}) {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plan = await getUserPlan(
    session.user.id,
    decodeURIComponent(params.event),
  );
  if (!plan) redirect('/plans');
  if (plan.images.length === 0) redirect(`/dashboard/${params.event}/overview`);
  const sort = searchParams['sort'] as unknown as 'oldest' | 'guest';

  const sortedImages = [...plan.images].sort((a, b) => {
    if (sort === 'oldest') {
      return a.createdAt.getTime() - b.createdAt.getTime();
    } else if (sort === 'guest') {
      return a.guest.localeCompare(b.guest);
    } else {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const groupedImages = sortedImages.reduce(
    (acc, image) => {
      if (!acc[image.guest]) {
        acc[image.guest] = [];
      }
      acc[image.guest].push(image);
      return acc;
    },
    {} as Record<string, typeof sortedImages>,
  );

  return (
    <>
      <div className='flex items-center justify-between'>
        <Button asChild variant='outline'>
          <Link href={`/dashboard/${params.event}/overview`}>
            <ArrowLeft className='mr-2 size-4' />
            Overview
          </Link>
        </Button>

        <div className='flex items-center gap-2'>
          <DownloadAllImagesButton
            event={plan.eventName}
            downloadUsed={plan.downloadUsed}
          />

          <Select>
            <SelectTrigger>
              <SortDesc className='mr-2 size-4' />
              <SelectValue placeholder={sort || 'Most Recent'}>
                {sort || 'Most Recent'}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <div className='flex flex-col gap-2'>
                <Link href={`/dashboard/${params.event}/photos`}>
                  <Button variant='ghost' className='w-full justify-start'>
                    Most Recent
                  </Button>
                </Link>

                <Link href={`/dashboard/${params.event}/photos?sort=oldest`}>
                  <Button variant='ghost' className='w-full justify-start'>
                    Oldest
                  </Button>
                </Link>

                <Link
                  href={`/dashboard/${params.event}/photos?sort=guest`}
                  className='w-full'
                >
                  <Button variant='ghost' className='w-full justify-start'>
                    Guest
                  </Button>
                </Link>
              </div>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sort === 'guest' ? (
        Object.keys(groupedImages).map((guest, index) => (
          <div key={index}>
            <div className='flex items-center gap-2 pb-2'>
              {guest}
              <Separator className='shrink' />
              <DownloadAllImagesButton
                event={plan.eventName}
                downloadUsed={plan.downloadUsed}
                guest={guest}
              />
            </div>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2'>
              {groupedImages[guest].map((image, imgIndex) => (
                <div key={imgIndex} className='relative w-full'>
                  <ImagePreview key={imgIndex} image={image} />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2'>
          {sortedImages.map((image, index) => (
            <div key={index} className='relative w-full'>
              <ImagePreview key={index} image={image} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
