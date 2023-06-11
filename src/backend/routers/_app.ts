import { router } from "../trpc";
import { file } from "./file";
import { admin } from "./admin";
import { para } from "./para";
import { student } from "./student";
import { user } from "./user";

export const trpcRouter = router({
  file,
  admin,
  student,
  user,
  para,
});

export type AppRouter = typeof trpcRouter;
