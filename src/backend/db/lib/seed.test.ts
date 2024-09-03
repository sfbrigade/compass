import test from "ava";
import { getTestDatabase } from "@/backend/tests/fixtures/get-test-database";
import { getDb } from "@/backend/db/lib/get-db";
import { seedfile } from "@/backend/db/lib/seed"; // Note the lowercase 'f' in seedfile

test("seedFile works after schema changes", async (t) => {
  const { connectionString } = await getTestDatabase(); // note that this also seeds the database from tests/seed.ts
  const { db } = getDb(connectionString);

  try {
    await seedfile(connectionString); // this runs our seed production seed file

    const students = await db.selectFrom("student").selectAll().execute();
    t.true(students.length > 0, "There should be at least one student");

    const users = await db.selectFrom("user").selectAll().execute();
    t.true(users.length > 0, "There should be at least one user");
  } finally {
    await db.destroy();
  }
});
