import test from "ava";
import { getTestServer } from "@/backend/tests";

test("basic flow - add/get goals, subgoals, tasks", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
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
  await trpc.iep.addSubgoal.mutate({
    goal_id: goal1!.goal_id,
    description: "subgoal 1",
    instructions: "instructions here",
    target_max_attempts: 5,
  });
  const subgoal2 = await trpc.iep.addSubgoal.mutate({
    goal_id: goal1!.goal_id,
    description: "subgoal 2",
    instructions: null,
    target_max_attempts: null,
  });
  await trpc.iep.addTask.mutate({
    subgoal_id: subgoal2!.subgoal_id,
    assignee_id: seed.para.user_id,
    due_date: new Date("2023-12-31"),
  });

  const gotGoals = await trpc.iep.getGoals.query({ iep_id: iep.iep_id });
  t.is(gotGoals.length, 1);

  const gotSubgoals = await trpc.iep.getSubgoals.query({
    goal_id: goal1!.goal_id,
  });
  t.is(gotSubgoals.length, 2);

  t.truthy(
    await db
      .selectFrom("task")
      .where("subgoal_id", "=", subgoal2!.subgoal_id)
      .where("assignee_id", "=", seed.para.user_id)
      .selectAll()
      .executeTakeFirstOrThrow()
  );
});
