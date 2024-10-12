'use client';

import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { Plan } from '@/db/schema';
import { CheckCircle } from 'lucide-react';
import { QRCodeSVG as QR } from 'qrcode.react';
import { useState } from 'react';
import Pin from './pin';

export default function ShareUploadLinkDialog({ plan }: { plan: Plan }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className='flex flex-col gap-2 text-center'>
      <DialogTitle className='text-center text-2xl font-bold'>
        Share Upload Link
      </DialogTitle>
      <DialogDescription className=''>
        Share this link with your guests to upload photos and videos to this
        event.
      </DialogDescription>

      <div className='flex w-full justify-center'>
        <QR
          value={process.env.NEXT_PUBLIC_BASE_URL + 'upload/' + plan.url}
          size={256}
          marginSize={1}
          className='rounded-lg'
        />
      </div>

      <Pin plan={plan} />

      <p>Copy and share to guests</p>
      <div className='flex items-center gap-2'>
        <Input
          value={process.env.NEXT_PUBLIC_BASE_URL + 'upload/' + plan.url}
          readOnly
        />
        <Button
          disabled={copied}
          onClick={() => {
            navigator.clipboard.writeText(
              process.env.NEXT_PUBLIC_BASE_URL + 'upload/' + plan.url,
            );
            setCopied(true);
          }}
          className='w-24'
        >
          {copied ? <CheckCircle className='h-4 w-4' /> : 'Copy Link'}
        </Button>
      </div>
    </div>
  );
}
