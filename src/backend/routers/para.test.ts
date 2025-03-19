import test from "ava";
import { getTestServer } from "@/backend/tests";
import { UserType } from "@/types/auth";

test("getParaById", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const { user_id } = await db
    .insertInto("user")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      role: UserType.Para,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const para = await trpc.para.getParaById.query({ user_id });
  t.is(para?.user_id, user_id);
});

test("getParaById - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.para.getParaById.query({
      user_id: "user_id",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});

test("getParaByEmail", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const { email } = await db
    .insertInto("user")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      role: UserType.Para,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const para = await trpc.para.getParaByEmail.query({ email });
  t.is(para?.email, email);
});

test("getParaByEmail - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.para.getParaByEmail.query({
      email: "foo@bar.com",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});

test("createPara", async (t) => {
  const { trpc, db, nodemailerMock } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
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

  // mail is sent asynchronously in promise, so wait a bit
  await new Promise((resolve) => {
    setTimeout(resolve, 150);
  });

  t.true(
    nodemailerMock.mock
      .getSentMail()
      .some((mail) => mail.subject?.includes("classroom"))
  );
});

test("createPara - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.para.createPara.mutate({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});

test("paras are deduped by email", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
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
    authenticateAs: UserType.CaseManager,
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
    authenticateAs: UserType.CaseManager,
  });

  const FIRST_NAME = "Foo";
  const LAST_NAME = "Bar";
  const STATUS = "In Progress";
  const DESCRIPTION = "Benchmark description";
  const SETUP = "Setup";
  const INSTRUCTIONS = "benchmark instructions foobar";
  const CATEGORY = "writing";
  const DUE_DATE = new Date();
  const ATTEMPTS_PER_TRIAL = 15;
  const NUMBER_OF_TRIALS = 5;
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

  const { benchmark_id } = await db
    .insertInto("benchmark")
    .values({
      goal_id: goal_id,
      status: STATUS,
      description: DESCRIPTION,
      setup: SETUP,
      instructions: INSTRUCTIONS,
      materials: "materials",
      frequency: "FREQUENCY",
      target_level: 100,
      baseline_level: 20,
      metric_name: "words",
      due_date: DUE_DATE,
      trial_count: TRIAL_COUNT,
      attempts_per_trial: ATTEMPTS_PER_TRIAL,
      number_of_trials: NUMBER_OF_TRIALS,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const { task_id } = await db
    .insertInto("task")
    .values({
      benchmark_id: benchmark_id,
      assignee_id: seed.case_manager.user_id,
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
  t.is(task[0].trial_count, TRIAL_COUNT);
});

test("getMyTasks - paras do have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  await t.notThrowsAsync(async () => {
    await trpc.para.getMyTasks.query();
  });
});

test("getMyTasks - regular users don't have access", async (t) => {
  const { trpc } = await getTestServer(t, {});

  const error = await t.throwsAsync(async () => {
    await trpc.para.getMyTasks.query();
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});
