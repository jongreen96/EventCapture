import { getUserPlans } from '@/db/queries';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import PlanSelector from './_components/plan-selector';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plans = await getUserPlans(session.user.id);
  if (plans.length === 1)
    redirect(`/dashboard/${encodeURIComponent(plans[0].eventName)}/overview`);

  return (
    <div className='flex justify-center pt-[calc(35dvh)]'>
      <PlanSelector plans={plans} params={{ event: '' }} />
    </div>
  );
}
