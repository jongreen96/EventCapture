import { getUserPlans } from '@/db/queries';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plans = await retryGetUserPlans(session.user.id);
  if (!plans || plans.length === 0) redirect('/plans');

  return (
    <main className='container min-h-[calc(100vh-52px)] space-y-4 pt-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight md:text-4xl'>
          Dashboard
        </h1>
      </div>
      {children}
    </main>
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
