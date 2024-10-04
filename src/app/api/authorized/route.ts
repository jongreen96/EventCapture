import { isAuthorized } from '@/db/queries';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { pin, planId } = await req.json();

  if (!pin || !planId)
    return new Response('Missing pin or planId', { status: 400 });

  const authorized = await isAuthorized(pin, planId);

  if (!authorized) return new Response('Invalid pin', { status: 401 });

  return new Response('OK', { status: 200 });
}
