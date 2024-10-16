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
      authorization: {
        params: {
          prompt: "login", // Prompt for Google sign-in ("Choose an account") every time on log in.
        },
      },
    }),
  ],
  adapter: createPersistedAuthAdapter(db),
  pages: {
    signIn: "/signInPage",
  },
});
