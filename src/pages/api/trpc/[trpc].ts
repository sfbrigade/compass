import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "@/backend/context";
import { trpcRouter } from "@/backend/routers/_app";

export default trpcNext.createNextApiHandler({
  router: trpcRouter,
  createContext,
  // onError(opts) {
  //   const { error, type, path, input, ctx, req } = opts;
  //   console.error("Error:", error);
  //   if (error.code === "INTERNAL_SERVER_ERROR") {
  //     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
  //   }
  // },
});
