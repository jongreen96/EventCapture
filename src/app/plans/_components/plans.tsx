import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FormFocusButton from '@/components/ui/form-focus-button';
import type { Plans } from '@/db/schema';
import PlanDialog from './plan-dialog';

export const plansData = {
  small: {
    name: 'small',
    price: 5,
    duration: 3,
    guests: Infinity,
  },
  medium: {
    name: 'medium',
    price: 40,
    duration: 3,
    guests: Infinity,
  },
  large: {
    name: 'large',
    price: 100,
    duration: 3,
    guests: Infinity,
  },
  enterprise: {
    name: 'enterprise',
    price: 500,
    duration: 3,
    guests: Infinity,
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
                <span className='font-normal'>£</span>5
              </p>
              <div className='whitespace-nowrap text-xs'>
                <p>{plansData.small.duration} months storage</p>
                <p>Instant downloads</p>
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
            <ul className='list-disc'>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
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
                <p>{plansData.medium.duration} months storage</p>
                <p>Instant downloads</p>
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
            <ul className='list-disc'>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
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
                <p>{plansData.large.duration} months storage</p>
                <p>Instant downloads</p>
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
            <ul className='list-disc'>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
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
                <p>{plansData.enterprise.duration} months storage</p>
                <p>Instant downloads</p>
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
            <ul className='list-disc'>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
              <li>Lorem ipsum, dolor sit</li>
            </ul>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
