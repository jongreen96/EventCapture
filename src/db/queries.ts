import { eq } from 'drizzle-orm';
import { db } from './db';
import { plans } from './schema';

export async function getUserPlans(userId: string) {
  const userPlans = await db.query.plans.findFirst({
    where: eq(plans.user, userId),
  });

  return userPlans;
}

export async function addUserPlan(userId: string, plan: string) {
  await db.insert(plans).values({
    user: userId,
    plan,
    pricePaidInCents: 0,
    endDate: new Date(2025, 0, 1),
  });
}
