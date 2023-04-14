import { router } from "../trpc";
import { paraProcedures } from "./paras";
import { studentProcedures } from "./students";

export const trpcRouter = router({
  ...studentProcedures,
  ...paraProcedures,
});

export type AppRouter = typeof trpcRouter;
