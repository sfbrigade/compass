import { z } from "zod";
import { hasCaseManager, hasPara, router } from "../trpc";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { deleteFile } from "../lib/files";
import { substituteTransactionOnContext } from "../lib/utils/context";
import { TRPCError } from "@trpc/server";

// TODO: define .output() schemas for all procedures
export const iep = router({
  addGoal: hasCaseManager
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

  editGoal: hasCaseManager
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

  addBenchmark: hasCaseManager
    .input(
      z.object({
        // current_level not included, should be calculated as trial data is collected
        goal_id: z.string(),
        status: z.string(),
        description: z.string(),
        setup: z.string(),
        instructions: z.string(),
        materials: z.string(),
        frequency: z.string(),
        target_level: z.number().min(0).max(100),
        baseline_level: z.number().min(0).max(100),
        metric_name: z.string(),
        attempts_per_trial: z.number().nullable(),
        number_of_trials: z.number().nullable(),
        due_date: z.date().nullable().optional(),
        trial_count: z.number().nullable().optional(),
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
        frequency,
        target_level,
        baseline_level,
        metric_name,
        attempts_per_trial,
        number_of_trials,
        due_date,
        trial_count,
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
          frequency,
          target_level,
          baseline_level,
          metric_name,
          attempts_per_trial,
          number_of_trials,
          due_date,
          trial_count,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),

  updateBenchmark: hasPara
    .input(
      z.object({
        benchmark_id: z.string(),
        goal_id: z.string().optional(),
        status: z.string().optional(),
        description: z.string().optional(),
        setup: z.string().optional(),
        instructions: z.string().optional(),
        materials: z.string().optional(),
        frequency: z.string().optional(),
        target_level: z.number().min(0).max(100).optional(),
        baseline_level: z.number().min(0).max(100).optional(),
        metric_name: z.string().optional(),
        attempts_per_trial: z.number().nullable().optional(),
        number_of_trials: z.number().nullable().optional(),
        due_date: z.date().optional(),
        trial_count: z.number().optional(),
      })
    )
    .mutation(async (req) => {
      const {
        benchmark_id,
        goal_id,
        status,
        description,
        setup,
        instructions,
        materials,
        frequency,
        target_level,
        baseline_level,
        metric_name,
        attempts_per_trial,
        number_of_trials,
        due_date,
        trial_count,
      } = req.input;

      await req.ctx.db
        .updateTable("benchmark")
        .set({
          goal_id,
          status,
          description,
          setup,
          instructions,
          materials,
          frequency,
          target_level,
          baseline_level,
          metric_name,
          attempts_per_trial,
          number_of_trials,
          due_date,
          trial_count,
        })
        .where("benchmark.benchmark_id", "=", benchmark_id)
        .execute();
    }),

  addTask: hasCaseManager
    .input(
      z.object({
        benchmark_id: z.string(),
        assignee_id: z.string(),
      })
    )
    .mutation(async (req) => {
      const { benchmark_id, assignee_id } = req.input;

      const existingTask = await req.ctx.db
        .selectFrom("task")
        .where("benchmark_id", "=", benchmark_id)
        .where("assignee_id", "=", assignee_id)
        .selectAll()
        .executeTakeFirst();

      if (existingTask) {
        throw new Error(
          "Task already exists: This benchmark has already been assigned to the same para"
        );
      }

      const result = await req.ctx.db
        .insertInto("task")
        .values({
          benchmark_id,
          assignee_id,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),
  assignTaskToParas: hasCaseManager
    .input(
      z.object({
        benchmark_id: z.string().uuid(),
        para_ids: z.string().uuid().array(),
      })
    )
    .mutation(async (req) => {
      const { benchmark_id, para_ids } = req.input;

      // fetch all existing task records for this benchmark
      const existingTasks = await req.ctx.db
        .selectFrom("task")
        .where("benchmark_id", "=", benchmark_id)
        .selectAll()
        .execute();

      // collect list of task records to delete (if assignee_id not in para_ids)
      const deleteTaskIds = existingTasks
        .filter(
          (task) => task.assignee_id && !para_ids.includes(task.assignee_id)
        )
        .map((task) => task.task_id);

      // collect a list of new assignee_ids to insert
      const newAssigneeIds = para_ids.filter(
        (para_id) => !existingTasks.find((task) => task.assignee_id === para_id)
      );

      let result:
        | {
            benchmark_id: string | null;
            assignee_id: string | null;
            created_at: Date;
            seen: boolean;
            task_id: string;
          }
        | undefined;
      await req.ctx.db.transaction().execute(async (trx) => {
        // delete tasks whose assignees that are not in para_ids
        if (deleteTaskIds.length > 0) {
          await trx
            .deleteFrom("task")
            .where("task_id", "in", deleteTaskIds)
            .execute();
        }
        // insert new tasks for new assignees
        if (newAssigneeIds.length > 0) {
          result = await req.ctx.db
            .insertInto("task")
            .values(
              newAssigneeIds.map((para_id) => ({
                benchmark_id,
                assignee_id: para_id,
              }))
            )
            .returningAll()
            .executeTakeFirst();
        }
      });
      return result;
    }),

  addTrialData: hasPara
    .input(
      z.object({
        benchmark_id: z.string(),
        success: z.number(),
        unsuccess: z.number(),
        notes: z.string(),
      })
    )
    .mutation(async (req) => {
      const { userId } = req.ctx.auth;

      const { benchmark_id, success, unsuccess, notes } = req.input;

      const result = await req.ctx.db
        .insertInto("trial_data")
        .values({
          benchmark_id,
          created_by_user_id: userId,
          success,
          unsuccess,
          notes,
        })
        .returningAll()
        .executeTakeFirst();

      return result;
    }),

  updateTrialData: hasPara
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

  getGoals: hasCaseManager
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

  getGoal: hasCaseManager
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

  getBenchmarks: hasCaseManager
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
        .select((eb) => [
          "benchmark.benchmark_id",
          "benchmark.status",
          "benchmark.description",
          "benchmark.instructions",
          "benchmark.materials",
          "benchmark.metric_name",
          "benchmark.setup",
          "benchmark.frequency",
          "benchmark.number_of_trials",
          "benchmark.attempts_per_trial",
          "benchmark.trial_count",
          "benchmark.baseline_level",
          "benchmark.current_level",
          "benchmark.target_level",
          "benchmark.created_at",
          "benchmark.due_date",
          "benchmark.goal_id",
          jsonArrayFrom(
            eb
              .selectFrom("user")
              .innerJoin("task", "task.assignee_id", "user.user_id")
              .whereRef("task.benchmark_id", "=", "benchmark.benchmark_id")
              .orderBy("user.first_name")
              .selectAll()
          ).as("assignees"),
        ])
        .execute();

      return result;
    }),

  getBenchmark: hasCaseManager
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
        .select((eb) => [
          "benchmark.benchmark_id",
          "benchmark.status",
          "benchmark.description",
          "benchmark.instructions",
          "benchmark.materials",
          "benchmark.metric_name",
          "benchmark.setup",
          "benchmark.frequency",
          "benchmark.number_of_trials",
          "benchmark.attempts_per_trial",
          "benchmark.trial_count",
          "benchmark.baseline_level",
          "benchmark.current_level",
          "benchmark.target_level",
          "benchmark.created_at",
          "benchmark.due_date",
          "benchmark.goal_id",
          jsonArrayFrom(
            eb
              .selectFrom("user")
              .innerJoin("task", "task.assignee_id", "user.user_id")
              .whereRef("task.benchmark_id", "=", "benchmark.benchmark_id")
              .orderBy("user.first_name")
              .selectAll()
          ).as("assignees"),
        ])
        .executeTakeFirstOrThrow();

      return result;
    }),

  getBenchmarkByAssignee: hasCaseManager
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

  // Not just hasPara, but check to make sure that the userId has a task with the benchmark_id
  getBenchmarkAndTrialData: hasPara
    .input(
      z.object({
        benchmark_id: z.string(),
      })
    )
    .query(async (req) => {
      const { benchmark_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("benchmark")
        .innerJoin("goal", "benchmark.goal_id", "goal.goal_id")
        .innerJoin("iep", "goal.iep_id", "iep.iep_id")
        .innerJoin("student", "iep.student_id", "student.student_id")
        .where("benchmark.benchmark_id", "=", benchmark_id)
        .select((eb) => [
          "benchmark.benchmark_id",
          "student.first_name",
          "student.last_name",
          "goal.category",
          "benchmark.description",
          "benchmark.instructions",
          "benchmark.frequency",
          "benchmark.number_of_trials",
          "benchmark.benchmark_id",
          "benchmark.due_date",
          "benchmark.trial_count",
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
              .whereRef(
                "trial_data.benchmark_id",
                "=",
                "benchmark.benchmark_id"
              )
              .orderBy("trial_data.created_at")
          ).as("trials"),
        ])
        .executeTakeFirstOrThrow();

      return result;
    }),

  markAsSeen: hasPara
    .input(
      z.object({
        benchmark_id: z.string(),
      })
    )
    .mutation(async (req) => {
      const { benchmark_id } = req.input;
      const { userId } = req.ctx.auth;

      const task = await req.ctx.db
        .selectFrom("task")
        .where("benchmark_id", "=", benchmark_id)
        .where("assignee_id", "=", userId)
        .selectAll()
        .executeTakeFirst();

      if (task?.seen) {
        await req.ctx.db
          .updateTable("task")
          .set({
            seen: true,
          })
          .where((eb) =>
            eb.and([
              eb("benchmark_id", "=", benchmark_id),
              eb("assignee_id", "=", userId),
            ])
          )
          .execute();
      }
    }),

  attachFileToTrialData: hasCaseManager
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

  removeFileFromTrialDataAndDelete: hasCaseManager
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
