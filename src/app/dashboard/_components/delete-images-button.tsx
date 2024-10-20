'use client';

import { deleteImagesAction } from '@/app/actions';
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
import { Loader2, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

export default function DeleteImagesButton({
  guest,
  eventName,
}: {
  guest: string;
  eventName: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      await deleteImagesAction(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          className='aspect-square bg-destructive/40 hover:bg-destructive/80'
          disabled={loading}
        >
          {loading ? (
            <Loader2 className='size-5 animate-spin' />
          ) : (
            <Trash2Icon className='size-5' />
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className='w-fit'>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete all {guest}&apos;s Images</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete all images from {guest}?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <input type='hidden' name='guest' value={guest} />
            <input type='hidden' name='eventName' value={eventName} />

            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type='submit'
              className='bg-destructive text-white hover:bg-destructive/60'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
