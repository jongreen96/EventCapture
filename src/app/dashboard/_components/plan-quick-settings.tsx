'use client';

import { updatePauseAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plan } from '@/db/schema';
import { cn } from '@/lib/utils';
import { Pause, Play, Share2 } from 'lucide-react';
import ShareUploadLinkDialog from './share-upload-link-dialog';

export default function PlanQuickSettings({ plan }: { plan: Plan }) {
  return (
    <div className='flex items-center justify-between gap-2'>
      {/* TODO: Change to dropdown menu & add Roll link & Change pin */}

      <Button
        variant='outline'
        onClick={() => updatePauseAction(plan)}
        className={cn(
          plan.pauseUploads ? 'bg-green-500/30' : 'bg-destructive/30',
        )}
      >
        {plan.pauseUploads ? (
          <Play className='mr-2 h-4 w-4' />
        ) : (
          <Pause className='mr-2 h-4 w-4' />
        )}

        <span>{plan.pauseUploads ? 'Resume Uploads' : 'Pause Uploads'}</span>
      </Button>

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
    </div>
  );
}
