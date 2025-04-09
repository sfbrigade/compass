import test from "ava";
import { getTestServer } from "@/backend/tests";
import { UserType } from "@/types/auth";

test("getPostgresInfo", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Admin });

  const postgresInfo = await trpc.admin.getPostgresInfo.query();
  t.true(postgresInfo.includes("PostgreSQL"));
});

test("getPostgresInfo (throws if not admin)", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.admin.getPostgresInfo.query();
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message",
  );
});
