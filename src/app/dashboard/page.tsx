import { getUserPlans } from '@/db/queries';
import getSession from '@/lib/getSession';
import { ArrowBigUp } from 'lucide-react';
import { redirect } from 'next/navigation';
import PlanSelector from './_components/plan-selector';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plans = await retryGetUserPlans(session.user.id);
  if (!plans || plans.length === 0) redirect('/plans');

  return (
    <div>
      <PlanSelector plans={plans} params={{ event: '' }} />
      <div className='mt-4 flex w-72 flex-col items-center'>
        <ArrowBigUp className='h-8 w-8' />
        <p className='text-lg font-bold'>Choose a plan</p>
      </div>
    </div>
  );
}

async function retryGetUserPlans(userId: string, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const plans = await getUserPlans(userId);
    if (plans !== null && plans.length > 0) return plans;

    if (attempt < retries) {
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  return null;
}
