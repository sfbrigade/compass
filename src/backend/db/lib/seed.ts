import { logger } from "@/backend/lib";
import { getDb } from "@/backend/db/lib/get-db";

export const seedfile = async (databaseUrl: string) => {
  const { db, pool } = getDb(databaseUrl);

  const firstuser = await db
    .selectFrom("user")
    .select("user_id")
    .executeTakeFirstOrThrow();

  await db
    .insertInto("student")
    .values({
      first_name: "Edna",
      last_name: "Mode",
      email: "fashion@example.com",
      grade: 1,
      assigned_case_manager_id: firstuser.user_id,
    })
    .execute();

  await db
    .insertInto("student")
    .values({
      first_name: "Colette",
      last_name: "Tatou",
      email: "chef@example.com",
      grade: 2,
      assigned_case_manager_id: firstuser.user_id,
    })
    .execute();

  await db
    .insertInto("student")
    .values({
      first_name: "Carl",
      last_name: "Fredricksen",
      email: "zoo@example.com",
      grade: 5,
      assigned_case_manager_id: firstuser.user_id,
    })
    .execute();

  logger.info("🫧  database has been seeded with test data.");
};
