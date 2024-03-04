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
    description: "subgoal 1",
    instructions: "instructions here",
    target_max_attempts: 5,
    materials: "materials",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
  });

  const subgoal2 = await trpc.iep.addSubgoal.mutate({
    goal_id: goal1!.goal_id,
    description: "subgoal 2",
    instructions: "",
    target_max_attempts: null,
    materials: "materials",
    target_level: 100,
    baseline_level: 20,
    metric_name: "words",
  });
  const subgoal2Id = subgoal2!.subgoal_id;

  await trpc.iep.addTask.mutate({
    subgoal_id: subgoal2Id,
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
  t.is(gotSubgoals.length, 2);

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
