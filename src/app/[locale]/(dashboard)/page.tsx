import { getTranslations } from 'next-intl/server';
import { type ColumnDef } from '@tanstack/react-table';

import { api } from '@/trpc/server';
import { type RouterOutputs } from '@/trpc/shared';

import { Heading } from '@/components/atoms/heading';
import DataTable from '@/components/organisms/DataTable';

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
      <Heading>{t('title')}</Heading>

      <DataTable columns={columns} data={todos} />
    </div>
  );
}
