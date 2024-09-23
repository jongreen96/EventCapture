'use client';

import { Button } from '@/components/ui/button';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutForm({
  plan,
  clientSecret,
}: {
  plan: {
    name: string;
    price: number;
    duration: number;
    guests: number;
  };
  clientSecret: string;
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
      <Form />
    </Elements>
  );
}

function Form() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}dashboard`,
        },
      })
      .then(({ error }) => {
        setIsLoading(false);

        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message!);
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
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
