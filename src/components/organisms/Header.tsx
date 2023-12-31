import { useTranslations } from 'next-intl';
import { type Session } from 'next-auth';

import { Link } from '@/lib/navigation';

import { Logo } from '@/components/atoms/icons';
import Navigation, { type NavigationItem } from '@/components/molecules/Navigation';
import UserMenu from '@/components/molecules/UserMenu';
import ThemeToggle from '@/components/molecules/ThemeToggle';
import LocaleToggle from '@/components/molecules/LocaleToggle';

interface Props {
  user: Session['user'];
}

export default function Header({ user }: Props) {
  const t = useTranslations('layout');

  const navigationItems: NavigationItem[] = [{ name: t('homepage'), link: '/' }];

  return (
    <header className="w-full p-5 border-b bg-palette-50 dark:bg-palette-900">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto space-x-10">
        <Link href="/">
          <Logo className="w-24 h-5" />
        </Link>

        <Navigation items={navigationItems} />

        <div className="flex gap-4">
          <UserMenu user={user} />

          <div className="flex gap-4">
            <ThemeToggle />
            <LocaleToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
