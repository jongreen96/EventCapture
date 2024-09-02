import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const session = await getSession();
  if (!session?.user) redirect('/');

  return <p>Settings</p>;
}
