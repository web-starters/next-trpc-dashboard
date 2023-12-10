'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { api } from '@/trpc/react';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/atoms/button';

const formSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
});

interface Props {
  values?: z.infer<typeof formSchema>;
  itemToUpdate?: string;
}

export default function TodoForm({ values, itemToUpdate }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: values?.name || '',
    },
  });
  const createTodo = api.todo.create.useMutation({
    onSuccess: () => router.refresh(),
  });
  const updateTodo = api.todo.update.useMutation({
    onSuccess: () => router.refresh(),
  });
  const router = useRouter();

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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
