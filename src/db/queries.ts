import { plansData } from '@/app/plans/_components/plans';
import { and, eq, gt } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from './db';
import { plans } from './schema';

// PLANS QUERIES

export async function getUserPlan(userId: string, eventName: string) {
  const plan = await db.query.plans.findFirst({
    columns: {
      plan: true,
      eventName: true,
      endDate: true,
      pauseUploads: true,
      url: true,
    },
    where: and(
      eq(plans.user, userId),
      eq(plans.eventName, eventName),
      gt(plans.endDate, new Date()),
    ),
  });

  return plan;
}

export async function getUserPlans(userId: string) {
  const userPlans = await db.query.plans.findMany({
    columns: {
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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${nanoid(10)}`;

  await db.insert(plans).values({
    user,
    plan,
    eventName,
    pricePaid: plansData[plan].price,
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

  return true;
}
