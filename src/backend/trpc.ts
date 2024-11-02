import { TRPCError, initTRPC } from "@trpc/server";
import { Auth, createContext } from "./context";
import superjson from "superjson";
import { UserType } from "@/types/auth";

// Role-based access control type
type RoleLevel = {
  user: 0;
  para: 1;
  case_manager: 2;
  admin: 3;
};

const ROLE_LEVELS: RoleLevel = {
  user: 0,
  para: 1,
  case_manager: 2,
  admin: 3,
};

// Function to compare roles
function hasMinimumRole(auth: Auth, requiredRole: UserType): boolean {
  const { type } = auth;

  return (
    type === "session" && ROLE_LEVELS[auth.role] >= ROLE_LEVELS[requiredRole]
  );
}

// Add this type at the top of the file
type AuthenticatedAuth = Extract<Auth, { type: "session" }>;

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

const atLeastPara = t.middleware(({ next, ctx }) => {
  if (!hasMinimumRole(ctx.auth, UserType.Para)) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth as AuthenticatedAuth,
    },
  });
});

const atLeastCaseManager = t.middleware(({ next, ctx }) => {
  if (!hasMinimumRole(ctx.auth, UserType.CaseManager)) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth as AuthenticatedAuth,
    },
  });
});

const isAdmin = t.middleware(({ next, ctx }) => {
  if (!hasMinimumRole(ctx.auth, UserType.Admin)) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth as AuthenticatedAuth,
    },
  });
});

// Define and export the tRPC router
export const router = t.router;

// Define and export the tRPC procedures that can be used as auth guards inside routes
export const noAuth = t.procedure; // Can be used for public routes
export const hasAuthenticated = t.procedure // for routes that require authentication only, no specific role
  .use(isAuthenticated);
export const hasPara = t.procedure // for routes that require at least para role
  .use(isAuthenticated)
  .use(atLeastPara);
export const hasCaseManager = t.procedure // for routes that require at least case manager role
  .use(isAuthenticated)
  .use(atLeastCaseManager);
export const hasAdmin = t.procedure // for routes that require admin role
  .use(isAuthenticated)
  .use(isAdmin);
