import { getUserPlans } from '@/db/queries';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import Dashboard from './_components/dashboard';

export default async function SettingsPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plan = await getUserPlans(session.user.id);
  if (!plan) redirect('/plans');

  return <Dashboard plan={plan} />;
}
