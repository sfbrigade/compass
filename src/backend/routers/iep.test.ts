import test from "ava";
import { getTestServer } from "@/backend/tests";
import { UserType } from "@/types/auth";

// TODO: Write more tests
test("basic flow - add/get goals, benchmarks, tasks", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const para_id = seed.para.user_id;

  const iep = await trpc.student.addIep.mutate({
    student_id: seed.student.student_id,
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
  });

  const goal1 = await trpc.iep.addGoal.mutate({
    iep_id: iep.iep_id,
    description: "goal 1",
    category: "writing",
  });

  await trpc.iep.addBenchmark.mutate({
    goal_id: goal1!.goal_id,
    status: "In Progress",
    description: "benchmark 1",
    setup: "Setup here",
    instructions: "instructions here",
    materials: "materials",
    frequency: "twice a week",
    target_level: 85,
    baseline_level: 60,
    metric_name: "words",
    attempts_per_trial: 20,
    number_of_trials: 15,
  });

  const benchmark1 = await trpc.iep.addBenchmark.mutate({
    goal_id: goal1!.goal_id,
    status: "Complete",
    description: "benchmark 1",
    setup: "",
    instructions: "",
    materials: "materials",
    frequency: "frequency",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
    attempts_per_trial: 10,
    number_of_trials: 30,
  });
  const benchmark1Id = benchmark1!.benchmark_id;

  const benchmark2 = await trpc.iep.addBenchmark.mutate({
    goal_id: goal1!.goal_id,
    status: "Complete",
    description: "benchmark 2",
    setup: "",
    instructions: "",
    materials: "materials",
    frequency: "once a week",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
    attempts_per_trial: 10,
    number_of_trials: 30,
    due_date: new Date("2023-12-31"),
    trial_count: 5,
  });
  const benchmark2Id = benchmark2!.benchmark_id;

  await trpc.iep.addTask.mutate({
    benchmark_id: benchmark1Id,
    assignee_id: para_id,
  });

  const assignTask = await trpc.iep.assignTaskToParas.mutate({
    benchmark_id: benchmark2Id,
    para_ids: [para_id],
  });
  t.is(assignTask?.benchmark_id, benchmark2Id);
  t.is(assignTask?.assignee_id, para_id);

  const gotGoals = await trpc.iep.getGoals.query({ iep_id: iep.iep_id });
  t.is(gotGoals.length, 1);

  const gotBenchmarks = await trpc.iep.getBenchmarks.query({
    goal_id: goal1!.goal_id,
  });
  t.is(gotBenchmarks.length, 3);

  const gotBenchmark = await trpc.iep.getBenchmark.query({
    benchmark_id: benchmark2Id,
  });
  t.is(gotBenchmark[0].description, "benchmark 2");
  t.deepEqual(gotBenchmark[0].due_date, new Date("2023-12-31"));
  t.is(gotBenchmark[0].trial_count, 5);

  // TODO: Don't query db directly and use an API method instead. Possibly create a getTasks method later
  t.truthy(
    await db
      .selectFrom("task")
      .where("benchmark_id", "=", benchmark2Id)
      .where("assignee_id", "=", para_id)
      .selectAll()
      .executeTakeFirstOrThrow()
  );
});

test("addTask - no duplicate benchmark_id + assigned_id combo", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const para_id = seed.para.user_id;

  const iep = await trpc.student.addIep.mutate({
    student_id: seed.student.student_id,
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
  });

  const goal1 = await trpc.iep.addGoal.mutate({
    iep_id: iep.iep_id,
    description: "goal 1",
    category: "writing",
  });

  const benchmark1 = await trpc.iep.addBenchmark.mutate({
    goal_id: goal1!.goal_id,
    status: "Complete",
    description: "benchmark 1",
    setup: "",
    instructions: "",
    materials: "materials",
    frequency: "frequency",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
    attempts_per_trial: 10,
    number_of_trials: 30,
  });
  const benchmark1Id = benchmark1!.benchmark_id;

  await trpc.iep.addTask.mutate({
    benchmark_id: benchmark1Id,
    assignee_id: para_id,
    due_date: new Date("2023-12-31"),
    trial_count: 5,
  });

  const error = await t.throwsAsync(async () => {
    await trpc.iep.addTask.mutate({
      benchmark_id: benchmark1Id,
      assignee_id: para_id,
      due_date: new Date("2024-03-31"),
      trial_count: 1,
    });
  });

  t.is(
    error?.message,
    "Task already exists: This benchmark has already been assigned to the same para"
  );
});

