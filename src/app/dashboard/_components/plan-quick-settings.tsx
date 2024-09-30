'use client';

import { updatePauseAction } from '@/app/actions';
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

  return (
    <div className='flex items-center justify-between gap-2'>
      {/* TODO: Add Roll link & Sonner */}
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
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog>
        <Button asChild>
          <DialogTrigger>
            <Share2 className='mr-2 h-4 w-4' />
            <span>Share Upload Link</span>
          </DialogTrigger>
        </Button>

        <DialogContent>
          <ShareUploadLinkDialog plan={plan} />
        </DialogContent>
      </Dialog>

      <Dialog open={openPinDialog} onOpenChange={setOpenPinDialog}>
        <DialogContent className='w-fit'>
          <SetPin plan={plan} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
