import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FormFocusButton from '@/components/ui/form-focus-button';
import { Separator } from '@/components/ui/separator';
import type { Plans } from '@/db/schema';
import PlanDialog from './plan-dialog';

export const plansData = {
  small: {
    name: 'small',
    price: 5,
    duration: 1,
    guests: Infinity,
    storageLimit: 5, // GB
    // ~ 1000 images @ 5MB each
    // £0.33 total costs @ max usage inc stripe fees (1.5% + 20p)
    // £4.67 profit
  },
  medium: {
    name: 'medium',
    price: 40,
    duration: 3,
    guests: Infinity,
    storageLimit: 50, // GB
    // ~ 10,000 images @ 5MB each
    // £2.45 total costs @ max usage inc stripe fees (1.5% + 20p)
    // £37.55 profit
  },
  large: {
    name: 'large',
    price: 100,
    duration: 6,
    guests: Infinity,
    storageLimit: 250, // GB
    // ~ 50,000 images @ 5MB each
    // £18.20 total costs @ max usage inc stripe fees (1.5% + 20p)
    // £81.80 profit
  },
  enterprise: {
    name: 'enterprise',
    price: 500,
    duration: 12,
    guests: Infinity,
    storageLimit: 1024, // GB
    // ~ 200,000 images @ 5MB each
    // £142.87 total costs @ max usage inc stripe fees (1.5% + 20p)
    // £357.13 profit
  },
};

