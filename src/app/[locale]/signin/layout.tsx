import { type ReactNode } from 'react';

import { Icons } from '@/components/atoms/icons';
import Footer from '@/components/organisms/Footer';

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <>
      <header>
        <Icons.logo className="w-20 h-6" />
      </header>

      <main>{children}</main>

      <Footer />
    </>
  );
}
