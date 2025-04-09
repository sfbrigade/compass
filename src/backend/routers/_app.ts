import { router } from "../trpc";
import { admin } from "./admin";
import { publicRouter } from "./public";
import { case_manager } from "./case_manager";
import { file } from "./file";
import { iep } from "./iep";
import { para } from "./para";
import { student } from "./student";
import { user } from "./user";

export const trpcRouter = router({
  admin,
  case_manager,
  public: publicRouter,
  file,
  iep,
  para,
  student,
  user,
});

export type AppRouter = typeof trpcRouter;
