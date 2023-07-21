import { z } from "zod";
import { authenticatedProcedure, router } from "../trpc";

// TODO: define .output() schemas for all procedures
export const iep = router({
  addGoal: authenticatedProcedure
    .input(
      z.object({
        iep_id: z.string(),
        description: z.string(),
        category: z.string(),
      })
    )
    .mutation(async (req) => {
      const { iep_id, description, category } = req.input;

      const result = await req.ctx.db
        .insertInto("goal")
        .values({
          iep_id,
          description,
          category,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),

  addSubgoal: authenticatedProcedure
    .input(
      z.object({
        goal_id: z.string(),
        description: z.string(),
        instructions: z.string().nullable(),
        target_max_attempts: z.number().nullable(),
      })
    )
    .mutation(async (req) => {
      const { goal_id, description, instructions, target_max_attempts } =
        req.input;

      const result = await req.ctx.db
        .insertInto("subgoal")
        .values({
          goal_id,
          description,
          instructions,
          target_max_attempts,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),

  getGoals: authenticatedProcedure
    .input(
      z.object({
        iep_id: z.string(),
      })
    )
    .query(async (req) => {
      const { iep_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("goal")
        .where("iep_id", "=", iep_id)
        .selectAll()
        .execute();

      return result;
    }),

  getSubgoals: authenticatedProcedure
    .input(
      z.object({
        goal_id: z.string(),
      })
    )
    .query(async (req) => {
      const { goal_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("subgoal")
        .where("goal_id", "=", goal_id)
        .selectAll()
        .execute();

      return result;
    }),

  addTask: authenticatedProcedure
    .input(
      z.object({
        subgoal_id: z.string(),
        assignee_id: z.string(),
        due_date: z.date(),
      })
    )
    .mutation(async (req) => {
      const { subgoal_id, assignee_id, due_date } = req.input;

      const result = await req.ctx.db
        .insertInto("task")
        .values({
          subgoal_id,
          assignee_id,
          due_date,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),

  getSubgoalsByAssignee: authenticatedProcedure
    .input(
      z.object({
        assignee_id: z.string(),
      })
    )
    .query(async (req) => {
      const { assignee_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("subgoal")
        .innerJoin("task", "subgoal.subgoal_id", "task.subgoal_id")
        .where("task.assignee_id", "=", assignee_id)
        .selectAll()
        .execute();

      return result;
    }),

  addTrialData: authenticatedProcedure
    .input(
      z.object({
        subgoal_id: z.string(),
        created_by_user_id: z.string(),
        success_with_prompt: z.number(),
        success_without_prompt: z.number(),
        notes: z.string(),
        image_list: z.array(z.string()),
      })
    )
    .mutation(async (req) => {
      const {
        subgoal_id,
        created_by_user_id,
        success_with_prompt,
        success_without_prompt,
        notes,
        image_list,
      } = req.input;

      const result = req.ctx.db
        .insertInto("trial_data")
        .values({
          subgoal_id,
          created_by_user_id,
          success_with_prompt,
          success_without_prompt,
          notes,
          image_list,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),

  getTrialData: authenticatedProcedure
    .input(
      z.object({
        subgoal_id: z.string(),
      })
    )
    .query(async (req) => {
      const { subgoal_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("trial_data")
        .where("subgoal_id", "=", subgoal_id)
        .selectAll()
        .execute();

      return result;
    }),
});
