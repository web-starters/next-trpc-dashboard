'use client';

import { api } from '@/trpc/react';

export default function ToDoList() {
  const getTodos = api.todo.getTodos.useQuery();

  return (
    <div>
      <p>Client Side Todos</p>

      <p>{JSON.stringify(getTodos.data)}</p>
    </div>
  );
}
