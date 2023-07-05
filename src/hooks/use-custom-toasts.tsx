import { toast } from './use-toast';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description:
        'Necesita haber ingresado a su cuenta para realizar esa acción.',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href='/login'
          className={buttonVariants({ variant: 'outline' })}
        >
          Ingresar
        </Link>
      ),
    });
  };

  return { loginToast };
};
