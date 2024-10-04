import { addImageToPlan } from '@/db/queries';

export async function POST(req: Request) {
  const { planId, guest, url } = await req.json();

  try {
    await addImageToPlan(planId, guest, url);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error adding image to plan:', error);
    return new Response('Error adding image to plan', { status: 500 });
  }
}
