'use client';

import ImagePreview from '@/app/dashboard/_components/image-preview';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { Plan } from '@/db/schema';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PhotosPageComponent({
  plan,
  event,
}: {
  plan: Plan;
  event: string;
}) {
  const [sort, setSort] = useState<'newest' | 'oldest' | 'guest'>('newest');

  const sortedImages = [...plan.images].sort((a, b) => {
    if (sort === 'newest') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (sort === 'oldest') {
      return a.createdAt.getTime() - b.createdAt.getTime();
    } else if (sort === 'guest') {
      return a.guest.localeCompare(b.guest);
    }
    return 0;
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
          <Link href={`/dashboard/${event}/overview`}>
            <ArrowLeft className='mr-2 size-4' />
            Overview
          </Link>
        </Button>

        <div className='flex items-center gap-2'>
          <Select
            value={sort}
            onValueChange={(value: string) =>
              setSort(value as 'newest' | 'oldest' | 'guest')
            }
          >
            <SelectTrigger className='w-fit'>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='newest'>Most Recent</SelectItem>
              <SelectItem value='oldest'>Oldest</SelectItem>
              <SelectItem value='guest'>Guest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sort === 'guest' ? (
        Object.keys(groupedImages).map((guest, index) => (
          <div key={index}>
            <>
              {guest}
              <Separator className='mb-4' />
            </>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2'>
              {groupedImages[guest].map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className='relative w-full'
                  style={{ paddingTop: '100%' }}
                >
                  <ImagePreview key={imgIndex} image={image} />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2'>
          {sortedImages.map((image, index) => (
            <div
              key={index}
              className='relative w-full'
              style={{ paddingTop: '100%' }}
            >
              <ImagePreview key={index} image={image} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