test("assignTaskToParas - no duplicate benchmark_id + para_id combo", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const para_1 = seed.para;

  const para_2 = await trpc.para.createPara.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
  });

  const iep = await trpc.student.addIep.mutate({
    student_id: seed.student.student_id,
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
  });

  const goal1 = await trpc.iep.addGoal.mutate({
    iep_id: iep.iep_id,
    description: "goal 1",
    category: "writing",
  });

  const benchmark1 = await trpc.iep.addBenchmark.mutate({
    goal_id: goal1!.goal_id,
    status: "Complete",
    description: "benchmark 1",
    setup: "",
    instructions: "",
    materials: "materials",
    frequency: "frequency",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
    attempts_per_trial: 10,
    number_of_trials: 30,
  });
  const benchmark1Id = benchmark1!.benchmark_id;

  await trpc.iep.assignTaskToParas.mutate({
    benchmark_id: benchmark1Id,
    para_ids: [para_1.user_id],
    due_date: new Date("2023-12-31"),
    trial_count: 5,
  });

  const error = await t.throwsAsync(async () => {
    await trpc.iep.assignTaskToParas.mutate({
      benchmark_id: benchmark1Id,
      para_ids: [para_1.user_id, para_2.user_id],
      due_date: new Date("2024-03-31"),
      trial_count: 1,
    });
  });

  t.is(
    error?.message,
    "Task already exists: This benchmark has already been assigned to one or more of these paras"
  );
});

test("add benchmark - check full schema", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const iep = await trpc.student.addIep.mutate({
    student_id: seed.student.student_id,
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
  });

  const goal1 = await trpc.iep.addGoal.mutate({
    iep_id: iep.iep_id,
    description: "goal 1",
    category: "writing",
  });

  const benchmark_data = {
    goal_id: goal1!.goal_id,
    status: "In Progress",
    description: "benchmark 1",
    setup: "Setup here",
    instructions: "instructions here",
    materials: "materials",
    frequency: "twice a day",
    target_level: 85,
    baseline_level: 60,
    metric_name: "words",
    attempts_per_trial: 20,
    number_of_trials: 15,
  };

  const created_benchmark = await trpc.iep.addBenchmark.mutate(benchmark_data);

  // create explicitly string-indexable versions of these objects
  const indexable_benchmark_data = benchmark_data as {
    [index: string]: string | number | Date | null;
  };
  const indexable_benchmark = created_benchmark as {
    [index: string]: string | number | Date | null;
  };

  for (const [key, val] of Object.entries(indexable_benchmark_data)) {
    t.is(val, indexable_benchmark[key]);
  }
  t.is(created_benchmark?.current_level, null);
  t.truthy(created_benchmark?.created_at);
});

test("edit goal", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  await trpc.case_manager.addStudent.mutate({
    first_name: seed.student.first_name,
    last_name: seed.student.last_name,
    email: seed.student.email,
    grade: seed.student.grade,
  });

  const iep = await trpc.student.addIep.mutate({
    student_id: seed.student.student_id,
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
  });

  const goal = await trpc.iep.addGoal.mutate({
    iep_id: iep.iep_id,
    description: "goal 1",
    category: "writing",
  });

  const modifiedGoal = await trpc.iep.editGoal.mutate({
    description: "modified goal 1",
    goal_id: goal!.goal_id,
  });

  t.is(modifiedGoal!.goal_id, goal!.goal_id);
  t.is(modifiedGoal?.description, "modified goal 1");
});
test("editGoal - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.iep.editGoal.mutate({
      goal_id: "goal_id",
      description: "description",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});

test("getGoal - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.iep.getGoal.query({
      goal_id: "goal_id",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});
