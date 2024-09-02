import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getSession();
  if (true) redirect('/plans');

  return <p>admin</p>;
}
