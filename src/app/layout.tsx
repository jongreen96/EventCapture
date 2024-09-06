import Nav from '@/components/nav';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Event Capture',
  description:
    'Capture every moment of the event effortlessly from all angles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body
        className={cn(
          'dark mb-6 min-h-screen min-w-[430px] bg-background font-sans antialiased',
          inter.className,
        )}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
