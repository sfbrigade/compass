import test from "ava";
import { getTestServer } from "backend/tests";

test("getMe", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: "admin",
  });

  const me = await trpc.getMe.query();
  t.is(me.user_id, seed.para.user_id);
});

test("getMe (throws if missing auth)", async (t) => {
  const { trpc } = await getTestServer(t);

  await t.throwsAsync(async () => {
    await trpc.getMe.query();
  });
});
