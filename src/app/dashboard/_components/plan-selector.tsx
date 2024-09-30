'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { Plans } from '@/db/schema';
import { ChevronDown, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PlanSelector({
  plans,
  params,
}: {
  plans: Plans[];
  params: { event: string };
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(decodeURIComponent(params.event) || '');

  return (
    <div className='flex items-center gap-2'>
      <p className='font-bold'>Plan:</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between md:w-72'
          >
            <p className='truncate'>{value || 'Choose a plan'}</p>
            <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-[calc(100vw-8rem)] p-0 md:w-72'>
          <Command>
            <CommandInput placeholder='Search plan...' />
            <CommandList>
              <CommandEmpty>No plan found.</CommandEmpty>

              {plans.map((plan: Plans, index) => (
                <Link
                  key={index}
                  href={`/dashboard/${encodeURIComponent(plan.eventName)}/overview`}
                >
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      setValue(plan.eventName);
                      setOpen(false);
                    }}
                  >
                    {index + 1}.&nbsp;&nbsp; {plan.eventName}
                  </CommandItem>
                </Link>
              ))}

              <Link href='/plans'>
                <CommandItem
                  onSelect={() => {
                    setValue('');
                    setOpen(false);
                  }}
                >
                  <Plus className='mr-2 h-4 w-4 opacity-50' />
                  Add new plan
                </CommandItem>
              </Link>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
