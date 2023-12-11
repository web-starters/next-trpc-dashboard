'use client';

import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { api } from '@/trpc/react';
import { type RouterOutputs } from '@/trpc/shared';
import { useLocale } from '@/hooks/useLocale';
import { useToast } from '@/components/ui/use-toast';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/molecules/dropdown-menu';
import DataTable from '@/components/organisms/DataTable';
import FormDialogTemplate from '@/components/templates/FormDialogTemplate';
import AlertDialogTemplate from '@/components/templates/AlertDialogTemplate';
import TodoForm from './TodoForm';

interface Props {
  data: RouterOutputs['todo']['getAll'];
}

export default function TodoTable({ data }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { locale } = useLocale();
  const removeTodo = api.todo.remove.useMutation({
    onSuccess: () => {
      toast({ title: 'Todo item has been removed.', duration: 5000 });
      router.refresh();
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Something went wrong.', duration: 5000 });
    },
  });

  const columns: ColumnDef<RouterOutputs['todo']['getOne']>[] = [
    { accessorKey: 'name', header: 'Name' },
    {
      accessorKey: 'updatedAt',
      header: 'Updated at',
      cell: ({ row }) => {
        const updatedAt: Date = row.getValue('updatedAt');

        return updatedAt.toLocaleDateString(locale);
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created at',
      cell: ({ row }) => {
        const createdAt: Date = row.getValue('createdAt');

        return createdAt.toLocaleDateString(locale);
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const item = row.original;

        if (!item) return;

        return (
          <Dialog>
            <AlertDialog>
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
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogTemplate
                title={`Are you sure you want to remove ${item.name}`}
                handleSubmit={() => removeTodo.mutate({ id: item.id })}
              />
            </AlertDialog>

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
