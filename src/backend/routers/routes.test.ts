import test from "ava";
import { trpcRouter } from "@/backend/routers/_app";
import { createContext } from "@/backend/context";
import type { NextApiRequest, NextApiResponse } from "next";
import { TRPCError } from "@trpc/server";

test("All API endpoints are auth guarded", async (t) => {
  /**
   * This test verifies that all API endpoints in the application are properly protected by authentication.
   *
   * It works by:
   * 1. Creating a mock request and response object.
   * 2. Generating a context with no authentication.
   * 3. Creating a trpc caller with this unauthenticated context.
   * 4. Iterating through all procedures in the trpcRouter.
   * 5. Attempting to call each procedure without authentication.
   * 6. Expecting an UNAUTHORIZED error for each call (except for explicitly excluded endpoints).
   *
   * This ensures that no sensitive endpoints are accidentally left unprotected,
   * maintaining the security of the API.
   */

  // create a mock request object for our calls. purpose of this is to have no auth
  const mockReq = {
    headers: {},
    cookies: {},
  } as unknown as NextApiRequest;

  // create a mock response object that will be passed to the context
  const mockRes = {
    getHeader: () => undefined,
    setCookie: () => void 0,
    setHeader: () => void 0,
  } as unknown as NextApiResponse;

  // Create a mock context with no authentication
  const ctx = await createContext({
    req: mockReq,
    res: mockRes,
  });

  // Define an exclude list for certain router/procedures. these routes are public
  // routes, so we don't want to test for auth on them.
  const excludeList = ["public.healthCheck"];

  // Create a caller with this context
  const caller = trpcRouter.createCaller(ctx);

  // Get all procedure names
  const procedureNames = Object.keys(trpcRouter._def.procedures);

  for (const fullProcedureName of procedureNames) {
    if (excludeList.includes(fullProcedureName)) {
      continue;
    }
    // pull apart the router name and procedure name
    const [routerName, procedureName] = fullProcedureName.split(".");
    try {
      // call the procedure without any arguments
      await (
        caller[routerName as keyof typeof caller] as Record<
          string,
          () => Promise<unknown>
        >
      )[procedureName]();
      // if we get here, the procedure was not auth guarded
      t.fail(`${fullProcedureName} is not auth guarded`);
    } catch (error: unknown) {
      // if we get here, the procedure was auth guarded, make sure we get UNAUTHORIZED
      if (error instanceof TRPCError && error.code === "UNAUTHORIZED") {
        t.pass(`${fullProcedureName} is auth guarded`);
      } else {
        // if we get here, the procedure was auth guarded, but we got an unexpected error
        // since the auth guard fires first, this should never happen
        console.error(`Unexpected error for ${fullProcedureName}:`, error);
        t.fail(
          `${fullProcedureName} threw an unexpected error: ${
            (error as Error).message
          }`
        );
      }
    }
  }
});
