'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export async function signUpFormAction(formData: FormData) {
  await signIn('resend', formData);
}

export async function googleSignInAction() {
  await signIn('google');
}

export async function authSignOutAction() {
  await signOut();
  redirect('/');
}
