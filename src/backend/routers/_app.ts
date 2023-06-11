import { router } from "../trpc";
import { file } from "./files";
import { admin } from "./admins";
import { para } from "./paras";
import { student } from "./students";
import { user } from "./users";

export const trpcRouter = router({
  file,
  admin,
  student,
  user,
  para,
});

export type AppRouter = typeof trpcRouter;
