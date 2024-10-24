import { getNextAuthOptions } from "@/backend/auth/options";
import { createContext } from "@/backend/context";
import { NextApiHandler } from "next";
import NextAuth, { Session, User } from "next-auth";
import { ExtendedSession, UserWithRole } from "@/types/auth";

const handler: NextApiHandler = async (req, res) => {
  const { db } = await createContext({
    req,
    res,
  });

  const authOptions = getNextAuthOptions(db);

  // Modify only the session callback
  const modifiedAuthOptions = {
    ...authOptions,
    callbacks: {
      ...authOptions.callbacks,
      session({
        session,
        user,
      }: {
        session: Session;
        user: User;
      }): ExtendedSession {
        const extendedSession = session as ExtendedSession;
        if (extendedSession.user) {
          const userWithRole = user as UserWithRole;
          extendedSession.user.role = userWithRole.profile.role;
        }
        return extendedSession;
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return NextAuth(modifiedAuthOptions)(req, res);
};

export default handler;
