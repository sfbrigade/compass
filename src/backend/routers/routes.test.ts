import test from "ava";
import { trpcRouter } from "@/backend/routers/_app";
import { createContext } from "@/backend/context";
import type { NextApiRequest, NextApiResponse } from "next";
import { TRPCError } from "@trpc/server";

test("All API endpoints are auth guarded", async (t) => {
  // Create a more complete mock of req and res
  const mockReq = {
    headers: {},
    cookies: {},
  } as unknown as NextApiRequest;

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
  // Define an exclude list for certain router/procedures
  const excludeList = [
    "public.getFoo", // Example of a public procedure that doesn't require auth
    // Add more procedures to exclude as needed
  ];

  // Create a caller with this context
  const caller = trpcRouter.createCaller(ctx);

  // Get all procedure names
  const procedureNames = Object.keys(trpcRouter._def.procedures);

  for (const fullProcedureName of procedureNames) {
    if (excludeList.includes(fullProcedureName)) {
      continue;
    }
    const [routerName, procedureName] = fullProcedureName.split(".");

    try {
      await (
        caller[routerName as keyof typeof caller] as Record<
          string,
          (...args: unknown[]) => Promise<unknown>
        >
      )[procedureName]();
      t.fail(`${fullProcedureName} is not auth guarded`);
    } catch (error: unknown) {
      if (error instanceof TRPCError && error.code === "UNAUTHORIZED") {
        t.pass(`${fullProcedureName} is auth guarded`);
      } else {
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
