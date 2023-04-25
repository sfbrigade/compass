import { TRPCError, initTRPC } from "@trpc/server";
import { createContext } from "./context";

export const t = initTRPC.context<typeof createContext>().create();

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

export const router = t.router;
export const procedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
