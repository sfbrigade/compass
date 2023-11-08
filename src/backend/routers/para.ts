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

      const caseManagerName = req.ctx.auth.session.user?.name ?? "";

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
          html: `<p>Dear ${first_name},</p><p>Welcome to the data collection team for SFUSD.EDU!</p><p>I am writing to invite you to join our data collection efforts for our students. We are using an online platform called <strong>Project Compass</strong> to track and monitor student progress, and your participation is crucial to the success of this initiative.</p><p>To access Project Compass and begin collecting data, please follow these steps:</p><ul><li>Go to the website: (<a href="https://staging.compassiep.com/">https://staging.compassiep.com/</a>)</li> <li>Login using your provided username and password</li><li>Once logged in, navigate to the dashboard where you would see the student goals page</li></ul><p>By clicking on the <strong>data collection</strong> button, you will be directed to the instructions outlining the necessary steps for data collection. Simply follow the provided instructions and enter the required data points accurately.</p><p>If you encounter any difficulties or have any questions, please feel free to reach out to me. I am here to assist you throughout the process and ensure a smooth data collection experience. Your dedication and contribution will make a meaningful impact on our students' educational journeys.</p><p>Thank you,</p><p>${caseManagerName}<br>Case Manager</p>`,
        });
        // TODO: when site is deployed, add new url to html above
        // TODO elsewhere: add "email_verified_at" timestamp when para first signs in with their email address (entered into db by cm)
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
      .select((eb) => [
        "task.task_id",
        "student.first_name",
        "student.last_name",
        "goal.category",
        "subgoal.description",
        "subgoal.instructions",
        "subgoal.target_max_attempts",
        "task.due_date",
        "task.seen",
        "task.trial_count",

        eb
          .selectFrom("trial_data")
          .whereRef("trial_data.task_id", "=", "task.task_id")
          .where("trial_data.created_by_user_id", "=", userId)
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
