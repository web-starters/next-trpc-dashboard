'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { MoreHorizontal } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { api } from '@/trpc/react';
import { type RouterOutputs } from '@/trpc/shared';

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
  const locale = useLocale();
  const globalT = useTranslations('global');
  const t = useTranslations('homepage.table');
  const removeTodo = api.todo.remove.useMutation({
    onSuccess: () => {
      toast({ title: t('message_removed'), duration: 5000 });
      router.refresh();
    },
    onError: () => {
      toast({ variant: 'destructive', title: globalT('message_wrong'), duration: 5000 });
    },
  });

  const columns: ColumnDef<RouterOutputs['todo']['getOne']>[] = [
    { accessorKey: 'name', header: t('name') },
    {
      accessorKey: 'updatedAt',
      header: t('updated_at'),
      cell: ({ row }) => {
        const updatedAt: Date = row.getValue('updatedAt');
        return updatedAt.toLocaleDateString(locale);
      },
    },
    {
      accessorKey: 'createdAt',
      header: t('created_at'),
      cell: ({ row }) => {
        const createdAt: Date = row.getValue('createdAt');
        return createdAt.toLocaleDateString(locale);
      },
    },
    {
      id: 'actions',
      header: t('actions'),
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
                    <DropdownMenuItem>{globalT('edit')}</DropdownMenuItem>
                  </DialogTrigger>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem>{globalT('remove')}</DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogTemplate
                title={t('question_remove', { name: item.name })}
                handleSubmit={() => removeTodo.mutate({ id: item.id })}
              />
            </AlertDialog>

            <FormDialogTemplate title={`${globalT('edit')} todo`}>
              <TodoForm itemToUpdate={item.id} values={{ name: item.name }} />
            </FormDialogTemplate>
          </Dialog>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
