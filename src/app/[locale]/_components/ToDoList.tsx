'use client';

import { trpc } from '../../_trpc/client';

export default function ToDoList() {
  const getTodos = trpc.getTodos.useQuery();

  return (
    <div>
      <p>Client Side Todos</p>

      <p>{JSON.stringify(getTodos.data)}</p>
    </div>
  );
}
