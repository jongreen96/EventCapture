'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function signUpForm(formData: FormData) {
  'use server';

  const supabase = createClient();
  const email = formData.get('email') as string;

  if (z.string().email().safeParse(email).success === false)
    redirect('/?error=invalid_email');

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.BASE_URL}plans?email=${encodeURIComponent(email)}`,
    },
  });

  if (error) redirect('/?error=error_signing_up');

  // revalidatePath('/', 'layout');
  redirect('/?success=true');
}
