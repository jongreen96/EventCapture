import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Image from 'next/image';
import DeleteImageButton from './delete-image-button';

export default function ImagePreview({
  image,
}: {
  image: { url: string; guest: string; key: string };
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={image.url}
          alt={image.guest}
          className='h-full w-full cursor-pointer rounded-md object-cover'
          fill
          sizes='80px'
        />
      </DialogTrigger>
      <DialogContent className='size-fit max-w-[100vw] overflow-hidden p-0'>
        <DialogHeader className='flex-row items-center justify-between p-4'>
          <div>
            <DialogTitle className='font-normal'>Uploaded by</DialogTitle>
            <DialogDescription>{image.guest}</DialogDescription>
          </div>
          <div className='flex items-center gap-2'>
            <DeleteImageButton image={image} />

            <DialogClose asChild>
              <Button variant='secondary' size='icon'>
                <X className='size-5' />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.url}
            alt={image.guest}
            className='max-h-[70dvh] max-w-[95vw] object-contain sm:max-w-[70vw]'
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
