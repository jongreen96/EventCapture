'use server';

import { signIn, signOut } from '@/auth';
import { deleteImage, rollUploadLink, setPin, updatePause } from '@/db/queries';
import { Plan } from '@/db/schema';
import getSession from '@/lib/getSession';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
});

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
  if (!parsedData.success) return;

  const userData = parsedData.data;

  // await addUserPlan(userData);

  redirect('/dashboard');
}

export async function updatePauseAction({ pauseUploads, eventName }: Plan) {
  const session = await getSession();
  if (!session?.user?.id) return Error('Not logged in');

  await updatePause({
    pauseUploads,
    eventName,
    userId: session.user.id,
  });

  revalidatePath('/dashboard');
}

export async function setPinAction(formData: FormData) {
  const session = await getSession();
  if (!session?.user?.id) return;

  const data = Object.fromEntries(formData);

  const setPinSchema = z.object({
    pin: z.string().length(4),
    eventName: z.string().min(1),
  });

  const parsedData = setPinSchema.safeParse(data);
  if (!parsedData.success) return;

  await setPin({
    pin: parsedData.data.pin,
    eventName: parsedData.data.eventName,
    userId: session.user.id,
  });

  revalidatePath('/dashboard');
}

export async function rollUploadLinkAction({ plan }: { plan: Plan }) {
  const session = await getSession();
  if (!session?.user?.id) return;

  await rollUploadLink({
    plan,
    userId: session.user.id,
  });

  revalidatePath('/dashboard');
}

export async function deleteImageAction(formData: FormData) {
  const session = await getSession();
  if (!session?.user?.id) return;

  const data = Object.fromEntries(formData);

  const deleteImageSchema = z.object({
    url: z.string().min(1),
    key: z.string().min(1),
  });

  const parsedData = deleteImageSchema.safeParse(data);

  if (!parsedData.success) return;

  const deleted = await deleteImage(parsedData.data.url, session.user.id);
  if (!deleted) {
    console.error('Error deleting image from database');
    return;
  }

  const deleteParams = {
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
    Key: parsedData.data.key,
  };

  const result = await client.send(new DeleteObjectCommand(deleteParams));

  revalidatePath('/dashboard');
}
