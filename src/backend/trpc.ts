import { TRPCError, initTRPC } from "@trpc/server";
import { createContext } from "./context";
import superjson from "superjson";

// initialize tRPC exactly once per application:
export const t = initTRPC.context<typeof createContext>().create({
  // SuperJSON allows us to transparently use, e.g., standard Date/Map/Sets
  // over the wire between the server and client.
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

// Define and export the tRPC router
export const router = t.router;
export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(isAuthenticated);
export const adminProcedure = t.procedure.use(isAuthenticated).use(isAdmin);
