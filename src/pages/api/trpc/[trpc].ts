import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "backend/context";
import { trpcRouter } from "backend/routers/_app";

export default trpcNext.createNextApiHandler({
  router: trpcRouter,
  createContext,
});
