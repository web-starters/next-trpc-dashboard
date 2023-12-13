import { getTranslations } from 'next-intl/server';

import { api } from '@/trpc/server';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Heading from '@/components/atoms/Heading';
import FormDialogTemplate from '@/components/templates/FormDialogTemplate';
import TodoForm from './_components/TodoForm';
import TodoTable from './_components/TodoTable';

export default async function Page() {
  const t = await getTranslations('homepage');
  const globalT = await getTranslations('global');
  const todos = await api.todo.getAll.query();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center gap-4 mb-8">
        <Heading type="h1">{t('title')}</Heading>

        <Dialog>
          <DialogTrigger asChild>
            <Button>{globalT('add')}</Button>
          </DialogTrigger>

          <FormDialogTemplate title="Add todo">
            <TodoForm />
          </FormDialogTemplate>
        </Dialog>
      </div>

      <TodoTable data={todos} />
    </div>
  );
}
