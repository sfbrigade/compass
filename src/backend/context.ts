import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getDb } from "backend/db/lib/get-db";
import { S3Client } from "@aws-sdk/client-s3";
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
    };

type Context = ReturnType<typeof getDb> & {
  auth: Auth;
  s3: S3Client;
  env: Env;
};

export const createContext = async (
  options: CreateNextContextOptions
): Promise<Context> => {
  const env = (options.req.env as unknown as Env) ?? process.env;
  const { DATABASE_URL, S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } =
    env;
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
      .select("user_id")
      .where("email", "=", session.user.email)
      .executeTakeFirstOrThrow();
    auth = {
      type: "session",
      session,
      userId: user.user_id,
    };
  }

  return {
    ...getDb(DATABASE_URL),
    auth,
    s3: new S3Client({
      endpoint: S3_ENDPOINT,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
      },
      // todo: might need to disable in production
      forcePathStyle: true,
    }),
    env,
  };
};
