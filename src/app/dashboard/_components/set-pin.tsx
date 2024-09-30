'use client';

import { setPinAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import type { Plan } from '@/db/schema';

export default function SetPin({ plan }: { plan: Plan }) {
  return (
    <div className='flex flex-col items-center'>
      <h3 className='text-2xl font-bold'>Set Pin</h3>

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
