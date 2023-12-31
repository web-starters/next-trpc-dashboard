import { type ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getServerAuthSession } from '@/server/auth';

import { Logo } from '@/components/atoms/icons';
import Footer from '@/components/organisms/Footer';

interface Props {
  children: ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  const session = await getServerAuthSession();

  if (session) redirect('/');

  return (
    <>
      <header className="flex justify-center px-5 pt-20">
        <Logo className="w-40 h-9" />
      </header>

      <main className="flex flex-col justify-center max-w-md min-h-[calc(100vh-227px)] md:min-h-[calc(100vh-177px)] mx-auto px-5 py-20">
        {children}
      </main>

      <Footer />
    </>
  );
}
