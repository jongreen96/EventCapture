'use client';

import { signOutAction } from '@/app/actions';
import userImagePlaceholder from '@/assets/userImagePlaceholder.jpg';
import { LogOut, Monitor, Moon, Sun } from 'lucide-react';
import { User } from 'next-auth';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

interface UserProp {
  user: User;
}

export default function UserButton({ user }: UserProp) {
  const { setTheme } = useTheme();

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

        <div className='flex justify-between'>
          <DropdownMenuLabel>Theme:</DropdownMenuLabel>
          <div className='flex'>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <Monitor className='size-4' />
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon className='size-4' />
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun className='size-4' />
            </DropdownMenuItem>
          </div>
        </div>
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
