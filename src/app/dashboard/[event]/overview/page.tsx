import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUserPlan } from '@/db/queries';
import getSession from '@/lib/getSession';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Calendar,
  ImageIcon,
  MessageCircleQuestionIcon,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ImagePreview from '../../_components/image-preview';

export default async function OverviewPage({
  params,
}: {
  params: { event: string };
}) {
  const session = await getSession();
  if (!session?.user?.id) redirect('/');

  const plan = await getUserPlan(
    session.user.id,
    decodeURIComponent(params.event),
  );
  if (!plan) redirect('/plans');

  const hoursRemaining = Math.floor(
    (plan.endDate.getTime() - new Date().getTime()) / 1000 / 60 / 60,
  );

  const storageUsed =
    plan.images.reduce((acc, image) => acc + image.size, 0) / 1024 ** 3;

  return (
    <div className='select-none space-y-4'>
      <section className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <Link href={`/dashboard/${params.event}/photos`}>
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
        </Link>

        <Link href={`/dashboard/${params.event}/photos?sort=guest`}>
          <Card>
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
        </Link>

        <Card
          className={cn(
            storageUsed >= plan.storageLimit * 0.9 &&
              'animate-pulse bg-destructive/50',
          )}
        >
          <CardHeader className='pb-0'>
            <CardTitle className='flex items-center justify-between gap-2 text-base'>
              <div className='flex items-center gap-2 text-base'>
                <BarChart3 className='size-4 text-muted-foreground' />
                Usage
              </div>
              <HoverCard>
                <HoverCardTrigger>
                  <MessageCircleQuestionIcon className='size-4 text-muted-foreground' />
                </HoverCardTrigger>
                <HoverCardContent>
                  Limit {plan.storageLimit} GB
                </HoverCardContent>
              </HoverCard>
            </CardTitle>
          </CardHeader>
          <CardContent className='text-5xl font-semibold tracking-tight'>
            {storageUsed > 0 ? storageUsed.toFixed(2) : 0}
            <span className='ml-2 text-sm font-normal'>GB</span>
          </CardContent>
        </Card>

        <Card
          className={cn(
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
              <Button asChild variant='outline'>
                <Link href={`/dashboard/${params.event}/photos`}>View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {plan.images.length === 0 && (
              <div className='flex h-20 w-full items-center justify-center'>
                No photos uploaded yet
              </div>
            )}
            <div className='grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2'>
              {plan.images
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .slice(0, 26)
                .map((image, index) => (
                  <div key={index} className='relative w-full'>
                    <ImagePreview image={image} />
                  </div>
                ))}

              {plan.images.length > 26 && (
                <Link href={`/dashboard/${params.event}/photos`}>
                  <div className='relative aspect-square w-full'>
                    <div className='absolute inset-0 flex items-center justify-center text-center text-gray-500'>
                      +{plan.images.length - 26} more
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className='select-none'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between gap-2'>
              Guests
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
