import { z } from "zod";
import { hasCaseManager, hasPara, router } from "../trpc";
import { createPara } from "../lib/db_helpers/case_manager";
import { TaskData } from "@/types/global";

export const para = router({
  getParaById: hasCaseManager
    .input(z.object({ user_id: z.string().uuid() }))
    .query(async (req) => {
      const { user_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("user")
        .where("user_id", "=", user_id)
        .selectAll()
        .executeTakeFirst();

      return result;
    }),

  getParaByEmail: hasCaseManager
    .input(z.object({ email: z.string() }))
    .query(async (req) => {
      const { email } = req.input;

      const result = await req.ctx.db
        .selectFrom("user")
        .where("email", "=", email.toLowerCase())
        .selectAll()
        .executeTakeFirst();

      return result;
    }),

  /**
   * Deprecated: use case_manager.addStaff instead
   */
  createPara: hasCaseManager
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async (req) => {
      const { email } = req.input;

      const para = await createPara(
        req.input,
        req.ctx.db,
        req.ctx.auth.session.user?.name ?? "",
        req.ctx.env.EMAIL_FROM,
        email,
        req.ctx.env
      );
      return para;

      // TODO: Logic for sending email to staff. Should email be sent everytime or only first time? Should staff be notified that they are added to a certain case manager's list?
      // TODO: when site is deployed, add new url to html above
      // TODO elsewhere: add "email_verified_at" timestamp when para first signs in with their email address (entered into db by cm)
    }),

  getMyTasks: hasPara.query(async (req): Promise<TaskData[]> => {
    const { userId } = req.ctx.auth;

    const result = await req.ctx.db
      .selectFrom("benchmark")
      .innerJoin("task", "benchmark.benchmark_id", "task.benchmark_id")
      .innerJoin("goal", "benchmark.goal_id", "goal.goal_id")
      .innerJoin("iep", "goal.iep_id", "iep.iep_id")
      .innerJoin("student", "iep.student_id", "student.student_id")
      .where("task.assignee_id", "=", userId)
      .select((eb) => [
        "task.task_id",
        "student.first_name",
        "student.last_name",
        "goal.category",
        "benchmark.benchmark_id",
        "benchmark.description",
        "benchmark.instructions",
        "benchmark.attempts_per_trial",
        "benchmark.number_of_trials",
        "benchmark.due_date",
        "task.seen",
        "benchmark.trial_count",
        "task.created_at",
        eb
          .selectFrom("trial_data")
          .whereRef("trial_data.benchmark_id", "=", "benchmark.benchmark_id")
          .where("trial_data.submitted", "=", true)
          .select(({ fn }) =>
            fn.count("trial_data.trial_data_id").as("completed_trials")
          )
          .as("completed_trials"),
      ])
      .execute();
    return result;
  }),
});
