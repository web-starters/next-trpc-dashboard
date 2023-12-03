import { type ReactNode } from 'react';

import { Header } from '@/components/organisms/header';
import { Footer } from '@/components/organisms/footer';

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
