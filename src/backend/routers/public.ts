import { noAuth, router } from "../trpc";

export const publicRouter = router({
  healthCheck: noAuth.query(() => {
    return "Ok";
  }),
});
