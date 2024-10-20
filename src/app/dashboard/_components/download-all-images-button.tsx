'use client';

import { Button } from '@/components/ui/button';
import { Check, DownloadIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function DownloadAllImagesButton({
  event,
  downloadUsed,
}: {
  event: string;
  downloadUsed: number;
}) {
  const [clicked, setClicked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleDownload = async () => {
    setClicked(true);
    try {
      const response = await fetch(`/api/download-all-images?event=${event}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'images.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setCompleted(true);
      } else {
        setClicked(false);
        console.error('Download failed');
      }
    } catch (error) {
      console.error('Error downloading images:', error);
    } finally {
      setClicked(false);
      setCompleted(true);
    }
  };

  if (clicked && !completed) {
    return (
      <Button variant='outline' disabled className='select-none'>
        <Loader2 className='mr-2 size-5 animate-spin' />
        Preparing download...
      </Button>
    );
  }

  if (completed) {
    return (
      <Button variant='outline' disabled className='select-none'>
        <Check className='mr-2 size-5' />
        Download completed
      </Button>
    );
  }

  if (downloadUsed > 1024 ** 2) {
    return (
      <Button variant='outline' disabled className='select-none'>
        <DownloadIcon className='mr-2 size-5' />
        Downloads exceeded, contact support
      </Button>
    );
  }

  return (
    <Button variant='outline' onClick={handleDownload}>
      <DownloadIcon className='mr-2 size-5' />
      Download All Images
    </Button>
  );
}
