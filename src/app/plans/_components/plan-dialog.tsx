'use client';

import { buyPlanAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useState } from 'react';

export default function PlanDialog({
  plan,
  userId,
}: {
  plan: {
    name: string;
    price: number;
    duration: number;
    guests: number;
  };
  userId: string;
}) {
  const [eventName, setEventName] = useState('');
  const today = new Date();
  const endDate = new Date(today.setMonth(today.getMonth() + plan.duration));
  const formattedEndDate = endDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full'>Select Plan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Plan Details</DialogTitle>
        </DialogHeader>

        <form action={buyPlanAction} className='space-y-2'>
          <input type='hidden' name='plan' value={plan.name} />
          <input type='hidden' name='pricePaid' value={plan.price} />
          <input type='hidden' name='endDate' value={endDate.toISOString()} />
          <input type='hidden' name='user' value={userId} />
          <div>
            <label htmlFor='event-name'>Event name:</label>
            <Input
              id='event-name'
              name='eventName'
              type='text'
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell className='font-bold'>Event Name:</TableCell>
                <TableCell className='text-muted-foreground'>
                  {eventName}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className='font-bold'>Plan duration:</TableCell>
                <TableCell className='text-muted-foreground'>
                  {plan.duration} months
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className='font-bold'>End date:</TableCell>
                <TableCell className='text-muted-foreground'>
                  {formattedEndDate}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className='font-bold'>Guests:</TableCell>
                <TableCell className='text-muted-foreground'>
                  {plan.guests === Infinity ? 'Unlimited' : plan.guests}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className='font-bold'>Price:</TableCell>
                <TableCell className='text-muted-foreground'>
                  ${plan.price}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className='font-bold'>Payment Type:</TableCell>
                <TableCell className='text-muted-foreground'>
                  One Time Payment
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button type='submit' className='w-full'>
            Buy Plan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
