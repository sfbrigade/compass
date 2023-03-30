import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "api/context";
import { trpcRouter } from "api/routers/_app";

export default trpcNext.createNextApiHandler({
  router: trpcRouter,
  createContext,
});
