import { getUserPlans } from '@/db/queries';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
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

  return (
    <>
      <PlanSelector plans={plans} params={params} />
      {children}
    </>
  );
}
