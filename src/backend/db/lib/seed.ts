import { logger } from "@/backend/lib";
import { getDb } from "@/backend/db/lib/get-db";

export const seedfile = async (databaseUrl: string) => {
  const { db } = getDb(databaseUrl);

  // variable created for Compass app visualization purposes
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

  const { user_id } = await db
    .insertInto("user")
    .values({
      first_name: "Helen",
      last_name: "Parr",
      email: "elastic@example.com",
      role: "staff",
    })
    .returning("user_id")
    .executeTakeFirstOrThrow();

  // need to assign staff member to case manager so that it appears in the Compass staff index
  await db
    .insertInto("paras_assigned_to_case_manager")
    .values({
      case_manager_id: firstuser.user_id,
      para_id: user_id,
    })
    .execute();

  logger.info("Database has been seeded with test data.");
};
