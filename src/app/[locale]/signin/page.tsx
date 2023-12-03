import { getTranslations } from 'next-intl/server';

import { Heading } from '@/components/atoms/heading';

export default async function Page() {
  const t = await getTranslations('Index');

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Heading>{t('title')}</Heading>
    </div>
  );
}
