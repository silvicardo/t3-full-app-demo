import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const todoRouter = createTRPCRouter({
  getMyTods: protectedProcedure.query(({ ctx }) => {
    return ctx.db.todo.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, { message: "Almeno un carattere" }),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.todo.create({
        data: {
          title: input.title,
          createdById: ctx.session.user.id,
        },
      }),
    ),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.todo.delete({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
      });
    }),
});
