'use server';

import { signIn, signOut } from '@/auth';
import {
  deleteImage,
  getUserPlan,
  rollUploadLink,
  setPin,
  updatePause,
} from '@/db/queries';
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

  client.send(
    new DeleteObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
      Key: parsedData.data.key,
    }),
  );

  client.send(
    new DeleteObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
      Key: `${parsedData.data.key}-preview.webp`,
    }),
  );

  revalidatePath('/dashboard');
}

export async function deleteImagesAction(formData: FormData) {
  const session = await getSession();
  if (!session?.user?.id) return;

  const data = Object.fromEntries(formData);

  const deleteImagesSchema = z.object({
    guest: z.string().min(1),
    eventName: z.string().min(1),
  });

  const parsedData = deleteImagesSchema.safeParse(data);

  if (!parsedData.success) return;

  const userId = session.user.id;
  const eventName = parsedData.data.eventName;

  if (!userId || !eventName) return;

  const plan = await getUserPlan(userId, eventName);
  if (!plan) return;

  const imagesToDelete = plan.images.filter(
    (image) => image.guest === parsedData.data.guest,
  );

  const deleted = await Promise.all(
    imagesToDelete.map((image) => {
      const del = deleteImage(image.url, userId);

      client.send(
        new DeleteObjectCommand({
          Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
          Key: image.key,
        }),
      );

      client.send(
        new DeleteObjectCommand({
          Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
          Key: `${image.key}-preview.webp`,
        }),
      );

      return del;
    }),
  );

  if (!deleted.includes(false)) {
    revalidatePath(`/dashboard/${eventName}/photos`);
  }
}
