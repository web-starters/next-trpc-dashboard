import '@/styles/globals.css';

import { cookies } from 'next/headers';
import { type Metadata } from 'next';
import { type ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { i18n, type Locale } from '@/i18n-config';
import { siteConfig } from '@/configs/site-config';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { TRPCReactProvider } from '@/trpc/react';

import { ThemeProvider } from '@/providers/theme-provider';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/images/favicon.ico',
  },
};

interface Props {
  children: ReactNode;
  params: { locale: Locale };
}

export function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

export default function RootLayout({ children, params }: Props) {
  if (!i18n.locales.includes(params.locale)) notFound();
  unstable_setRequestLocale(params.locale);
  const messages = useMessages();

  return (
    <html lang={params.locale}>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
