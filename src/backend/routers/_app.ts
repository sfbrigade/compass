import { router } from "../trpc";
import { adminProcedures } from "./admins";
import { paraProcedures } from "./paras";
import { studentProcedures } from "./students";
import { userProcedures } from "./users";

export const trpcRouter = router({
  ...adminProcedures,
  ...studentProcedures,
  ...userProcedures,
  ...paraProcedures,
});

export type AppRouter = typeof trpcRouter;
