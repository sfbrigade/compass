import test from "ava";
import { getTestServer } from "@/backend/tests";

test("getPostgresInfo", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: "admin" });

  const postgresInfo = await trpc.admin.getPostgresInfo.query();
  t.true(postgresInfo.includes("PostgreSQL"));
});

test("getPostgresInfo (throws if not admin)", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: "para" });

  await t.throwsAsync(async () => {
    await trpc.admin.getPostgresInfo.query();
  });
});
