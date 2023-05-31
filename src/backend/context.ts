import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getDb } from "backend/db/lib/get-db";
import { Session, getServerSession } from "next-auth";
import { Env } from "./lib/types";
import { getNextAuthOptions } from "./auth/options";

type Auth =
  | {
      type: "none";
    }
  | {
      type: "session";
      session: Session;
      userId: string;
      role: string;
    };

type Context = ReturnType<typeof getDb> & {
  auth: Auth;
};

export const createContext = async (
  options: CreateNextContextOptions
): Promise<Context> => {
  const { DATABASE_URL } = (options.req.env as unknown as Env) ?? process.env;
  const { db } = getDb(DATABASE_URL);

  let auth: Auth = { type: "none" };

  const session = await getServerSession(
    options.req,
    options.res,
    getNextAuthOptions(db)
  );
  if (session && session.user?.email) {
    const user = await db
      .selectFrom("user")
      .select(["user_id", "role"])
      .where("email", "=", session.user.email)
      .executeTakeFirstOrThrow();
    auth = {
      type: "session",
      session,
      userId: user.user_id,
      role: user.role,
    };
  }

  return {
    ...getDb(DATABASE_URL),
    auth,
  };
};
