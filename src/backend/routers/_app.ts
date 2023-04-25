import { router } from "../trpc";
import { studentProcedures } from "./students";
import { userProcedures } from "./users";

export const trpcRouter = router({
  ...studentProcedures,
  ...userProcedures,
});

export type AppRouter = typeof trpcRouter;
