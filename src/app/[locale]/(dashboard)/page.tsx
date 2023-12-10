import { getTranslations } from 'next-intl/server';

import { api } from '@/trpc/server';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Heading } from '@/components/atoms/heading';
import { Button } from '@/components/atoms/button';
import FormDialogTemplate from '@/components/templates/FormDialogTemplate';
import TodoForm from './_components/TodoForm';
import TodoTable from './_components/TodoTable';

export default async function Page() {
  const t = await getTranslations('homepage');
  const todos = await api.todo.getAll.query();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center gap-4 mb-8">
        <Heading type="h1">{t('title')}</Heading>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add</Button>
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
