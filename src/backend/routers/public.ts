import { publicProcedure, router } from "../trpc";

export const publicRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "Ok";
  }),
});
