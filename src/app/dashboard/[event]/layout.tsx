import { getUserPlan, getUserPlans } from '@/db/queries';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import PlanQuickSettings from '../_components/plan-quick-settings';
import PlanSelector from '../_components/plan-selector';

export default async function EventLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { event: string };
}) {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plans = await getUserPlans(session.user.id);
  const plan = await getUserPlan(
    session.user.id,
    decodeURIComponent(params.event),
  );

  if (!plan) redirect('/plans');

  return (
    <>
      <div className='flex flex-col gap-2 md:flex-row md:justify-between'>
        <PlanSelector plans={plans} params={params} />
        <PlanQuickSettings plan={plan} />
      </div>
      {children}
    </>
  );
}
