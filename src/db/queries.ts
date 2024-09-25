import { plansData } from '@/app/plans/_components/plans';
import { and, eq, gt } from 'drizzle-orm';
import { db } from './db';
import { plans } from './schema';

export async function getUserPlan(userId: string, eventName: string) {
  const plan = await db.query.plans.findFirst({
    where: and(eq(plans.user, userId), eq(plans.eventName, eventName)),
  });

  return plan;
}

export async function getUserPlans(userId: string) {
  const userPlans = await db.query.plans.findMany({
    where: and(
      eq(plans.user, userId),
      // plan is not expired
      gt(plans.endDate, new Date()),
    ),
  });

  return userPlans;
}

export async function addUserPlan({
  user,
  plan,
  eventName,
}: {
  user: string;
  plan: 'enterprise' | 'small' | 'medium' | 'large';
  eventName: string;
}) {
  const today = new Date();
  const endDate = new Date(
    today.setMonth(today.getMonth() + plansData[plan].duration),
  );

  await db.insert(plans).values({
    user,
    plan,
    eventName,
    pricePaid: plansData[plan].price,
    endDate,
  });
}
