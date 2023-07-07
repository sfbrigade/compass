import test from "ava";
import { getTestServer } from "@/backend/tests";

test("getMe", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: "para",
  });

  const me = await trpc.user.getMe.query();
  t.is(me?.user_id, seed.para.user_id);
});

test("getMe (throws if missing auth)", async (t) => {
  const { trpc } = await getTestServer(t);

  await t.throwsAsync(async () => {
    await trpc.user.getMe.query();
  });
});
