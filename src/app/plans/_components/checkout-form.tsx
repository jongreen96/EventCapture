'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Plans } from '@/db/schema';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutForm({
  clientSecret,
  plans,
}: {
  clientSecret: string;
  plans: Plans[];
}) {
  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: 'night',
          variables: {
            colorBackground: '#000',
            colorText: '#fff',
            colorDanger: '#ef4444',
          },
        },
      }}
      stripe={stripePromise}
    >
      <Form plans={plans} />
    </Elements>
  );
}

function Form({ plans }: { plans: Plans[] }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [eventName, setEventName] = useState('');
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Check if event name already exists
    if (plans.some((plan) => plan.eventName === eventName)) {
      setErrorMessage('Event name already exists');
      return;
    }

    if (!stripe || !elements) return;
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: eventName,
            },
          },
        },
      })
      .then(async ({ paymentIntent }: any) => {
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          // Add 1s delay to avoid race condition
          await new Promise((resolve) => setTimeout(resolve, 1000));
          router.push('/dashboard');
        }
        setIsLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <Label htmlFor='eventName' className='font-normal'>
        Event Name
      </Label>
      <Input
        id='eventName'
        type='text'
        placeholder='Eg: Smith wedding'
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        className='!mt-1 w-full bg-black placeholder:text-gray-300/40'
      />

      <PaymentElement />

      <Button
        type='submit'
        className='w-full'
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? 'Purchasing...' : 'Purchase'}
      </Button>

      {errorMessage && <p className='text-sm text-red-500'>{errorMessage}</p>}
    </form>
  );
}
