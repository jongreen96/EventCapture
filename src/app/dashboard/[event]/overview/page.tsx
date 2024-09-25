import { getUserPlan } from '@/db/queries';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import Overview from '../../_components/overview';

export default async function OverviewPage({
  params,
}: {
  params: { event: string };
}) {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plan = await getUserPlan(
    session.user.id,
    decodeURIComponent(params.event),
  );
  if (!plan) redirect('/plans');

  return <Overview plan={plan} />;
}
