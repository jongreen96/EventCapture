import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <main>
      <div className='container flex flex-col items-center justify-around space-y-6 bg-hero bg-cover bg-center py-6 lg:h-[50vh] lg:min-h-96 lg:flex-row'>
        <div className='max-w-prose space-y-6 text-lg font-semibold'>
          <h1 className='text-5xl font-bold'>
            Never miss the moment with Event Capture
          </h1>
          <p>
            Capture every moment of an event effortlessly from all angles with
            the help of all your guests.
          </p>

          <ul className='space-y-2'>
            <li>📸 Quickly create a QR code for your event</li>
            <li>🕺 Have all your guests send in their photos</li>
            <li>📥 Easily manage and download all your guest photos</li>
            <li>💕 Never forget a moment</li>
            <li>🎉 And much more</li>
          </ul>
        </div>

        <Card className='w-full lg:w-72'>
          <CardContent className='p-4'>
            <form action='' className='flex flex-col space-y-2'>
              <Input type='text' placeholder='Type your email' />
              <Button type='submit' className='w-full'>
                Capture your moment
              </Button>

              <div className='flex items-center justify-center space-x-2'>
                <Separator className='mt-1 w-5/12' />
                <p className='text-center text-muted-foreground'>or</p>
                <Separator className='mt-1 w-5/12' />
              </div>

              <Button className='w-full'>Sign in with Google</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
