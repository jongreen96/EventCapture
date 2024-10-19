import { getUserPlan } from '@/db/queries';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import PhotosPageComponent from './_components/photos';

export default async function PhotosPage({
  params,
  searchParams,
}: {
  params: { event: string };
  searchParams: URLSearchParams;
}) {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plan = await getUserPlan(
    session.user.id,
    decodeURIComponent(params.event),
  );
  if (!plan) redirect('/plans');
  if (plan.images.length === 0) redirect(`/dashboard/${params.event}/overview`);
  const sort = searchParams['sort'] as unknown as 'oldest' | 'guest';

  return <PhotosPageComponent plan={plan} event={params.event} sort={sort} />;
}
