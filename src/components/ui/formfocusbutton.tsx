'use client';

import { Button } from './button';

export default function FormFocusButton() {
  return (
    <Button
      className='w-full'
      onClick={() => document.getElementById('email')?.focus()}
    >
      Get Started
    </Button>
  );
}
