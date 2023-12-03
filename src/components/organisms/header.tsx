import Link from 'next/link';

import { getServerAuthSession } from '@/server/auth';

import { Icons } from '@/components/atoms/icons';
import { Text } from '@/components/atoms/text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import { LocaleToggle } from '@/components/molecules/locale-toggle';
import { ThemeToggle } from '@/components/molecules/theme-toggle';
import { Navigation } from '@/components/molecules/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/molecules/dropdown-menu';

const navigationItems = [{ name: 'Homepage', link: '/' }];

export async function Header() {
  const session = await getServerAuthSession();

  const name = session?.user?.name;
  const image = session?.user?.image;

  return (
    <header className="w-full p-5 border-b bg-palette-50 dark:bg-palette-900">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto space-x-10">
        <Icons.logo className="w-20 h-6" />

        <Navigation items={navigationItems} />

        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-4">
                <Text>{name}</Text>
                <Avatar>
                  {image ? <AvatarImage src={image} /> : null}
                  <AvatarFallback>{name?.split('')[0]}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/api/auth/signout">
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-4">
            <LocaleToggle />

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
