'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function signUpForm(formData: FormData) {
  'use server';

  const email = formData.get('email') as string;

  if (z.string().email().safeParse(email).success === false) {
    redirect('/?error=invalid_email');
  }

  // TODO: Add email to database

  redirect(`/plans?email=${encodeURIComponent(email)}`);
}
