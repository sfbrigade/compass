import GoogleProvider from "next-auth/providers/google";
import { createPersistedAuthAdapter } from "@/backend/auth/adapter";
import { KyselyDatabaseInstance } from "../lib";
import type { NextAuthOptions } from "next-auth";

export const getNextAuthOptions = (
  db: KyselyDatabaseInstance
): NextAuthOptions => ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: createPersistedAuthAdapter(db),
  pages: {
    signIn: "/signInPage",
  },
});
