import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const todoRouter = createTRPCRouter({
  getOne: protectedProcedure.input(z.object({ id: z.string().min(1) })).query(({ ctx, input }) => {
    return ctx.db.todo.findFirst({
      where: {
        id: input.id,
        createdBy: ctx.session.user.id,
      },
    });
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.todo.findMany({
      where: {
        createdBy: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.create({
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
        where: {
          id: input.id,
          createdBy: ctx.session.user.id,
        },
      });
    }),
});
