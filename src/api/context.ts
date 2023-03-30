import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getDb } from "api/db/lib/get-db";
import { Env } from "./lib/types";

export const createContext = (options: CreateNextContextOptions) => {
  const { DATABASE_URL } = options.req.env as unknown as Env ?? process.env;
  return {
    ...getDb(DATABASE_URL),
  };
};
