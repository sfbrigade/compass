import { router } from "../trpc";
import { paraProcedures } from "./paras";
import { studentProcedures } from "./students";
import { userProcedures } from "./users";

export const trpcRouter = router({
  ...studentProcedures,
  ...userProcedures,
  ...paraProcedures,
});

export type AppRouter = typeof trpcRouter;
