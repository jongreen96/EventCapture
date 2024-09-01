import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();
  if (true) redirect('/plans');

  return <p>admin</p>;
}
