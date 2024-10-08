'use client';

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
import ImagePreview from './image-preview';

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
            {plan.images.length}
          </CardContent>
        </Card>

        <Card className='cursor-pointer'>
          <CardHeader className='pb-0'>
            <CardTitle className='flex items-center gap-2 text-base'>
              <User className='size-4 text-muted-foreground' /> Guests
            </CardTitle>
          </CardHeader>
          <CardContent className='text-5xl font-semibold tracking-tight'>
            {
              plan.images.reduce((acc, image) => {
                acc.add(image.guest);
                return acc;
              }, new Set<string>()).size
            }
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
            TBC
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
          <CardContent>
            {plan.images.length === 0 && (
              <div className='flex h-20 w-full items-center justify-center'>
                No photos uploaded yet
              </div>
            )}
            <div className='grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2'>
              {plan.images.map((image, index) => (
                <div
                  key={index}
                  className='relative w-full'
                  style={{ paddingTop: '100%' }}
                >
                  <ImagePreview image={image} />
                </div>
              ))}
            </div>
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
                {plan.images.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2}>No photos uploaded yet</TableCell>
                  </TableRow>
                )}
                {Array.from(
                  plan.images.reduce((acc, image) => {
                    acc.set(image.guest, (acc.get(image.guest) || 0) + 1);
                    return acc;
                  }, new Map<string, number>()),
                )
                  .sort((a, b) => b[1] - a[1])
                  .map(([guest, count]) => (
                    <TableRow key={guest}>
                      <TableCell>{guest}</TableCell>
                      <TableCell>{count}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
