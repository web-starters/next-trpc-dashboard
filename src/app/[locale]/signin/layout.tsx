import { type ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getServerAuthSession } from '@/server/auth';

import { Icons } from '@/components/atoms/icons';
import Footer from '@/components/organisms/Footer';

interface Props {
  children: ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  const session = await getServerAuthSession();

  if (session) redirect('/');

  return (
    <>
      <header className="flex justify-center p-5">
        <Icons.logo className="w-40 h-9" />
      </header>

      <main className="flex flex-col justify-center max-w-md mx-auto p-5">{children}</main>

      <Footer />
    </>
  );
}
