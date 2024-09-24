import { plansData } from '@/app/plans/_components/plans';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { plans } from './schema';

export async function getUserPlans(userId: string) {
  const userPlans = await db.query.plans.findMany({
    where: eq(plans.user, userId),
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
