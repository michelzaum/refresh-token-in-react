import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface IFormData {
  email: string;
  password: string;
}

export function SignIn() {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const form = useForm<IFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    try {
      await signIn(email, password);
    } catch {
      toast({
        title: 'Credenciais inválidas',
        variant: 'destructive',
      });
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto max-w-[480px] p-6">
      <h1 className="font-semibold text-xl">Acesse sua conta</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2">
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" {...form.register('email')} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...form.register('password')} />
        </div>

        <Button className="mt-3" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Entrando' : 'Entrar'}
        </Button>
      </form>
    </div>
  );
}
