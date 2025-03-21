import { plansData } from '@/app/plans/_components/plans';
import { and, eq, gt, isNull, lt, or } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from './db';
import { downloads, images, Plan, plans } from './schema';

// PLANS QUERIES

export async function getUserPlan(userId: string, eventName: string) {
  const plan = await db.query.plans.findFirst({
    columns: {
      plan: true,
      eventName: true,
      endDate: true,
      pauseUploads: true,
      url: true,
      pin: true,
      storageLimit: true,
    },
    with: {
      images: {
        columns: {
          guest: true,
          url: true,
          key: true,
          size: true,
          createdAt: true,
        },
      },
    },
    where: and(
      eq(plans.user, userId),
      eq(plans.eventName, eventName),
      gt(plans.endDate, new Date()),
    ),
  });

  return plan;
}

export async function getPlanPreview(link: string) {
  const plan = await db.query.plans.findFirst({
    columns: {
      id: true,
      eventName: true,
      pin: true,
      pauseUploads: true,
    },
    where: eq(plans.url, link),
  });

  if (!plan) return null;

  const planPreview = {
    id: plan.id,
    eventName: plan.eventName,
    pin: plan.pin ? true : false,
    pauseUploads: plan.pauseUploads,
  };

  return planPreview;
}

export async function getUserPlans(userId: string) {
  const userPlans = await db.query.plans.findMany({
    columns: {
      id: true,
      eventName: true,
      endDate: true,
    },
    where: and(eq(plans.user, userId), gt(plans.endDate, new Date())),
  });

  return userPlans;
}

export async function addUserPlan({
  user,
  plan,
  eventName,
}: {
  user: string;
  plan: 'small' | 'medium' | 'large' | 'enterprise';
  eventName: string;
}) {
  const today = new Date();
  const endDate = new Date(
    today.setMonth(today.getMonth() + plansData[plan].duration),
  );

  const url = nanoid(10);

  await db.insert(plans).values({
    user,
    plan,
    eventName,
    pricePaid: plansData[plan].price,
    storageLimit: plansData[plan].storageLimit,
    endDate,
    url,
  });
}

export async function updatePause({
  userId,
  eventName,
  pauseUploads,
}: {
  userId: string;
  eventName: string;
  pauseUploads: boolean;
}) {
  await db
    .update(plans)
    .set({ pauseUploads: !pauseUploads })
    .where(and(eq(plans.user, userId), eq(plans.eventName, eventName)));
}

export async function setPin({
  pin,
  eventName,
  userId,
}: {
  pin: string;
  eventName: string;
  userId: string;
}) {
  await db
    .update(plans)
    .set({ pin })
    .where(and(eq(plans.user, userId), eq(plans.eventName, eventName)));
}

export async function rollUploadLink({
  plan,
  userId,
}: {
  plan: Plan;
  userId: string;
}) {
  const url = nanoid(10);

  await db
    .update(plans)
    .set({ url })
    .where(and(eq(plans.user, userId), eq(plans.eventName, plan.eventName)));
}

export async function isAuthorized(pin: string | undefined, planId: string) {
  let authorized = false;

  if (!pin) {
    authorized =
      (
        await db
          .select()
          .from(plans)
          .where(and(eq(plans.id, planId), isNull(plans.pin)))
      ).length > 0;
  } else {
    authorized =
      (
        await db
          .select()
          .from(plans)
          .where(and(eq(plans.pin, pin), eq(plans.id, planId)))
      ).length > 0;
  }

  return authorized;
}

export async function isPaused(planId: string) {
  const plan = await db.query.plans.findFirst({
    columns: {
      pauseUploads: true,
    },
    where: eq(plans.id, planId),
  });

  return plan?.pauseUploads;
}

export async function addImageToPlan(
  planId: string,
  guest: string,
  url: string,
  key: string,
  size: number,
) {
  if (!planId) return;

  await db.insert(images).values({
    plan_id: planId,
    guest,
    url: `https://images.event-capture.jongreen.dev/${url}`,
    key,
    size,
    createdAt: new Date(),
  });
}

export async function deleteImage(url: string, userId: string) {
  const userPlans = await db.query.plans.findMany({
    columns: {
      id: true,
    },
    where: eq(plans.user, userId),
  });

  if (!userPlans || userPlans.length === 0) return;

  let deleted = false;

  for (const plan of userPlans) {
    await db
      .delete(images)
      .where(
        or(
          and(eq(images.url, url), eq(images.plan_id, plan.id)),
          and(
            eq(images.url, url + '-preview.webp'),
            eq(images.plan_id, plan.id),
          ),
        ),
      )
      .then(() => {
        deleted = true;
      });
  }

  return deleted;
}

export async function deleteSpecificImage(key: string) {
  await db.delete(images).where(eq(images.key, key));
}

export async function checkStorageCapacity(uploadSize: number, planId: string) {
  const plan = await db.query.plans.findFirst({
    columns: {
      storageLimit: true,
    },
    where: eq(plans.id, planId),
  });
  if (!plan) return false;

  const allImages = await db.query.images.findMany({
    columns: {
      size: true,
    },
    where: eq(images.plan_id, planId),
  });

  const totalSize = allImages.reduce((acc, curr) => acc + curr.size, 0);

  return totalSize + uploadSize <= 1024 ** 3 * plan.storageLimit;
}

export async function getExpiredPlans() {
  const expiredPlans = await db.query.plans.findMany({
    columns: {
      id: true,
    },
    where: lt(plans.endDate, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
    with: {
      images: {
        columns: {
          key: true,
        },
      },
    },
  });

  return expiredPlans;
}

export async function createDownloadUrl(key: string, presignedUrl: string) {
  const url = nanoid(10);

  await db
    .insert(downloads)
    .values({
      key,
      presignedUrl,
      url,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    })
    .onConflictDoUpdate({
      target: downloads.key,
      set: {
        url,
        presignedUrl,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

  return url;
}

export async function getDownloadUrl(key: string) {
  const download = await db.query.downloads.findFirst({
    columns: {
      url: true,
    },
    where: and(eq(downloads.key, key), gt(downloads.expires, new Date())),
  });

  return download?.url;
}

export async function getDownload(url: string) {
  const download = await db.query.downloads.findFirst({
    columns: {
      presignedUrl: true,
    },
    where: and(eq(downloads.url, url), gt(downloads.expires, new Date())),
  });

  return download?.presignedUrl;
}
