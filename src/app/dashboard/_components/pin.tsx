'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import type { Plan } from '@/db/schema';
import { useState } from 'react';
import SetPin from './set-pin';

export default function Pin({ plan }: { plan: Plan }) {
  const [showPin, setShowPin] = useState(false);

  if (plan.pin && showPin) {
    return (
      <div className='mx-auto flex items-center gap-2'>
        <InputOTP maxLength={4} value={plan.pin}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    );
  }

  if (plan.pin && !showPin) {
    return (
      <Button
        variant='outline'
        onClick={() => setShowPin(true)}
        className='mx-auto w-fit'
      >
        Show Pin
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='mx-auto w-fit'>Set Pin</Button>
      </DialogTrigger>

      <DialogContent className='w-fit'>
        <SetPin plan={plan} />
      </DialogContent>
    </Dialog>
  );
}
