'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function signUpFormAction(formData: FormData) {
  await signIn('resend', formData);
}

export async function googleSignInAction() {
  await signIn('google');
}

export async function signOutAction() {
  await signOut();
}

export async function buyPlanAction(formData: FormData) {
  const data = Object.fromEntries(formData);

  const buyPlanSchema = z.object({
    user: z.string().min(1),
    plan: z.enum(['small', 'medium', 'large', 'enterprise']),
    eventName: z.string().min(1),
  });

  const parsedData = buyPlanSchema.safeParse(data);
  if (!parsedData.success) {
    console.log(parsedData.error);
    return;
  }
  const userData = parsedData.data;

  // await addUserPlan(userData);

  redirect('/dashboard');
}
