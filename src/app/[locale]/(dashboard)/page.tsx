import { getTranslations } from 'next-intl/server';

import { api } from '@/trpc/server';

import { Heading } from '@/components/atoms/heading';
import ToDoList from './_components/ToDoList';

export default async function Page() {
  const t = await getTranslations('Index');
  const todos = await api.todo.getTodos.query();

  return (
    <div className="max-w-7xl mx-auto">
      <Heading>{t('title')}</Heading>

      <div>
        <p>Server Side Todos</p>

        <p>{JSON.stringify(todos)}</p>
      </div>

      <ToDoList />
    </div>
  );
}
