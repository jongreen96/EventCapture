import { getUserPlans } from '@/db/queries';
import getSession from '@/lib/getSession';
import { ArrowBigUp } from 'lucide-react';
import { redirect } from 'next/navigation';
import PlanSelector from './_components/plan-selector';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plans = await getUserPlans(session.user.id);
  if (plans.length === 1)
    redirect(`/dashboard/${encodeURIComponent(plans[0].eventName)}/overview`);

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
