'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { api } from '@/trpc/react';

import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1),
});

interface Props {
  values?: z.infer<typeof formSchema>;
  itemToUpdate?: string;
}

export default function TodoForm({ values, itemToUpdate }: Props) {
  const globalT = useTranslations('global');
  const t = useTranslations('homepage.table');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
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
