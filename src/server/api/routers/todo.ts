import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const createTodoInput = z.object({
  name: z.string().min(1),
});

export const todoRouter = createTRPCRouter({
  getOne: protectedProcedure.input(z.object({ id: z.string().min(1) })).query(({ ctx, input }) => {
    return ctx.db.todo.findFirst({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: input.id,
        createdBy: ctx.session.user.id,
      },
    });
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.todo.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        createdBy: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure.input(createTodoInput).mutation(async ({ ctx, input }) => {
    return ctx.db.todo.create({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      data: {
        name: input.name,
        createdBy: ctx.session.user.id,
      },
    });
  }),

  update: protectedProcedure
    .input(z.object({ id: z.string().min(1), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.update({
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          id: input.id,
          createdBy: ctx.session.user.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.delete({
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          id: input.id,
          createdBy: ctx.session.user.id,
        },
      });
    }),
});
