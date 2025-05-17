import { LogOutIcon } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from './ui/Button';
import { Tooltip } from './ui/Tooltip';
import { useAuth } from '@/hooks/useAuth';

export function AppBar() {
  const { signedIn } = useAuth();

  return (
    <div className="fixed right-4 top-4 flex items-center gap-4">
      <ThemeSwitcher />

      {signedIn && (
        <Tooltip content="Sair">
          <Button variant="secondary" size="icon" className="rounded-full">
            <LogOutIcon className='w4 h-4' />
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
