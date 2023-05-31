import { router } from "../trpc";
import { fileProcedures } from "./files";
import { adminProcedures } from "./admins";
import { paraProcedures } from "./paras";
import { studentProcedures } from "./students";
import { userProcedures } from "./users";

export const trpcRouter = router({
  ...fileProcedures,
  ...adminProcedures,
  ...studentProcedures,
  ...userProcedures,
  ...paraProcedures,
});

export type AppRouter = typeof trpcRouter;
