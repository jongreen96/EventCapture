import { authSignOutAction } from '@/app/actions';
import { auth } from '@/auth';
import { Button } from './ui/button';

export default async function Nav() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className='sticky top-0 z-50 bg-background/70 p-2 backdrop-blur'>
      <div className='container flex justify-between'>
        <a href='/'>
          <p className='text-3xl font-semibold'>Event Capture</p>
        </a>
        {user && (
          <form action={authSignOutAction}>
            <Button type='submit' size='sm' variant='secondary'>
              Sign out
            </Button>
          </form>
        )}
      </div>
    </nav>
  );
}
