'use client';

import tempimage from '@/assets/userImagePlaceholder.jpg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plan } from '@/db/schema';
import { cn } from '@/lib/utils';
import { BarChart3, Calendar, ImageIcon, User } from 'lucide-react';
import Image from 'next/image';

export default function Overview({ plan }: { plan: Plan }) {
  const hoursRemaining = Math.floor(
    (plan.endDate.getTime() - new Date().getTime()) / 1000 / 60 / 60,
  );

  return (
    <div className='space-y-4'>
      <section className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <Card className='cursor-pointer'>
          <CardHeader className='pb-0'>
            <CardTitle className='flex items-center gap-2 text-base'>
              <ImageIcon className='size-4 text-muted-foreground' />
              Photos
            </CardTitle>
          </CardHeader>
          <CardContent className='text-5xl font-semibold tracking-tight'>
            218
          </CardContent>
        </Card>

        <Card className='cursor-pointer'>
          <CardHeader className='pb-0'>
            <CardTitle className='flex items-center gap-2 text-base'>
              <User className='size-4 text-muted-foreground' /> Guests
            </CardTitle>
          </CardHeader>
          <CardContent className='text-5xl font-semibold tracking-tight'>
            69
          </CardContent>
        </Card>

        <Card className='cursor-pointer'>
          <CardHeader className='pb-0'>
            <CardTitle className='flex items-center gap-2 text-base'>
              <BarChart3 className='size-4 text-muted-foreground' />
              Usage
            </CardTitle>
          </CardHeader>
          <CardContent className='text-5xl font-semibold tracking-tight'>
            18
            <span className='ml-2 text-sm font-normal'>GB</span>
            <span className='ml-2 text-sm font-normal'>/ 100 GB</span>
          </CardContent>
        </Card>

        <Card
          className={cn(
            'cursor-pointer',
            hoursRemaining < 24 && 'animate-pulse bg-destructive/50',
          )}
        >
          <CardHeader className='pb-0'>
            <CardTitle className='flex items-center gap-2 text-base'>
              <Calendar className='size-4 text-muted-foreground' />
              {hoursRemaining > 24 ? 'Days Remaining' : 'Hours Remaining'}
            </CardTitle>
          </CardHeader>
          <CardContent className='text-5xl font-semibold tracking-tight'>
            {hoursRemaining > 24
              ? Math.floor(hoursRemaining / 24)
              : hoursRemaining}
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 md:grid-cols-3'>
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between gap-2'>
              Photos
              <Button variant='outline'>View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-wrap gap-2'>
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
            <Image src={tempimage} alt='Photos' width={100} height={100} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between gap-2'>
              Guests
              <Button variant='outline'>View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Photos</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>83</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>43</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>38</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>20</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>16</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
