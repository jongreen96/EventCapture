'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DownloadIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DownloadAllImagesButton({
  event,
  guest,
}: {
  event: string;
  guest?: string;
}) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const getDownloadUrl = async () => {
    const res = await fetch(
      `/api/create-download?event=${event}${guest ? `&guest=${guest}` : ''}`,
    );
    const downloadUrl = await res.text();
    setDownloadUrl(downloadUrl);
  };

  //   return (
  //     <Button
  //       variant='outline'
  //       onClick={getDownloadUrl}
  //       size={guest ? 'icon' : 'default'}
  //       className={cn('flex items-center gap-2', guest && 'aspect-square')}
  //     >
  //       <DownloadIcon className='size-5' />
  //       {!guest && 'Download All'}
  //     </Button>
  //   );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          onClick={getDownloadUrl}
          size={guest ? 'icon' : 'default'}
          className={cn('flex items-center gap-2', guest && 'aspect-square')}
        >
          <DownloadIcon className='size-5' />
          {!guest && 'Download All'}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Download All {guest ? guest.split(' ')[0] + `'s` : ''} Images
          </DialogTitle>
        </DialogHeader>

        <DownloadButton downloadUrl={downloadUrl} />
      </DialogContent>
    </Dialog>
  );
}

function DownloadButton({ downloadUrl }: { downloadUrl: string | null }) {
  if (!downloadUrl)
    return (
      <Button variant='outline' disabled>
        <Loader2 className='animate-spin' />
        <span className='ml-2'>Generating Download Link</span>
      </Button>
    );

  return (
    <div className='space-y-4'>
      <Button asChild variant='default' className='w-full'>
        <Link
          href={process.env.NEXT_PUBLIC_BASE_URL + 'download/' + downloadUrl}
          target='_blank'
        >
          Download
        </Link>
      </Button>

      <div>
        <Label htmlFor='share'>Share download link with others:</Label>
        <Input
          id='share'
          value={process.env.NEXT_PUBLIC_BASE_URL + 'download/' + downloadUrl}
          readOnly
        />
      </div>
    </div>
  );
}
