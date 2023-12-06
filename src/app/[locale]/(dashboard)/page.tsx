import { getTranslations } from 'next-intl/server';

import { api } from '@/trpc/server';

import { Heading } from '@/components/atoms/heading';

export default async function Page() {
  const t = await getTranslations('homepage');
  const todos = await api.todo.getAll.query();

  return (
    <div className="max-w-7xl mx-auto">
      <Heading>{t('title')}</Heading>

      <p>{JSON.stringify(todos)}</p>
    </div>
  );
}
