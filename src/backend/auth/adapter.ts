import { Adapter, AdapterSession, AdapterUser } from "next-auth/adapters";
import {
  KyselyDatabaseInstance,
  KyselySchema,
  ZapatosTableNameToKyselySchema,
} from "../lib";
import { InsertObject, Selectable } from "kysely";

const mapStoredUserToAdapterUser = (
  user: Selectable<ZapatosTableNameToKyselySchema<"user">>
): AdapterUser => ({
  id: user.user_id,
  email: user.email,
  emailVerified: user.email_verified_at,
  name: `${user.first_name} ${user.last_name}`,
  image: user.image_url,
});

const mapStoredSessionToAdapterSession = (
  session: Selectable<ZapatosTableNameToKyselySchema<"session">>
): AdapterSession => ({
  sessionToken: session.session_token,
  userId: session.user_id,
  expires: session.expires_at,
});

export const createPersistedAuthAdapter = (
  db: KyselyDatabaseInstance
): Adapter => ({
  async createUser(user) {
    const [first_name, last_name] = user.name?.split(" ") ?? [
      user.email?.split("@")[0],
      "",
    ];
    const createdUser = await db
      .insertInto("user")
      .values({
        first_name,
        last_name,
        email: user.email,
        email_verified_at: user.emailVerified,
        role: "para",
        image_url: user.image,
      })
      .onConflict((b) => b.column("email").doNothing())
      .returningAll()
      .executeTakeFirstOrThrow();

    return mapStoredUserToAdapterUser(createdUser);
  },
  async getUser(id) {
    const user = await db
      .selectFrom("user")
      .where("user_id", "=", id)
      .selectAll()
      .executeTakeFirstOrThrow();
    return mapStoredUserToAdapterUser(user);
  },
  async getUserByEmail(email) {
    const user = await db
      .selectFrom("user")
      .where("email", "=", email)
      .selectAll()
      .executeTakeFirst();
    return user ? mapStoredUserToAdapterUser(user) : null;
  },
  async getUserByAccount({ providerAccountId, provider }) {
    const user = await db
      .selectFrom("user")
      .innerJoin("account", "account.user_id", "user.user_id")
      .where("account.provider_account_id", "=", providerAccountId)
      .where("account.provider_name", "=", provider)
      .selectAll("user")
      .executeTakeFirst();
    return user ? mapStoredUserToAdapterUser(user) : null;
  },
  async updateUser(user) {
    const [first_name, last_name] = user.name?.split(" ") ?? [
      user.email?.split("@")[0],
      "",
    ];

    let updatedUser: Selectable<ZapatosTableNameToKyselySchema<"user">>;
    if (user.id) {
      updatedUser = await db
        .updateTable("user")
        .set({
          email: user.email,
          email_verified_at: user.emailVerified,
          first_name,
          last_name,
          image_url: user.image,
        })
        .where("user_id", "=", user.id)
        .returningAll()
        .executeTakeFirstOrThrow();
    } else if (user.email) {
      updatedUser = await db
        .updateTable("user")
        .set({
          email_verified_at: user.emailVerified,
          first_name,
          last_name,
          image_url: user.image,
        })
        .where("email", "=", user.email)
        .returningAll()
        .executeTakeFirstOrThrow();
    } else {
      throw new Error("User must have an id or email");
    }

    return mapStoredUserToAdapterUser(updatedUser);
  },
  async deleteUser(userId) {
    await db.deleteFrom("user").where("user_id", "=", userId).execute();
  },
  async linkAccount(account) {
    const data: InsertObject<KyselySchema, "account"> = {
      user_id: account.userId,
      provider_name: account.provider,
      provider_account_id: account.providerAccountId,
      access_token: account.access_token,
      refresh_token: account.refresh_token,
      expires_at: account.expires_at,
      token_type: account.token_type,
      scope: account.scope,
      id_token: account.id_token,
      session_state: account.session_state,
    };

    await db
      .insertInto("account")
      .values(data)
      .onConflict((b) =>
        b.columns(["provider_name", "provider_account_id"]).doUpdateSet(data)
      )
      .execute();
  },
  async unlinkAccount({ providerAccountId, provider }) {
    await db
      .deleteFrom("account")
      .where("provider_account_id", "=", providerAccountId)
      .where("provider_name", "=", provider)
      .execute();
  },
  async createSession({ sessionToken, userId, expires }) {
    const session = await db
      .insertInto("session")
      .values({
        session_token: sessionToken,
        user_id: userId,
        expires_at: expires,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return mapStoredSessionToAdapterSession(session);
  },
  async getSessionAndUser(sessionToken) {
    const sessionAndUser = await db
      .selectFrom("session")
      .innerJoin("user", "user.user_id", "session.user_id")
      .where("session_token", "=", sessionToken)
      .selectAll()
      .executeTakeFirstOrThrow();

    if (sessionAndUser) {
      return {
        session: mapStoredSessionToAdapterSession(sessionAndUser),
        user: mapStoredUserToAdapterUser(sessionAndUser),
      };
    }

    return null;
  },
  async updateSession(session) {
    const updatedSession = await db
      .updateTable("session")
      .set({
        expires_at: session.expires,
      })
      .where("session_token", "=", session.sessionToken)
      .returningAll()
      .executeTakeFirstOrThrow();

    return mapStoredSessionToAdapterSession(updatedSession);
  },
  async deleteSession(sessionToken) {
    await db
      .deleteFrom("session")
      .where("session_token", "=", sessionToken)
      .execute();
  },
});
