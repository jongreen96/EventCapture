import { addUserPlan } from '@/db/queries';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('Stripe-Signature')!,
    process.env.STRIPE_WEBHOOK_SECRET!,
  );

  if (event.type === 'charge.succeeded') {
    const charge = event.data.object;
    const { plan, userId } = charge.metadata;
    const eventName = charge.billing_details.name || plan;

    if (
      plan !== 'enterprise' &&
      plan !== 'small' &&
      plan !== 'medium' &&
      plan !== 'large'
    )
      return;

    await addUserPlan({
      user: userId,
      plan,
      eventName,
    });

    return new NextResponse('OK', { status: 200 });
  }

  return new NextResponse('OK', { status: 202 });
}
