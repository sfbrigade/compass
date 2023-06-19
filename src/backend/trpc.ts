import { TRPCError, initTRPC } from "@trpc/server";
import { createContext } from "./context";
import superjson from "superjson";

export const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

const isAuthenticated = t.middleware(({ next, ctx }) => {
  if (ctx.auth.type === "none") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth,
    },
  });
});

const isAdmin = t.middleware(({ next, ctx }) => {
  if (ctx.auth.type !== "session" || ctx.auth.role !== "admin") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth,
    },
  });
});

export const router = t.router;
export const authenticatedProcedure = t.procedure.use(isAuthenticated);
export const adminProcedure = t.procedure.use(isAuthenticated).use(isAdmin);
