import test from "ava";
import { getTestServer } from "@/backend/tests";

test("getParaById", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const { user_id } = await db
    .insertInto("user")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      role: "staff",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const para = await trpc.para.getParaById.query({ user_id });
  t.is(para?.user_id, user_id);
});

test("getParaByEmail", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const { email } = await db
    .insertInto("user")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      role: "staff",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const para = await trpc.para.getParaByEmail.query({ email });
  t.is(para?.email, email);
});

test("createPara", async (t) => {
  const { trpc, db, nodemailerMock } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  await trpc.para.createPara.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
  });

  t.truthy(
    await db
      .selectFrom("user")
      .where("first_name", "=", "Foo")
      .selectAll()
      .executeTakeFirst()
  );

  t.true(
    nodemailerMock.mock
      .getSentMail()
      .some((mail) => mail.subject?.includes("confirmation"))
  );
});

test("paras are deduped by email", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  t.falsy(await trpc.para.getParaByEmail.query({ email: "foo.bar@email.com" }));

  await trpc.para.createPara.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
  });

  await trpc.para.createPara.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
  });

  const para = await db
    .selectFrom("user")
    .where("email", "=", "foo.bar@email.com")
    .selectAll()
    .execute();

  t.is(para.length, 1);
});

test("createPara - invalid email", async (t) => {
  const { trpc } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  await t.throwsAsync(
    trpc.para.createPara.mutate({
      first_name: "Foo",
      last_name: "Bar",
      email: "invalid-email",
    })
  );
});

test("getMyTasks", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const FIRST_NAME = "Foo";
  const LAST_NAME = "Bar";
  const DESCRIPTION = "Subgoal description";
  const CATEGORY = "writing";
  const DUE_DATE = new Date();
  const INSTRUCTIONS = "subgoal instructions foobar";
  const TARGET_MAX_ATTEMPTS = 5;
  const TRIAL_COUNT = 10;

  const { student_id } = await db
    .insertInto("student")
    .values({
      first_name: FIRST_NAME,
      last_name: LAST_NAME,
      email: "jdoe@email.com",
      grade: 6,
      assigned_case_manager_id: seed.case_manager.user_id,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const { iep_id } = await db
    .insertInto("iep")
    .values({
      student_id: student_id,
      case_manager_id: seed.case_manager.user_id,
      start_date: new Date("2023-01-01"),
      end_date: new Date("2023-12-31"),
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const { goal_id } = await db
    .insertInto("goal")
    .values({
      iep_id: iep_id,
      description: "Goal Description",
      category: CATEGORY,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const { subgoal_id } = await db
    .insertInto("subgoal")
    .values({
      goal_id: goal_id,
      description: DESCRIPTION,
      instructions: INSTRUCTIONS,
      target_max_attempts: TARGET_MAX_ATTEMPTS,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const { task_id } = await db
    .insertInto("task")
    .values({
      subgoal_id: subgoal_id,
      assignee_id: seed.case_manager.user_id,
      due_date: DUE_DATE,
      trial_count: TRIAL_COUNT,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const task = await trpc.para.getMyTasks.query();
  t.is(task.length, 1);
  t.is(task[0].task_id, task_id);
  t.is(task[0].first_name, FIRST_NAME);
  t.is(task[0].last_name, LAST_NAME);
  t.is(task[0].description, DESCRIPTION);
  t.is(task[0].category, CATEGORY);
  t.deepEqual(task[0].due_date, DUE_DATE);
  t.is(task[0].instructions, INSTRUCTIONS);
  t.is(task[0].target_max_attempts, TARGET_MAX_ATTEMPTS);
  t.is(task[0].trial_count, TRIAL_COUNT);
});
