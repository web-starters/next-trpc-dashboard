import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { api } from '@/trpc/server';
import { getServerAuthSession } from '@/server/auth';

import { Heading } from '@/components/atoms/heading';
import ToDoList from './_components/ToDoList';

export default async function Page() {
  const t = await getTranslations('Index');
  const todos = await api.todo.getTodos.query();
  const session = await getServerAuthSession();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Heading>{t('title')}</Heading>

      <div>
        <p>{session && <span>Logged in as {session.user?.name}</span>}</p>

        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </div>

      <div>
        <p>Server Side Todos</p>

        <p>{JSON.stringify(todos)}</p>
      </div>

      <ToDoList />
    </div>
  );
}
