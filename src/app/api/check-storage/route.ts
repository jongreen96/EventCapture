import { checkStorageCapacity } from '@/db/queries';

export async function POST(req: Request) {
  const { uploadSize, planId } = await req.json();

  const hasSpace = await checkStorageCapacity(uploadSize, planId);

  if (!hasSpace)
    return new Response('Storage limit exceeded, please contact the host', {
      status: 403,
    });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
