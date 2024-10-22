import test from "ava";
import { getTestServer } from "@/backend/tests";

// TODO: Write more tests
test("basic flow - add/get goals, benchmarks, tasks", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
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
    target_level: 85,
    baseline_level: 60,
    metric_name: "words",
    attempts_per_trial: 20,
    number_of_trials: 15,
  });

  const benchmark2 = await trpc.iep.addBenchmark.mutate({
    goal_id: goal1!.goal_id,
    status: "Complete",
    description: "benchmark 2",
    setup: "",
    instructions: "",
    materials: "materials",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
    attempts_per_trial: 10,
    number_of_trials: 30,
  });
  const benchmark2Id = benchmark2!.benchmark_id;

  await trpc.iep.addTask.mutate({
    benchmark_id: benchmark2Id,
    assignee_id: para_id,
    due_date: new Date("2023-12-31"),
    trial_count: 5,
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
  t.is(gotBenchmarks.length, 2);

  const gotBenchmark = await trpc.iep.getBenchmark.query({
    benchmark_id: benchmark2Id,
  });
  t.is(gotBenchmark[0].description, "benchmark 2");

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

test("add benchmark - check full schema", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
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
    authenticateAs: "case_manager",
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
