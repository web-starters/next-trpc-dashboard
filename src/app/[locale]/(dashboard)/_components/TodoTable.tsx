'use client';

// import { useTranslations } from 'next-intl';
import { MoreHorizontal } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { type RouterOutputs } from '@/trpc/shared';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/molecules/dropdown-menu';
import DataTable from '@/components/organisms/DataTable';
import TodoForm from './TodoForm';

interface Props {
  data: RouterOutputs['todo']['getAll'];
}

export default function TodoTable({ data }: Props) {
  //   const t = useTranslations();

  const columns: ColumnDef<RouterOutputs['todo']['getOne']>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'createdBy', header: 'Created by' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const item = row.original;

        if (!item) return;

        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DialogTrigger asChild>
                  <DropdownMenuItem>Update</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update todo</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <TodoForm itemToUpdate={item.id} values={{ name: item.name }} />
              </div>
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
