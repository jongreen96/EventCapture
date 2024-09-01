import { auth } from '@/auth';
import Plans from '@/components/plans';
import { redirect } from 'next/navigation';

export default async function PlansPage() {
  const session = await auth();
  if (!session?.user) redirect('/');

  return (
    <main className='flex min-h-svh items-center justify-between'>
      <Plans reference={false} />
    </main>
  );
}
