import { z } from "zod";
import { authenticatedProcedure, router } from "../trpc";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { deleteFile } from "../lib/files";
import { substituteTransactionOnContext } from "../lib/utils/context";
import { TRPCError } from "@trpc/server";

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

  editGoal: authenticatedProcedure
    .input(
      z.object({
        goal_id: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (req) => {
      const { goal_id, description } = req.input;
      const { userId } = req.ctx.auth;

      // make sure that this goal belongs to this case manager
      const authCheck = await req.ctx.db
        .selectFrom("goal")
        .fullJoin("iep", "iep.iep_id", "goal.goal_id")
        .fullJoin("student", "student.student_id", "iep.student_id")
        .where("student.assigned_case_manager_id", "=", userId)
        .selectAll()
        .executeTakeFirst();

      if (!authCheck) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Could not find a matching goal for a student of yours",
        });
      }

      const result = await req.ctx.db
        .updateTable("goal")
        .set({
          description: description,
        })
        .where("goal_id", "=", goal_id)
        .returningAll()
        .executeTakeFirst();

      return result;
    }),

  addBenchmark: authenticatedProcedure
    .input(
      z.object({
        // current_level not included, should be calculated as trial data is collected
        goal_id: z.string(),
        status: z.string(),
        description: z.string(),
        setup: z.string(),
        instructions: z.string(),
        materials: z.string(),
        target_level: z.number().min(0).max(100),
        baseline_level: z.number().min(0).max(100),
        metric_name: z.string(),
        attempts_per_trial: z.number().nullable(),
        number_of_trials: z.number().nullable(),
      })
    )
    .mutation(async (req) => {
      const {
        goal_id,
        status,
        description,
        setup,
        instructions,
        materials,
        target_level,
        baseline_level,
        metric_name,
        attempts_per_trial,
        number_of_trials,
      } = req.input;

      const result = await req.ctx.db
        .insertInto("benchmark")
        .values({
          goal_id,
          status,
          description,
          setup,
          instructions,
          materials,
          target_level,
          baseline_level,
          metric_name,
          attempts_per_trial,
          number_of_trials,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),

  addTask: authenticatedProcedure
    .input(
      z.object({
        benchmark_id: z.string(),
        assignee_id: z.string(),
        due_date: z.date(),
        trial_count: z.number(),
      })
    )
    .mutation(async (req) => {
      const { benchmark_id, assignee_id, due_date, trial_count } = req.input;

      const result = await req.ctx.db
        .insertInto("task")
        .values({
          benchmark_id,
          assignee_id,
          due_date,
          trial_count,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),
  assignTaskToParas: authenticatedProcedure
    .input(
      z.object({
        benchmark_id: z.string().uuid(),
        para_ids: z.string().uuid().array(),
        due_date: z.date().optional(),
        trial_count: z.number().optional(),
      })
    )
    .mutation(async (req) => {
      const { benchmark_id, para_ids, due_date, trial_count } = req.input;

      const result = await req.ctx.db
        .insertInto("task")
        .values(
          para_ids.map((para_id) => ({
            benchmark_id,
            assignee_id: para_id,
            due_date,
            trial_count,
          }))
        )
        .returningAll()
        .executeTakeFirst();
      return result;
    }),
  //Temporary function to easily assign tasks to self for testing
  tempAddTaskToSelf: authenticatedProcedure
    .input(
      z.object({
        benchmark_id: z.string(),
        due_date: z.date(),
        trial_count: z.number(),
      })
    )
    .mutation(async (req) => {
      const { benchmark_id, due_date, trial_count } = req.input;
      const { userId } = req.ctx.auth;

      const shouldAdd = await req.ctx.db
        .selectFrom("task")
        .selectAll()
        .where((eb) =>
          eb.and([
            eb("benchmark_id", "=", benchmark_id),
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
          benchmark_id,
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
      const { goal_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("goal")
        .where("goal_id", "=", goal_id)
        .selectAll()
        .executeTakeFirstOrThrow();

      return result;
    }),

  getBenchmarks: authenticatedProcedure
    .input(
      z.object({
        goal_id: z.string(),
      })
    )
    .query(async (req) => {
      const { goal_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("benchmark")
        .where("goal_id", "=", goal_id)
        .selectAll()
        .execute();

      return result;
    }),

  getBenchmark: authenticatedProcedure
    .input(
      z.object({
        benchmark_id: z.string(),
      })
    )
    .query(async (req) => {
      const { benchmark_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("benchmark")
        .where("benchmark.benchmark_id", "=", benchmark_id)
        .selectAll()
        .execute();
      return result;
    }),

  getBenchmarksByAssignee: authenticatedProcedure
    .input(
      z.object({
        assignee_id: z.string(),
      })
    )
    .query(async (req) => {
      const { assignee_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("benchmark")
        .innerJoin("task", "benchmark.benchmark_id", "task.benchmark_id")
        .where("task.assignee_id", "=", assignee_id)
        .selectAll()
        .execute();

      return result;
    }),

  getBenchmarkAndTrialData: authenticatedProcedure
    .input(
      z.object({
        task_id: z.string(),
      })
    )
    .query(async (req) => {
      const { task_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("benchmark")
        .innerJoin("task", "benchmark.benchmark_id", "task.benchmark_id")
        .innerJoin("goal", "benchmark.goal_id", "goal.goal_id")
        .innerJoin("iep", "goal.iep_id", "iep.iep_id")
        .innerJoin("student", "iep.student_id", "student.student_id")
        .where("task.task_id", "=", task_id)
        .select((eb) => [
          "task.task_id",
          "student.first_name",
          "student.last_name",
          "goal.category",
          "benchmark.description",
          "benchmark.instructions",
          "benchmark.number_of_trials",
          "benchmark.benchmark_id",
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
