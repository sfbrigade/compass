import { createPersistedAuthAdapter } from "@/backend/auth/adapter";
import { createContext } from "backend/context";
import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler: NextApiHandler = (req, res) => {
  const { db } = createContext({
    req,
    res,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    adapter: createPersistedAuthAdapter(db),
  })(req, res);
};

export default handler;
