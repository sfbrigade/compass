import GoogleProvider from "next-auth/providers/google";
import { createPersistedAuthAdapter } from "@/backend/auth/adapter";
import { KyselyDatabaseInstance } from "../lib";

export const getNextAuthOptions = (db: KyselyDatabaseInstance) => ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: createPersistedAuthAdapter(db),
});
