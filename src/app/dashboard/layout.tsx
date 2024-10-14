export default async function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='container min-h-[calc(100vh-52px)] space-y-4 py-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight md:text-4xl'>
          Dashboard
        </h1>
      </div>
      {children}
    </main>
  );
}
