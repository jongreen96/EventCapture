import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUserPlans } from '@/db/queries';
import getSession from '@/lib/getSession';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Plans from './_components/plans';

export default async function PlansPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');
  const plans = await getUserPlans(session.user.id);

  return (
    <main>
      <Plans reference={false} userId={session.user.id} plans={plans} />

      {plans && plans.length > 0 && (
        <section className='container flex flex-col items-center p-4 text-center'>
          <h2 className='max-w-prose text-3xl font-semibold'>
            Currently Active Plans
          </h2>
          <p className='max-w-prose text-muted-foreground'>
            A list of all plans, including those that have expired.
          </p>
          <Table className='mx-auto w-fit'>
            <TableHeader>
              <TableRow>
                <TableHead className='text-center'>Event</TableHead>
                <TableHead className='text-center'>Expires</TableHead>
                <TableHead className='text-center'>Link</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {plans
                .sort(
                  (a, b) =>
                    new Date(a.endDate).getTime() -
                    new Date(b.endDate).getTime(),
                )
                .map((plan, index) => (
                  <TableRow key={index}>
                    <TableCell>{plan.eventName}</TableCell>
                    <TableCell>
                      {new Date(plan.endDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <Button asChild>
                        <Link
                          href={`/dashboard/${encodeURIComponent(plan.eventName)}/overview`}
                        >
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </section>
      )}
    </main>
  );
}
