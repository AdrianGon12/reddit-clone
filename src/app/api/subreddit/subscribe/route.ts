import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubredditSubscriptionValidator } from '@/lib/validators/subreddit';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) return new Response('Unauthorized', { status: 401 });

    const body = await req.json();
    const { subredditId } = SubredditSubscriptionValidator.parse(body);

    // verificar si el usuario ya está suscrito al subreddit
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (subscriptionExists)
      return new Response('Ya estás suscrito al subreddit', { status: 400 });

    // crear suscripción
    await db.subscription.create({
      data: {
        subredditId,
        userId: session.user.id,
      },
    });

    return new Response(subredditId);
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response(error.message, { status: 400 });

    return new Response(
      'No se pudo suscribir al subreddit. Inténtelo de nuevo más tarde',
      { status: 500 }
    );
  }
}
