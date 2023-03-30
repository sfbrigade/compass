import { router } from "../trpc";
import { studentProcedures } from "./students";

export const trpcRouter = router({
  ...studentProcedures,
});

export type AppRouter = typeof trpcRouter;
