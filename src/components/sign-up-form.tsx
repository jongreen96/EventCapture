'use client';

import { googleSignInAction, signUpFormAction } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

export default function SignUpForm() {
  const searchParams = useSearchParams();

  const error = searchParams.get('error') as string;
  const success = searchParams.get('success') as string;

  return (
    <Card className='w-full max-w-prose lg:w-72'>
      <CardContent className='p-4'>
        <form action={signUpFormAction} className='flex flex-col space-y-2'>
          <Input
            type='email'
            name='email'
            id='email-resend'
            placeholder='Enter your email...'
            autoComplete='email'
            autoFocus
            required
            className={cn(
              'w-full',
              error && 'border-red-500',
              success && 'border-green-500',
            )}
          />

          {error && <p className='text-center text-sm text-red-500'>{error}</p>}
          {success && (
            <p className='text-center text-sm text-green-500'>
              Check your email for a confirmation link
            </p>
          )}

          <Button type='submit' className='w-full'>
            Sign in with Email
          </Button>

          <div className='flex items-center justify-center space-x-2'>
            <Separator className='mt-1 w-5/12' />
            <p className='text-center text-muted-foreground'>or</p>
            <Separator className='mt-1 w-5/12' />
          </div>
        </form>

        <form action={googleSignInAction} className='mt-3'>
          <Button type='submit' className='w-full'>
            Sign in with Google
          </Button>
        </form>
      </CardContent>
      <CardFooter className='-mt-3 pb-2 text-[0.7rem] text-muted-foreground'>
        if you already have an account, we&apos;ll log you in
      </CardFooter>
    </Card>
  );
}
