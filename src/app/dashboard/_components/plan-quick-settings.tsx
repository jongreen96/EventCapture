'use client';

import { rollUploadLinkAction, updatePauseAction } from '@/app/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Plan } from '@/db/schema';
import { Lock, Pause, Settings, Share2 } from 'lucide-react';
import { useState } from 'react';
import SetPin from './set-pin';
import ShareUploadLinkDialog from './share-upload-link-dialog';

export default function PlanQuickSettings({ plan }: { plan: Plan }) {
  const [openPinDialog, setOpenPinDialog] = useState(false);
  const [openRollDialog, setOpenRollDialog] = useState(false);

  return (
    <div className='flex flex-row-reverse items-center justify-end gap-2 md:flex-row'>
      {/* TODO: Add Sonner */}
      {plan.pauseUploads && (
        <HoverCard>
          <HoverCardTrigger>
            <Pause className='size-5' />
          </HoverCardTrigger>
          <HoverCardContent>Plan Paused</HoverCardContent>
        </HoverCard>
      )}
      {plan.pin && (
        <HoverCard>
          <HoverCardTrigger>
            <Lock className='size-5' />
          </HoverCardTrigger>
          <HoverCardContent>Uploads Pin Protected</HoverCardContent>
        </HoverCard>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <Settings className='size-5' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => updatePauseAction(plan)}>
            {plan.pauseUploads ? 'Resume Uploads' : 'Pause Uploads'}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpenPinDialog(true)}>
            Edit Pin
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setOpenRollDialog(true)}
            className='bg-destructive/20'
          >
            Roll Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Upload Link Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className='w-full md:w-fit'>
            <Share2 className='mr-2 h-4 w-4' />
            <span>Share Upload Link</span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <ShareUploadLinkDialog plan={plan} />
        </DialogContent>
      </Dialog>

      {/* Pin Dialog */}
      <Dialog open={openPinDialog} onOpenChange={setOpenPinDialog}>
        <DialogContent className='w-fit'>
          <SetPin plan={plan} />
        </DialogContent>
      </Dialog>

      {/* Roll Dialog */}
      <AlertDialog open={openRollDialog} onOpenChange={setOpenRollDialog}>
        <AlertDialogContent className='w-fit'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will change the upload link for this plan meaning the
              previous link will become inactive and cannot be used again.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setOpenRollDialog(false);
                rollUploadLinkAction({ plan });
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
