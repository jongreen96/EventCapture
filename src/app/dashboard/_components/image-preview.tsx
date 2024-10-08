'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2Icon, X } from 'lucide-react';
import Image from 'next/image';

export default function ImagePreview({
  image,
}: {
  image: { url: string; guest: string };
}) {
  // TODO: Handle image deletion

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={image.url}
          alt={image.guest}
          className='h-full w-full rounded-md object-cover'
          fill
          sizes='80px'
        />
      </DialogTrigger>
      <DialogContent className='size-fit max-w-[100vw] overflow-hidden p-0'>
        <DialogHeader className='flex-row items-center justify-between p-4'>
          <DialogTitle className='font-normal'>
            Uploaded by {image.guest}
          </DialogTitle>
          <div className='flex items-center gap-2'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size='icon' variant='outline'>
                  <Trash2Icon className='size-5' />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className='w-fit'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Image</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this image?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className='bg-destructive text-white hover:bg-destructive/60'>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

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