export default function Plans({
  reference,
  userId = '',
  plans = [],
}: {
  reference: boolean;
  userId?: string;
  plans?: Plans[];
}) {
  return (
    <section className='container flex flex-col items-center p-4 text-center'>
      <h2 className='max-w-prose text-3xl font-semibold'>Plans & Prices</h2>
      <p className='max-w-prose text-muted-foreground'>
        From small groups to festivals, we have a plan for every occasion.
      </p>

      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:flex-row'>
        <Card className='transition-all hover:scale-105 hover:shadow-lg'>
          <CardHeader>
            <CardTitle>Small Plan</CardTitle>
          </CardHeader>

          <CardContent className='space-y-2'>
            <div className='flex items-center justify-center gap-2 text-left'>
              <p className='text-5xl font-bold text-primary'>
                <span className='font-normal'>£</span>
                {plansData.small.price}
              </p>
              <div className='whitespace-nowrap text-xs'>
                <p>{plansData.small.storageLimit} GB Limit</p>
                <p>{plansData.small.duration} months storage</p>
                <p>
                  {plansData.small.guests === Infinity
                    ? 'Unlimited'
                    : plansData.small.guests}{' '}
                  guests
                </p>
              </div>
            </div>
            <p className='font-semibold text-primary'>One Time Purchase</p>

            {reference ? (
              <FormFocusButton />
            ) : (
              <PlanDialog
                plan={plansData.small}
                plans={plans}
                userId={userId}
              />
            )}
          </CardContent>

          <CardFooter>
            <ul className='list-none space-y-1'>
              <li>
                {plansData.small.storageLimit} GB storage limit for{' '}
                {plansData.small.duration} month
              </li>
              <Separator />
              <li>
                ~ {((plansData.small.storageLimit * 1000) / 5).toLocaleString()}{' '}
                images @ 5MB each
              </li>
              <Separator />
              <li>Instant downloads at any time</li>
              <Separator />
              <li>
                {plansData.small.guests === Infinity
                  ? 'Unlimited'
                  : plansData.small.guests}{' '}
                guests
              </li>
            </ul>
          </CardFooter>
        </Card>

        <Card className='transition-all hover:scale-105 hover:shadow-lg'>
          <CardHeader>
            <CardTitle>Medium Plan</CardTitle>
          </CardHeader>

          <CardContent className='space-y-2'>
            <div className='flex items-center justify-center gap-2 text-left'>
              <p className='text-5xl font-bold text-primary'>
                <span className='font-normal'>£</span>
                {plansData.medium.price}
              </p>
              <div className='whitespace-nowrap text-xs'>
                <p>{plansData.medium.storageLimit} GB Limit</p>
                <p>{plansData.medium.duration} months storage</p>
                <p>
                  {plansData.medium.guests === Infinity
                    ? 'Unlimited'
                    : plansData.medium.guests}{' '}
                  guests
                </p>
              </div>
            </div>
            <p className='font-semibold text-primary'>One Time Purchase</p>

            {reference ? (
              <FormFocusButton />
            ) : (
              <PlanDialog
                plan={plansData.medium}
                plans={plans}
                userId={userId}
              />
            )}
          </CardContent>

          <CardFooter>
            <ul className='list-none space-y-1'>
              <li>
                {plansData.medium.storageLimit} GB storage limit for{' '}
                {plansData.medium.duration} month
              </li>
              <Separator />
              <li>
                ~{' '}
                {((plansData.medium.storageLimit * 1000) / 5).toLocaleString()}{' '}
                images @ 5MB each
              </li>
              <Separator />
              <li>Instant downloads at any time</li>
              <Separator />
              <li>
                {plansData.medium.guests === Infinity
                  ? 'Unlimited'
                  : plansData.medium.guests}{' '}
                guests
              </li>
            </ul>
          </CardFooter>
        </Card>

        <Card className='transition-all hover:scale-105 hover:shadow-lg'>
          <CardHeader>
            <CardTitle>Large Plan</CardTitle>
          </CardHeader>

          <CardContent className='space-y-2'>
            <div className='flex items-center justify-center gap-2 text-left'>
              <p className='text-5xl font-bold text-primary'>
                <span className='font-normal'>£</span>
                {plansData.large.price}
              </p>
              <div className='whitespace-nowrap text-xs'>
                <p>{plansData.large.storageLimit} GB Limit</p>
                <p>{plansData.large.duration} months storage</p>
                <p>
                  {plansData.large.guests === Infinity
                    ? 'Unlimited'
                    : plansData.large.guests}{' '}
                  guests
                </p>
              </div>
            </div>
            <p className='font-semibold text-primary'>One Time Purchase</p>

            {reference ? (
              <FormFocusButton />
            ) : (
              <PlanDialog
                plan={plansData.large}
                plans={plans}
                userId={userId}
              />
            )}
          </CardContent>

          <CardFooter>
            <ul className='list-none space-y-1'>
              <li>
                {plansData.large.storageLimit} GB storage limit for{' '}
                {plansData.large.duration} month
              </li>
              <Separator />
              <li>
                ~ {((plansData.large.storageLimit * 1000) / 5).toLocaleString()}{' '}
                images @ 5MB each
              </li>
              <Separator />
              <li>Instant downloads at any time</li>
              <Separator />
              <li>
                {plansData.large.guests === Infinity
                  ? 'Unlimited'
                  : plansData.large.guests}{' '}
                guests
              </li>
            </ul>
          </CardFooter>
        </Card>

        <Card className='transition-all hover:scale-105 hover:shadow-lg'>
          <CardHeader>
            <CardTitle>Enterprise Plan</CardTitle>
          </CardHeader>

          <CardContent className='space-y-2'>
            <div className='flex items-center justify-center gap-2 text-left'>
              <p className='text-5xl font-bold text-primary'>
                <span className='font-normal'>£</span>
                {plansData.enterprise.price}
              </p>
              <div className='whitespace-nowrap text-xs'>
                <p>{plansData.enterprise.storageLimit / 1024} TB Limit</p>
                <p>{plansData.enterprise.duration} months storage</p>
                <p>
                  {plansData.enterprise.guests === Infinity
                    ? 'Unlimited'
                    : plansData.enterprise.guests}{' '}
                  guests
                </p>
              </div>
            </div>
            <p className='font-semibold text-primary'>One Time Purchase</p>

            {reference ? (
              <FormFocusButton />
            ) : (
              <PlanDialog
                plan={plansData.enterprise}
                plans={plans}
                userId={userId}
              />
            )}
          </CardContent>

          <CardFooter>
            <ul className='list-none space-y-1'>
              <li>
                {plansData.enterprise.storageLimit / 1024} TB storage limit for{' '}
                {plansData.enterprise.duration} month
              </li>
              <Separator />
              <li>
                ~{' '}
                {(
                  (plansData.enterprise.storageLimit * 1000) /
                  5
                ).toLocaleString()}{' '}
                images @ 5MB each
              </li>
              <Separator />
              <li>Instant downloads at any time</li>
              <Separator />
              <li>
                {plansData.enterprise.guests === Infinity
                  ? 'Unlimited'
                  : plansData.enterprise.guests}{' '}
                guests
              </li>
            </ul>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
