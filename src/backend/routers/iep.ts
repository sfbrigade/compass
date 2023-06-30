import { z } from "zod";
import { authenticatedProcedure, router } from "../trpc";

// TODO: define .output() schemas for all procedures
export const iep = router({
  addGoal: authenticatedProcedure
    .input(
      z.object({
        iep_id: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (req) => {
      const { iep_id, description } = req.input;

      const result = await req.ctx.db
        .insertInto("goal")
        .values({
          iep_id,
          description,
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
      })
    )
    .mutation(async (req) => {
      const { goal_id, description } = req.input;

      const result = await req.ctx.db
        .insertInto("subgoal")
        .values({
          goal_id,
          description,
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
});
