import test from "ava";
import { getTestServer } from "@/backend/tests";
import { UserType } from "@/types/global";

test("getPostgresInfo", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Admin });

  const postgresInfo = await trpc.admin.getPostgresInfo.query();
  t.true(postgresInfo.includes("PostgreSQL"));
});

test("getPostgresInfo (throws if not admin)", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  await t.throwsAsync(async () => {
    await trpc.admin.getPostgresInfo.query();
  });
});
