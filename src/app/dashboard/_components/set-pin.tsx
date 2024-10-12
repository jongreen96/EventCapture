'use client';

import { setPinAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import type { Plan } from '@/db/schema';

export default function SetPin({ plan }: { plan: Plan }) {
  return (
    <div className='flex flex-col items-center'>
      <DialogTitle className='text-2xl font-bold'>Set Pin</DialogTitle>
      <DialogDescription className='text-center'>
        Set a 4-digit pin to secure the event.
      </DialogDescription>

      <form
        action={setPinAction}
        className='mt-6 flex flex-col items-center gap-2'
      >
        <input type='hidden' name='eventName' value={plan.eventName} />

        <InputOTP maxLength={4} name='pin' required>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>

        <DialogClose asChild>
          <Button type='submit'>Set Pin</Button>
        </DialogClose>
      </form>
    </div>
  );
}
