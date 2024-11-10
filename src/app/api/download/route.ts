import { getDownload } from '@/db/queries';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const event = searchParams.get('event');
  if (!event) return new Response('Missing event', { status: 400 });

  const presignedUrl = await getDownload(event);
  if (!presignedUrl) return new Response('Download not found', { status: 404 });

  return new Response(presignedUrl);
}
