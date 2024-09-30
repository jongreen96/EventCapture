import { plansData } from '@/app/plans/_components/plans';
import { and, eq, gt } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from './db';
import { Plan, plans } from './schema';

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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}upload/${nanoid(10)}`;

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
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}upload/${nanoid(10)}`;

  await db
    .update(plans)
    .set({ url })
    .where(and(eq(plans.user, userId), eq(plans.eventName, plan.eventName)));
}
