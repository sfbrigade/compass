import { router } from "../trpc";
import { admin } from "./admin";
import { case_manager } from "./case_manager";
import { file } from "./file";
import { iep } from "./iep";
import { para } from "./para";
import { student } from "./student";
import { user } from "./user";

export const trpcRouter = router({
  admin,
  case_manager,
  file,
  iep,
  para,
  student,
  user,
});

export type AppRouter = typeof trpcRouter;
