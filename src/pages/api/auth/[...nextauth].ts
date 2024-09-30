import { getNextAuthOptions } from "@/backend/auth/options";
import { createContext } from "@/backend/context";
import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import type { Session, User } from "next-auth";

interface UserWithRole extends User {
  profile: {
    role: string;
  };
}

// Extend the Session type to include the role property
export interface ExtendedSession extends Session {
  user: Session["user"] & {
    role: string;
  };
}

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
