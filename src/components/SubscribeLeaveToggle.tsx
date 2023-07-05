'use client';

import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { useToast } from '@/hooks/use-toast';
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';
import { Button } from './ui/button';

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  subredditId: string;
  subredditName: string;
}

const SubscribeLeaveToggle = ({
  isSubscribed,
  subredditId,
  subredditName,
}: SubscribeLeaveToggleProps) => {
  const { toast } = useToast();
  const { loginToast } = useCustomToasts();
  const router = useRouter();

  // SUSCRIBIRSE
  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post('/api/subreddit/subscribe', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) return loginToast();
      }

      return toast({
        title: 'Ha ocurrido un error.',
        description: 'Algo salió mal. Inténtelo de nuevo más tarde.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // actualiza la url actual y fetch la data nueva del servidor, sin perder el navegador client-side o el react state
        router.refresh();
      });
      toast({
        title: 'Suscripción exitosa!',
        description: `Ahora pertenece a la comunidad r/${subredditName}`,
      });
    },
  });

  // DESUSCRIBIRSE
  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post('/api/subreddit/unsubscribe', payload);
      return data as string;
    },
    onError: (err: AxiosError) => {
      toast({
        title: 'Ha ocurrido un error.',
        description: err.response?.data as string,
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // actualiza la url actual y fetch la data nueva del servidor, sin perder el navegador client-side o el react state
        router.refresh();
      });
      toast({
        title: 'Desuscripción exitosa.',
        description: `Se ha desuscrito de la comunidad r/${subredditName}`,
      });
    },
  });

  return isSubscribed ? (
    <Button
      className='w-full mt-1 mb-4'
      isLoading={isUnsubLoading}
      onClick={() => unsubscribe()}
    >
      Abandonar comunidad
    </Button>
  ) : (
    <Button
      className='w-full mt-1 mb-4'
      isLoading={isSubLoading}
      onClick={() => subscribe()}
    >
      Unirse para crear posts
    </Button>
  );
};

export default SubscribeLeaveToggle;
