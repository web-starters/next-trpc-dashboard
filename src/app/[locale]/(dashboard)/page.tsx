import { getTranslations } from 'next-intl/server';

import { api } from '@/trpc/server';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Heading } from '@/components/atoms/heading';
import { Button } from '@/components/atoms/button';
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

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add todo</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <TodoForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <TodoTable data={todos} />
    </div>
  );
}
