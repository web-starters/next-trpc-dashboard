'use client';

import { trpc } from '../../_trpc/client';

export default function ToDoList() {
  const getTodos = trpc.getTodos.useQuery();

  return <div>{JSON.stringify(getTodos.data)}</div>;
}
