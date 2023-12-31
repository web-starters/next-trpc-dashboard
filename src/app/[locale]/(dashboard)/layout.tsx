import { type ReactNode } from 'react';

import { getServerAuthSession } from '@/server/auth';
import { redirect } from '@/lib/navigation';

import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

interface Props {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const session = await getServerAuthSession();

  if (!session) return redirect('/signin');

  return (
    <>
      <Header user={session.user} />

      <main className="w-full min-h-[calc(100vh-192px)] md:min-h-[calc(100vh-142px)] px-5 py-8">
        {children}
      </main>

      <Footer />
    </>
  );
}
