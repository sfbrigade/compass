import test from "ava";
import { getTestDatabase } from "@/backend/tests/fixtures/get-test-database";
import { getDb } from "@/backend/db/lib/get-db";
import { seedfile } from "@/backend/db/lib/seed";

test("seedfile works with current schema", async (t) => {
  // note that this also seeds the database from tests/seed.ts
  const { connectionString } = await getTestDatabase(t);
  const { db } = getDb(connectionString);

  try {
    await seedfile(connectionString); // this runs our production seed file

    const students = await db.selectFrom("student").selectAll().execute();
    t.true(students.length > 0, "There should be at least one student");

    const users = await db.selectFrom("user").selectAll().execute();
    t.true(users.length > 0, "There should be at least one user");
  } catch (error) {
    t.fail(
      `Seedfile execution failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  } finally {
    await db.destroy();
  }
});
