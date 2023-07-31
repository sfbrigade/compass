import { z } from "zod";
import { getTransporter } from "../lib/nodemailer";
import { authenticatedProcedure, router } from "../trpc";

export const para = router({
  getParaById: authenticatedProcedure
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

  getParaByEmail: authenticatedProcedure
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

  createPara: authenticatedProcedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async (req) => {
      const { first_name, last_name, email } = req.input;

      let paraData = await req.ctx.db
        .selectFrom("user")
        .where("email", "=", email.toLowerCase())
        .selectAll()
        .executeTakeFirst();

      if (!paraData) {
        paraData = await req.ctx.db
          .insertInto("user")
          .values({
            first_name,
            last_name,
            email: email.toLowerCase(),
            role: "staff",
          })
          .returningAll()
          .executeTakeFirst();

        // TODO: Logic for sending email to staff. Should email be sent everytime or only first time? Should staff be notified that they are added to a certain case manager's list?
        await getTransporter(req.ctx.env).sendMail({
          from: req.ctx.env.EMAIL,
          to: email,
          subject: "Para-professional email confirmation",
          text: "Email confirmation",
          html: "<h1>Email confirmation</h1><p>Please confirm your email by going to the following link: <a>no link yet</a></p>",
        });
        // TODO: when site is deployed, add url to html above
        // to do elsewhere: add "email_verified_at" timestamp when para first signs in with their email address (entered into db by cm)
      }

      return paraData;
    }),

  getMyTasks: authenticatedProcedure.query(async (req) => {
    const { userId } = req.ctx.auth;

    const result = await req.ctx.db
      .selectFrom("subgoal")
      .innerJoin("task", "subgoal.subgoal_id", "task.subgoal_id")
      .innerJoin("goal", "subgoal.goal_id", "goal.goal_id")
      .innerJoin("iep", "goal.iep_id", "iep.iep_id")
      .innerJoin("student", "iep.student_id", "student.student_id")
      .where("task.assignee_id", "=", userId)
      .select([
        "task.task_id",
        "student.first_name",
        "student.last_name",
        "subgoal.description",
        "goal.category",
        "task.due_date",
        "subgoal.instructions",
        "subgoal.target_max_attempts",
      ])
      .execute();
    return result;
  }),
});
