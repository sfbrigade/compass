import { KyselyDatabaseInstance } from "@/backend/lib";

export type SeedResult = Awaited<ReturnType<typeof seed>>;

export const seed = async (db: KyselyDatabaseInstance) => {
  const para = await db
    .insertInto("user")
    .values({
      first_name: "Emily",
      last_name: "Smith",
      email: "emily@example.com",
      role: "staff",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const admin = await db
    .insertInto("user")
    .values({
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      role: "admin",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  //! For tests, is it better to insert into database this para or have a seed of this para already in the db?
  const paraJohn = await db
    .insertInto("user")
    .values({
      first_name: "John",
      last_name: "Doe",
      email: "John@example.com",
      role: "staff",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return {
    para,
    admin,
    paraJohn,
  };
};
