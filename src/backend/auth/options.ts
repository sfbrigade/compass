import GoogleProvider from "next-auth/providers/google";
import { createPersistedAuthAdapter } from "@/backend/auth/adapter";
import { KyselyDatabaseInstance } from "../lib";
import type { NextAuthOptions } from "next-auth";
import type { ExtendedAdapter } from "@/backend/auth/adapter";

export const getNextAuthOptions = (
  db: KyselyDatabaseInstance
): NextAuthOptions => {
  const adapter: ExtendedAdapter = createPersistedAuthAdapter(db);

  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    adapter,
    pages: {
      signIn: "/signInPage",
    },
    callbacks: {
      // hook into the sign in process so we can link accounts if needed
      async signIn({ user, account }) {
        if (account?.provider === "google") {
          const existingUser = await adapter.getUserByEmail(user.email!);

          if (existingUser) {
            // user exists, check if account is linked
            const linkedAccount = await db
              .selectFrom("account")
              .where("user_id", "=", existingUser.id)
              .where("provider_name", "=", account.provider)
              .where("provider_account_id", "=", account.providerAccountId)
              .selectAll()
              .executeTakeFirst();

            if (!linkedAccount) {
              // user was added by case manager or admin but hasn't logged in before so
              // we need to link the user's google account
              if (adapter.linkAccount) {
                await adapter.linkAccount({
                  ...account,
                  userId: existingUser.id,
                });
              }
            }
          }
        }
        return true;
      },
    },
  };
};
