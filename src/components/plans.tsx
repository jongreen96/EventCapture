import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import FormFocusButton from './ui/formfocusbutton';

export default function Plans() {
  return (
    <section className='container flex flex-col items-center p-4 text-center'>
      <h2 className='max-w-prose text-3xl font-semibold'>Plans & Prices</h2>
      <p className='max-w-prose text-muted-foreground'>
        From small groups to festivals, we have a plan for every occasion.
      </p>

      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:flex-row'>
        <Card className='transition-all hover:scale-105'>
          <CardHeader>
            <CardTitle>Small Plan</CardTitle>
          </CardHeader>

          <CardContent className='space-y-2'>
            <div className='flex items-center justify-center gap-2 text-left'>
              <p className='text-5xl font-bold text-primary'>
                <span className='font-normal'>$</span>5
              </p>
              <div className='whitespace-nowrap text-xs'>
                <p>3 months storage</p>
                <p>Instant downloads</p>
                <p>Unlimited guests</p>
              </div>
            </div>
            <p className='font-semibold text-primary'>One Time Purchase</p>
            <FormFocusButton />
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

        <Card className='transition-all hover:scale-105'>
          <CardHeader>
            <CardTitle>Medium Plan</CardTitle>
          </CardHeader>

          <CardContent className='space-y-2'>
            <div className='flex items-center justify-center gap-2 text-left'>
              <p className='text-5xl font-bold text-primary'>
                <span className='font-normal'>$</span>40
              </p>
              <div className='whitespace-nowrap text-xs'>
                <p>3 months storage</p>
                <p>Instant downloads</p>
                <p>Unlimited guests</p>
              </div>
            </div>
            <p className='font-semibold text-primary'>One Time Purchase</p>
            <FormFocusButton />
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

        <Card className='transition-all hover:scale-105'>
          <CardHeader>
            <CardTitle>Large Plan</CardTitle>
          </CardHeader>

          <CardContent className='space-y-2'>
            <div className='flex items-center justify-center gap-2 text-left'>
              <p className='text-5xl font-bold text-primary'>
                <span className='font-normal'>$</span>100
              </p>
              <div className='whitespace-nowrap text-xs'>
                <p>3 months storage</p>
                <p>Instant downloads</p>
                <p>Unlimited guests</p>
              </div>
            </div>
            <p className='font-semibold text-primary'>One Time Purchase</p>
            <FormFocusButton />
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

        <Card className='transition-all hover:scale-105'>
          <CardHeader>
            <CardTitle>Gigantic Plan</CardTitle>
          </CardHeader>

          <CardContent className='space-y-2'>
            <div className='flex items-center justify-center gap-2 text-left'>
              <p className='text-5xl font-bold text-primary'>
                <span className='font-normal'>$</span>500
              </p>
              <div className='whitespace-nowrap text-xs'>
                <p>3 months storage</p>
                <p>Instant downloads</p>
                <p>Unlimited guests</p>
              </div>
            </div>
            <p className='font-semibold text-primary'>One Time Purchase</p>
            <FormFocusButton />
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
