import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getDb } from "~/db/lib/get-db";

export const createContext = (options: CreateExpressContextOptions) => {
  return {
    ...getDb(options.req.env.DATABASE_URL),
  };
};

export const t = initTRPC.context<typeof createContext>().create();
