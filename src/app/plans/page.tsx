import Plans from '@/components/plans';

export default function PlansPage() {
  // TODO: Link to stripe using email from params
  return (
    <main className='flex min-h-svh items-center justify-between'>
      <Plans reference={false} />
    </main>
  );
}
