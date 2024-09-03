'use server';

import { signIn, signOut } from '@/auth';
import { addUserPlan } from '@/db/queries';
import { redirect } from 'next/navigation';

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

  await addUserPlan(data.userId.toString(), data.plan.toString());

  redirect('/admin');
}
