import { getUserPlans } from '@/db/queries';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import Dashboard from './_components/dashboard';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plan = await retryGetUserPlans(session.user.id);
  if (!plan) redirect('/plans');

  return <Dashboard plan={plan} />;
}

async function retryGetUserPlans(userId: string, retries = 3, delay = 100) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const plan = await getUserPlans(userId);
    if (plan) return plan;

    if (attempt < retries) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return null;
}
