import test from "ava";
import { getTestServer } from "@/backend/tests";
import { UserType } from "@/types/global";

test("getMe", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.Para,
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

test("isCaseManager (user is case_manager)", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  // Assign a para to the case manager
  await db
    .insertInto("paras_assigned_to_case_manager")
    .values({
      case_manager_id: seed.case_manager.user_id,
      para_id: seed.para.user_id,
    })
    .execute();

  const isCaseManager = await trpc.user.isCaseManager.query();
  t.true(isCaseManager);
});

test("isCaseManager (user is para)", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: UserType.Para,
  });

  // A user is not a case manager by default i.e. when paras_assigned_to_case_manager is empty
  const result = await db
    .selectFrom("paras_assigned_to_case_manager")
    .selectAll()
    .execute();
  t.assert(result.length === 0);
  let isCaseManager = await trpc.user.isCaseManager.query();
  t.false(isCaseManager);

  // Assign a para to the case manager
  await db
    .insertInto("paras_assigned_to_case_manager")
    .values({
      case_manager_id: seed.case_manager.user_id,
      para_id: seed.para.user_id,
    })
    .execute();

  isCaseManager = await trpc.user.isCaseManager.query();
  t.false(isCaseManager);
});
