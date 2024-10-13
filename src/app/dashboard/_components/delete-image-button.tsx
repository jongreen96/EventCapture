import { deleteImageAction } from '@/app/actions';
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
import { Trash2Icon } from 'lucide-react';

export default async function DeleteImageButton({
  image,
}: {
  image: { url: string; guest: string; key: string };
}) {
  return (
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

        <form action={deleteImageAction}>
          <AlertDialogFooter>
            <input type='hidden' name='url' value={image.url} />
            <input type='hidden' name='key' value={image.key} />

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
