import { getServerAuthSession } from '@/server/auth';

import { Icons } from '@/components/atoms/icons';
import { ThemeToggle } from '@/components/molecules/theme-toggle';
import { LocaleToggle } from '@/components/molecules/locale-toggle';
import { Navigation } from '@/components/molecules/navigation';
import UserMenu from './UserMenu';

const navigationItems = [{ name: 'Homepage', link: '/' }];

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="w-full p-5 border-b bg-palette-50 dark:bg-palette-900">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto space-x-10">
        <Icons.logo className="w-20 h-6" />

        <Navigation items={navigationItems} />

        <div className="flex gap-4">
          {session?.user ? <UserMenu user={session.user} /> : null}

          <div className="flex gap-4">
            <ThemeToggle />
            <LocaleToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
