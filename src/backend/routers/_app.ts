import { router } from "../trpc";
import { admin } from "./admin";
import { file } from "./file";
import { iep } from "./iep";
import { para } from "./para";
import { student } from "./student";
import { user } from "./user";

export const trpcRouter = router({
  admin,
  file,
  iep,
  para,
  student,
  user,
});

export type AppRouter = typeof trpcRouter;
