import getSession from '@/lib/getSession';
import Link from 'next/link';
import UserButton from './ui/user-button';

export default async function Nav() {
  const session = await getSession();
  const user = session?.user;

  return (
    <nav className='sticky top-0 z-50 bg-background/70 py-2 backdrop-blur'>
      <div className='container flex justify-between'>
        <Link href='/'>
          <p className='text-3xl font-semibold'>Event Capture</p>
        </Link>
        {user && <UserButton user={user} />}
      </div>
    </nav>
  );
}
