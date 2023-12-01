import { getDictionary } from '@/lib/dictionaries';
import { type Locale } from '@/i18n-config';
import { api } from '@/trpc/server';

import { Heading } from '@/components/atoms/heading';
import ToDoList from './_components/ToDoList';

interface Props {
  params: { locale: Locale };
}

export default async function Page({ params }: Props) {
  const dict = await getDictionary(params.locale);
  const todos = await api.todo.getTodos.query();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Heading>{dict['greeting']}</Heading>

      <div>
        <p>Server Side Todos</p>

        <p>{JSON.stringify(todos)}</p>
      </div>

      <ToDoList />
    </div>
  );
}
