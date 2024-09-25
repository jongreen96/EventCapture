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
import type { Plan } from '@/db/schema';
import { ChevronDown } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PlanSelector({
  plans,
  params,
}: {
  plans: Plan[];
  params: { event: string };
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(decodeURIComponent(params.event) || '');

  // Redirect to selected plan
  useEffect(() => {
    if (decodeURIComponent(params.event) !== value) {
      redirect(`/dashboard/${encodeURIComponent(value)}/overview`);
    }
  }, [params.event, value]);

  return (
    <div className='flex items-center gap-2'>
      <p className='font-bold'>Plan:</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-[200px] justify-between'
          >
            {value || 'Choose a plan'}
            <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Search plan...' />
            <CommandList>
              <CommandEmpty>No plan found.</CommandEmpty>

              {plans.map((plan: Plan, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setValue(plan.eventName);
                    setOpen(false);
                  }}
                >
                  {index + 1}. {plan.eventName}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// TODO: Add new plan button to bottom of combobox
