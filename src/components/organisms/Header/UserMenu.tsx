'use client';

import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';
import { type Session } from 'next-auth';

import { Text } from '@/components/atoms/text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  user: Session['user'];
}

export default function UserMenu({ user }: Props) {
  const t = useTranslations('layout');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-4">
          <Text>{user.name}</Text>
          <Avatar>
            {user.image ? <AvatarImage src={user.image} /> : null}
            <AvatarFallback>{user.name?.split('')[0]}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/signin' })}>
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
