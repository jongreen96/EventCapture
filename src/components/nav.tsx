import getSession from '@/lib/getSession';
import UserButton from './ui/user-button';

export default async function Nav() {
  const session = await getSession();
  const user = session?.user;

  return (
    <nav className='sticky top-0 z-50 bg-background/70 p-2 backdrop-blur'>
      <div className='container flex justify-between'>
        <a href='/'>
          <p className='text-3xl font-semibold'>Event Capture</p>
        </a>
        {user && <UserButton user={user} />}
      </div>
    </nav>
  );
}
