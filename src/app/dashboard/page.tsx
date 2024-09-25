import { getUserPlans } from '@/db/queries';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import Dashboard from './_components/dashboard';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plans = await retryGetUserPlans(session.user.id);
  if (!plans || plans.length === 0) redirect('/plans');

  return <Dashboard plans={plans} />;
}

// TODO: Update URL to show currently active plan?

async function retryGetUserPlans(userId: string, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const plan = await getUserPlans(userId);
    if (plan !== null && plan.length > 0) return plan;

    if (attempt < retries) {
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  return null;
}
