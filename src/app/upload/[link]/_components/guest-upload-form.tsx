'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { OTPInput } from 'input-otp';
import { Loader2Icon } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import ImageInput from './image-input';
import ImageList from './image-list';

export default function GuestUpload({
  planPreview,
  link,
}: {
  planPreview: {
    id: string;
    eventName: string;
    pin: boolean;
    pauseUploads: boolean;
  };
  link: string;
}) {
  const planId = planPreview.id;
  const [files, setFiles] = useState<FileList | null>(null);
  const [guest, setGuest] = useState<string>('');
  const [pin, setPin] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!files) {
      setErrorMessage('Please select files to upload');
      return;
    } else if (!guest) {
      setErrorMessage('Please enter your name');
      return;
    } else if (planPreview.pin && !pin) {
      setErrorMessage('Please enter the pin');
      return;
    } else if (planPreview.pauseUploads) {
      setErrorMessage('Uploads are paused');
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);

    const fileMetadata = Array.from(files).map((file) => ({
      name: planId + '/' + nanoid(5) + '-' + file.name,
      type: file.type,
    }));

    const res = await fetch('/api/r2-presigned-url', {
      method: 'POST',
      body: JSON.stringify({
        files: fileMetadata,
        pin,
        planId,
      }),
    });

    if (res.status === 401) {
      setErrorMessage('Incorrect Pin');
      setIsUploading(false);
      return;
    } else if (res.status === 403) {
      setErrorMessage('Uploads are paused');
      setIsUploading(false);
      return;
    }

    const presignedUrls = await res.json();

    let completedUploads = 0;
    await Promise.all(
      Array.from(files).map(async (file, index) => {
        const { url, key } = presignedUrls[index];

        // Upload the file to R2
        await fetch(url, {
          method: 'PUT',
          body: file,
        });

        // Create preview image on server
        await fetch('/api/create-preview', {
          method: 'POST',
          body: JSON.stringify({
            key,
          }),
        });

        // Add image to database
        await fetch('/api/add-image', {
          method: 'POST',
          body: JSON.stringify({
            planId,
            guest,
            url: key,
            key: fileMetadata[index].name,
          }),
        });

        completedUploads += 1;
        setUploadProgress((completedUploads / files.length) * 100);
      }),
    );

    setCompleted(true);
    setIsUploading(false);
  };

  return (
    <Card className='min-w-80 text-center'>
      <CardHeader>
        <CardTitle>{planPreview.eventName}</CardTitle>
        <CardDescription>Upload your photos here</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='flex flex-col items-center gap-4'
        >
          <ImageInput files={files} setFiles={setFiles} />

          <ImageList files={files} />

          {planPreview.pin && (
            <div className='flex w-full items-center justify-between'>
              <Label htmlFor='pin'>Pin:</Label>
              <OTPInput
                maxLength={4}
                name='pin'
                value={pin}
                onChange={setPin}
                id='pin'
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </OTPInput>
            </div>
          )}

          <div className='flex w-full items-center justify-between'>
            <Label htmlFor='name'>Name:</Label>
            <Input
              type='text'
              placeholder='John Doe'
              id='name'
              name='name'
              className='w-40 text-ellipsis'
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            />
          </div>

          {isUploading && (
            <Progress className='w-full' value={uploadProgress} max={100} />
          )}

          <Button
            className={cn('w-full', completed && 'disabled:opacity-100')}
            type='submit'
            disabled={isUploading || completed || planPreview.pauseUploads}
          >
            {completed ? (
              'Completed'
            ) : isUploading ? (
              <p className='flex items-center gap-2'>
                <Loader2Icon className='h-4 w-4 animate-spin' />
                Uploading...
              </p>
            ) : (
              'Upload'
            )}
          </Button>
        </form>

        {errorMessage && <p className='mt-4 text-red-500'>{errorMessage}</p>}
      </CardContent>
    </Card>
  );
}
