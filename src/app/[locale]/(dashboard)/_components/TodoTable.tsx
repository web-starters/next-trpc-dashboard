'use client';

import { MoreHorizontal } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { type RouterOutputs } from '@/trpc/shared';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/molecules/dropdown-menu';
import DataTable from '@/components/organisms/DataTable';
import FormDialogTemplate from '@/components/templates/FormDialogTemplate';
import TodoForm from './TodoForm';

interface Props {
  data: RouterOutputs['todo']['getAll'];
}

export default function TodoTable({ data }: Props) {
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

            <FormDialogTemplate title="Update todo">
              <TodoForm itemToUpdate={item.id} values={{ name: item.name }} />
            </FormDialogTemplate>
          </Dialog>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
