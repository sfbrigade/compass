import test from "ava";
import { getTestServer } from "@/backend/tests";

// TODO: Write more tests
test("basic flow - add/get goals, subgoals, tasks", async (t) => {
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

  await trpc.iep.addSubgoal.mutate({
    goal_id: goal1!.goal_id,
    status: "In Progress",
    description: "subgoal 1",
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

  const subgoal1 = await trpc.iep.addSubgoal.mutate({
    goal_id: goal1!.goal_id,
    status: "Complete",
    description: "subgoal 1",
    setup: "",
    instructions: "",
    materials: "materials",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
    attempts_per_trial: 10,
    number_of_trials: 30,
  });
  const subgoal1Id = subgoal1!.subgoal_id;

  const subgoal2 = await trpc.iep.addSubgoal.mutate({
    goal_id: goal1!.goal_id,
    status: "Complete",
    description: "subgoal 2",
    setup: "",
    instructions: "",
    materials: "materials",
    frequency: "once a week",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
    attempts_per_trial: 10,
    number_of_trials: 30,
  });
  const subgoal2Id = subgoal2!.subgoal_id;

  await trpc.iep.addTask.mutate({
    subgoal_id: subgoal1Id,
    assignee_id: para_id,
    due_date: new Date("2023-12-31"),
    trial_count: 5,
  });

  const assignTask = await trpc.iep.assignTaskToParas.mutate({
    subgoal_id: subgoal2Id,
    para_ids: [para_id],
  });
  t.is(assignTask?.subgoal_id, subgoal2Id);
  t.is(assignTask?.assignee_id, para_id);

  const gotGoals = await trpc.iep.getGoals.query({ iep_id: iep.iep_id });
  t.is(gotGoals.length, 1);

  const gotSubgoals = await trpc.iep.getSubgoals.query({
    goal_id: goal1!.goal_id,
  });
  t.is(gotSubgoals.length, 3);

  const gotSubgoal = await trpc.iep.getSubgoal.query({
    subgoal_id: subgoal2Id,
  });
  t.is(gotSubgoal[0].description, "subgoal 2");

  // TODO: Don't query db directly and use an API method instead. Possibly create a getTasks method later
  t.truthy(
    await db
      .selectFrom("task")
      .where("subgoal_id", "=", subgoal2Id)
      .where("assignee_id", "=", para_id)
      .selectAll()
      .executeTakeFirstOrThrow()
  );
});

test("addTask - no duplicate subgoal_id + assigned_id combo", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
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

  const subgoal1 = await trpc.iep.addSubgoal.mutate({
    goal_id: goal1!.goal_id,
    status: "Complete",
    description: "subgoal 1",
    setup: "",
    instructions: "",
    materials: "materials",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
    attempts_per_trial: 10,
    number_of_trials: 30,
  });
  const subgoal1Id = subgoal1!.subgoal_id;

  await trpc.iep.addTask.mutate({
    subgoal_id: subgoal1Id,
    assignee_id: para_id,
    due_date: new Date("2023-12-31"),
    trial_count: 5,
  });

  const error = await t.throwsAsync(async () => {
    await trpc.iep.addTask.mutate({
      subgoal_id: subgoal1Id,
      assignee_id: para_id,
      due_date: new Date("2024-03-31"),
      trial_count: 1,
    });
  });

  t.is(
    error?.message,
    "Task already exists: This subgoal has already been assigned to the same para"
  );
});

test("assignTaskToParas - no duplicate subgoal_id + para_id combo", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
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

  const subgoal1 = await trpc.iep.addSubgoal.mutate({
    goal_id: goal1!.goal_id,
    status: "Complete",
    description: "subgoal 1",
    setup: "",
    instructions: "",
    materials: "materials",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
    attempts_per_trial: 10,
    number_of_trials: 30,
  });
  const subgoal1Id = subgoal1!.subgoal_id;

  await trpc.iep.assignTaskToParas.mutate({
    subgoal_id: subgoal1Id,
    para_ids: [para_1.user_id],
    due_date: new Date("2023-12-31"),
    trial_count: 5,
  });

  const error = await t.throwsAsync(async () => {
    await trpc.iep.assignTaskToParas.mutate({
      subgoal_id: subgoal1Id,
      para_ids: [para_1.user_id, para_2.user_id],
      due_date: new Date("2024-03-31"),
      trial_count: 1,
    });
  });

  t.is(
    error?.message,
    "Task already exists: This subgoal has already been assigned to one or more of these paras"
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

  const subgoal_data = {
    goal_id: goal1!.goal_id,
    status: "In Progress",
    description: "subgoal 1",
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

  const created_subgoal = await trpc.iep.addSubgoal.mutate(subgoal_data);

  // create explicitly string-indexable versions of these objects
  const indexable_subgoal_data = subgoal_data as {
    [index: string]: string | number | Date | null;
  };
  const indexable_subgoal = created_subgoal as {
    [index: string]: string | number | Date | null;
  };

  for (const [key, val] of Object.entries(indexable_subgoal_data)) {
    t.is(val, indexable_subgoal[key]);
  }
  t.is(created_subgoal?.current_level, null);
  t.truthy(created_subgoal?.created_at);
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
