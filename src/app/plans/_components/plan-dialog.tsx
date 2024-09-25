import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Stripe from 'stripe';
import CheckoutForm from './checkout-form';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function PlanDialog({
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
  const today = new Date();
  const endDate = new Date(today.setMonth(today.getMonth() + plan.duration));
  const formattedEndDate = endDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: plan.price * 100,
    currency: 'GBP',
    metadata: {
      userId,
      plan: plan.name,
    },
  });

  if (paymentIntent.client_secret == null)
    throw Error('Stripe failed to create payment intent.');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full'>Select Plan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Plan Details</DialogTitle>
        </DialogHeader>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className='font-bold'>Plan:</TableCell>
              <TableCell className='text-muted-foreground'>
                {plan.name}
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
                £{plan.price}
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

        <CheckoutForm clientSecret={paymentIntent.client_secret} />
      </DialogContent>
    </Dialog>
  );
}
