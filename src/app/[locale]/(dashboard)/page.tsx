import { getTranslations } from 'next-intl/server';
import { type ColumnDef } from '@tanstack/react-table';

import { api } from '@/trpc/server';
import { type RouterOutputs } from '@/trpc/shared';

import { Heading } from '@/components/atoms/heading';
import { Button } from '@/components/atoms/button';
import DataTable from '@/components/organisms/DataTable';
import Modal from '@/components/molecules/Modal';

const columns: ColumnDef<RouterOutputs['todo']['getOne']>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'createdBy', header: 'Created by' },
];

export default async function Page() {
  const t = await getTranslations('homepage');
  const todos = await api.todo.getAll.query();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center gap-4 mb-8">
        <Heading type="h1">{t('title')}</Heading>

        <Modal trigger={<Button>Add</Button>} title="Add todo">
          Add todo
        </Modal>
      </div>

      <DataTable columns={columns} data={todos} />
    </div>
  );
}
