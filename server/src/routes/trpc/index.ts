import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext, t } from "./context";
import { studentProcedures } from "./students";

const router = t.router;

const trpcRouter = router({
  ...studentProcedures,
});

export const withTrpc = createExpressMiddleware({
  router: trpcRouter,
  createContext,
});

export type AppRouter = typeof trpcRouter;
