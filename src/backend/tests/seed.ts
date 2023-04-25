import { KyselyDatabaseInstance } from "@/backend/lib";

export type SeedResult = Awaited<ReturnType<typeof seed>>;

export const seed = async (db: KyselyDatabaseInstance) => {
  const para = await db
    .insertInto("user")
    .values({
      first_name: "Emily",
      last_name: "Smith",
      email: "emily@example.com",
      role: "para",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return {
    para,
  };
};
