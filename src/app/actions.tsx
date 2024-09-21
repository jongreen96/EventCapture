'use server';

import { signIn, signOut } from '@/auth';
import { addUserPlan } from '@/db/queries';
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
    plan: z.string().min(1),
    eventName: z.string().min(1),
    pricePaid: z.coerce.number().min(5),
    endDate: z.coerce.date(),
  });

  const parsedData = buyPlanSchema.safeParse(data);
  if (!parsedData.success) {
    console.log(parsedData.error);
    return;
  }

  await addUserPlan(parsedData.data);

  redirect('/dashboard');
}
