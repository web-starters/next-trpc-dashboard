import { getProviders } from 'next-auth/react';
import { getTranslations } from 'next-intl/server';

import { Heading } from '@/components/atoms/heading';
import SignInProviders from './_components/SignInProviders';

export async function generateMetadata() {
  const t = await getTranslations('signin');

  return {
    title: t('title'),
  };
}

export default async function Page() {
  const providers = await getProviders();
  const t = await getTranslations('signin');

  return (
    <div className="text-center">
      <Heading>{t('title')}</Heading>

      <SignInProviders providers={Object.values(providers ?? [])} />
    </div>
  );
}
