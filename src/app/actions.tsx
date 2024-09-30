'use server';

import { signIn, signOut } from '@/auth';
import { setPin, updatePause } from '@/db/queries';
import { Plan } from '@/db/schema';
import getSession from '@/lib/getSession';
import { revalidatePath } from 'next/cache';
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

export async function updatePauseAction({ pauseUploads, eventName }: Plan) {
  const session = await getSession();
  if (!session?.user?.id) {
    return Error('Not logged in');
  }

  await updatePause({
    pauseUploads,
    eventName,
    userId: session.user.id,
  });

  revalidatePath('/dashboard');
}

export async function setPinAction(formData: FormData) {
  const session = await getSession();
  if (!session?.user?.id) {
    return;
  }

  const data = Object.fromEntries(formData);

  const setPinSchema = z.object({
    pin: z.string().length(4),
    eventName: z.string().min(1),
  });

  const parsedData = setPinSchema.safeParse(data);
  if (!parsedData.success) {
    console.log(parsedData.error);
    return;
  }

  await setPin({
    pin: parsedData.data.pin,
    eventName: parsedData.data.eventName,
    userId: session.user.id,
  });

  revalidatePath('/dashboard');
}
