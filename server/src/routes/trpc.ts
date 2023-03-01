import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { z } from "zod";
import { getDb } from "~/db/lib/get-db";

const createContext = () => {
  return {
    ...getDb(process.env.DATABASE_URL!),
  };
};

const t = initTRPC.context<typeof createContext>().create();

const router = t.router;

const trpcRouter = router({
  studentById: t.procedure
    .input(z.object({ student_id: z.string().uuid() }))
    .query(async (req) => {
      const { student_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("student")
        .where("student_id", "=", student_id)
        .selectAll()
        .executeTakeFirst();

      return result;
    }),
});

export const withTrpc = createExpressMiddleware({
  router: trpcRouter,
  createContext,
});

export type AppRouter = typeof trpcRouter;
