import { signOutAction } from '@/app/actions';
import userImagePlaceholder from '@/assets/userImagePlaceholder.jpg';
import { LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

export default function UserButton({ user }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' className='flex-none rounded-full'>
          <Image
            src={user.image || userImagePlaceholder}
            alt='User image'
            width={50}
            height={50}
            className='aspect-square scale-105 rounded-full bg-background object-cover'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-4 mt-2 w-64'>
        <DropdownMenuLabel>{user.name || 'User'}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/settings'>
            <Settings className='mr-2 size-4' />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <form action={signOutAction}>
          <DropdownMenuItem asChild>
            <button type='submit' className='w-full p-0 hover:border-none'>
              <LogOut className='mr-2 size-4' />
              <span>Log Out</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
