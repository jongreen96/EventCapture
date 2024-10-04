import React from 'react';

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex min-h-[calc(100vh-52px)] items-center justify-center'>
      {children}
    </main>
  );
}
