import { publicProcedure, router } from "../trpc";

export const publicRouter = router({
  getFoo: publicProcedure.query(() => {
    return "bar";
  }),
});
