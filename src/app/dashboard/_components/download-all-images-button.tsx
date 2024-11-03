'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Check, DownloadIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function DownloadAllImagesButton({
  event,
  guest,
}: {
  event: string;
  guest?: string;
}) {
  const [clicked, setClicked] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [filesToDownload, setFilesToDownload] = useState(0);

  const handleDownload = async () => {
    setClicked(true);
    try {
      const response = await fetch(`/api/download-images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, guest }),
      });

      if (response.ok) {
        const presignedUrls = (await response.json()) as {
          key: string;
          url: string;
        }[];

        setFilesToDownload(presignedUrls.length);

        const zip = new JSZip();

        for (const url of presignedUrls) {
          const response = await fetch(url.url);
          const blob = await response.blob();
          const filename = url.key.split('/').pop()?.slice(6) || 'image';
          zip.file(filename, blob);
          setFilesToDownload((prev) => prev - 1);
        }

        setFinalizing(true);

        await zip.generateAsync({ type: 'blob' }).then((content) => {
          saveAs(content, `${guest ? guest + '-' + event : event}.zip`);
        });

        setCompleted(true);
      } else {
        setClicked(false);
        console.error('Download failed');
      }
    } catch (error) {
      console.error('Error downloading images:', error);
    } finally {
      setClicked(false);
      setFinalizing(false);
      setCompleted(true);
    }
  };

  if (finalizing) {
    return (
      <Button variant='outline' disabled className='select-none'>
        <Loader2 className='mr-2 size-5 animate-spin' />
        Finalizing download
      </Button>
    );
  }

  if (clicked && !completed) {
    return (
      <Button variant='outline' disabled className='select-none'>
        <Loader2 className='mr-2 size-5 animate-spin' />
        {filesToDownload || 'Estimating'} Images downloading
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

  return (
    <Button
      variant='outline'
      onClick={handleDownload}
      size={guest ? 'icon' : 'default'}
      className={cn('flex items-center gap-2', guest && 'aspect-square')}
    >
      <DownloadIcon className='size-5' />
      {!guest && 'Download All'}
    </Button>
  );
}
