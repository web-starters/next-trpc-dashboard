'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';

import { api } from '@/trpc/react';
import { createTodoInput } from '@/server/api/routers/todo';

import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/atoms/button';

type CreateTodo = z.infer<typeof createTodoInput>;

interface Props {
  values?: CreateTodo;
  itemToUpdate?: string;
}

export default function TodoForm({ values, itemToUpdate }: Props) {
  const globalT = useTranslations('global');
  const t = useTranslations('homepage.table');
  const form = useForm<CreateTodo>({
    resolver: zodResolver(createTodoInput),
    defaultValues: {
      name: values?.name || '',
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      toast({ title: t('message_added'), duration: 5000 });
      router.refresh();
    },
    onError: () => {
      toast({ variant: 'destructive', title: globalT('message_wrong'), duration: 5000 });
    },
  });
  const updateTodo = api.todo.update.useMutation({
    onSuccess: () => {
      toast({ title: t('message_updated'), duration: 5000 });
      router.refresh();
    },
    onError: () => {
      toast({ variant: 'destructive', title: globalT('message_wrong'), duration: 5000 });
    },
  });

  function onSubmit(values: CreateTodo) {
    if (itemToUpdate) updateTodo.mutate({ id: itemToUpdate, name: values.name });
    else createTodo.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('name')} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">{globalT('submit')}</Button>
      </form>
    </Form>
  );
}
