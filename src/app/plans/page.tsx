import Plans from '@/components/plans';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function PlansPage() {
  const session = await getSession();
  if (!session?.user) redirect('/');

  return (
    <main>
      <Plans reference={false} />
    </main>
  );
}
