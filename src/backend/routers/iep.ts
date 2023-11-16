import { z } from "zod";
import { authenticatedProcedure, router } from "../trpc";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { deleteFile } from "../lib/files";
import { substituteTransactionOnContext } from "../lib/utils/context";

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
        instructions: z.string(),
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

  addTask: authenticatedProcedure
    .input(
      z.object({
        subgoal_id: z.string(),
        assignee_id: z.string(),
        due_date: z.date(),
        trial_count: z.number(),
      })
    )
    .mutation(async (req) => {
      const { subgoal_id, assignee_id, due_date, trial_count } = req.input;

      const result = await req.ctx.db
        .insertInto("task")
        .values({
          subgoal_id,
          assignee_id,
          due_date,
          trial_count,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),
  //Temporary function to easily assign tasks to self for testing
  tempAddTaskToSelf: authenticatedProcedure
    .input(
      z.object({
        subgoal_id: z.string(),
        due_date: z.date(),
        trial_count: z.number(),
      })
    )
    .mutation(async (req) => {
      const { subgoal_id, due_date, trial_count } = req.input;
      const { userId } = req.ctx.auth;

      const shouldAdd = await req.ctx.db
        .selectFrom("task")
        .selectAll()
        .where((eb) =>
          eb.and([
            eb("subgoal_id", "=", subgoal_id),
            eb("assignee_id", "=", userId),
          ])
        )
        .executeTakeFirst();

      // Prevent multiple assignments of the same task
      if (shouldAdd !== undefined) {
        return null;
      }

      const result = await req.ctx.db
        .insertInto("task")
        .values({
          subgoal_id,
          assignee_id: userId,
          due_date,
          trial_count,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),

  addTrialData: authenticatedProcedure
    .input(
      z.object({
        task_id: z.string(),
        success: z.number(),
        unsuccess: z.number(),
        notes: z.string(),
      })
    )
    .mutation(async (req) => {
      const { userId } = req.ctx.auth;

      const { task_id, success, unsuccess, notes } = req.input;

      const result = await req.ctx.db
        .insertInto("trial_data")
        .values({
          task_id,
          created_by_user_id: userId,
          success,
          unsuccess,
          notes,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),

  updateTrialData: authenticatedProcedure
    .input(
      z.object({
        trial_data_id: z.string(),
        success: z.number().optional(),
        unsuccess: z.number().optional(),
        submitted: z.boolean().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async (req) => {
      const { trial_data_id, success, unsuccess, submitted, notes } = req.input;

      await req.ctx.db
        .updateTable("trial_data")
        .set({
          success,
          unsuccess,
          submitted,
          notes,
        })
        .where("trial_data.trial_data_id", "=", trial_data_id)
        .execute();
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

  getGoal: authenticatedProcedure
    .input(
      z.object({
        goal_id: z.string(),
      })
    )
    .query(async (req) => {
      const result = await req.ctx.db
        .selectFrom("goal")
        .where("goal_id", "=", req.input.goal_id)
        .selectAll()
        .executeTakeFirst();

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

  getSubgoalAndTrialData: authenticatedProcedure
    .input(
      z.object({
        task_id: z.string(),
      })
    )
    .query(async (req) => {
      const { task_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("subgoal")
        .innerJoin("task", "subgoal.subgoal_id", "task.subgoal_id")
        .innerJoin("goal", "subgoal.goal_id", "goal.goal_id")
        .innerJoin("iep", "goal.iep_id", "iep.iep_id")
        .innerJoin("student", "iep.student_id", "student.student_id")
        .where("task.task_id", "=", task_id)
        .select((eb) => [
          "task.task_id",
          "student.first_name",
          "student.last_name",
          "goal.category",
          "subgoal.description",
          "subgoal.instructions",
          "subgoal.target_max_attempts",
          "subgoal.subgoal_id",
          "task.due_date",
          "task.seen",
          "task.trial_count",
          jsonArrayFrom(
            eb
              .selectFrom("trial_data")
              .select((eb) => [
                "trial_data.trial_data_id",
                "trial_data.success",
                "trial_data.unsuccess",
                "trial_data.submitted",
                "trial_data.notes",
                "trial_data.created_at",
                jsonArrayFrom(
                  eb
                    .selectFrom("trial_data_file")
                    .innerJoin(
                      "file",
                      "file.file_id",
                      "trial_data_file.file_id"
                    )
                    .selectAll("file")
                ).as("files"),
              ])
              .whereRef("trial_data.task_id", "=", "task.task_id")
              .whereRef(
                "trial_data.created_by_user_id",
                "=",
                "task.assignee_id"
              )
              .orderBy("trial_data.created_at")
          ).as("trials"),
        ])
        .executeTakeFirstOrThrow();

      return result;
    }),

  markAsSeen: authenticatedProcedure
    .input(
      z.object({
        task_id: z.string(),
      })
    )
    .mutation(async (req) => {
      const { task_id } = req.input;

      await req.ctx.db
        .updateTable("task")
        .set({
          seen: true,
        })
        .where("task.task_id", "=", task_id)
        .execute();
    }),

  attachFileToTrialData: authenticatedProcedure
    .input(
      z.object({
        trial_data_id: z.string(),
        file_id: z.string(),
      })
    )
    .mutation(async (req) => {
      const { trial_data_id, file_id } = req.input;

      await req.ctx.db
        .insertInto("trial_data_file")
        .values({
          trial_data_id,
          file_id,
        })
        .execute();
    }),

  removeFileFromTrialDataAndDelete: authenticatedProcedure
    .input(
      z.object({
        trial_data_id: z.string(),
        file_id: z.string(),
      })
    )
    .mutation(async (req) => {
      const { trial_data_id, file_id } = req.input;

      await req.ctx.db.transaction().execute(async (trx) => {
        await trx
          .deleteFrom("trial_data_file")
          .where("trial_data_id", "=", trial_data_id)
          .where("file_id", "=", file_id)
          .execute();

        await deleteFile(file_id, substituteTransactionOnContext(trx, req.ctx));
      });
    }),
});
