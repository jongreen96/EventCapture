import { eq } from 'drizzle-orm';
import { db } from './db';
import { plans } from './schema';

export async function getUserPlans(userId: string) {
  const userPlans = await db.query.plans.findFirst({
    where: eq(plans.user, userId),
  });

  return userPlans;
}

export async function addUserPlan({
  user,
  plan,
  eventName,
  pricePaid,
  endDate,
}: {
  user: string;
  plan: string;
  eventName: string;
  pricePaid: number;
  endDate: Date;
}) {
  await db.insert(plans).values({
    user,
    plan,
    eventName,
    expired: false,
    pricePaidInCents: pricePaid * 100,
    endDate: endDate,
  });
}
