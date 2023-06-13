import { z } from "zod";
import { protectedProcedure, procedure } from "../trpc";
import { transporter } from "../lib/nodemailer";

export const paraProcedures = {
  getParaById: procedure
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

  getMyParas: protectedProcedure.query(async (req) => {
    const { userId } = req.ctx.auth;

    const result = await req.ctx.db
      .selectFrom("user")
      .innerJoin(
        "paras_assigned_to_case_manager",
        "user.user_id",
        "paras_assigned_to_case_manager.para_id"
      )
      .where("paras_assigned_to_case_manager.case_manager_id", "=", userId)
      .selectAll()
      .execute();

    return result;
  }),

  createParaAndAssignCaseManager: protectedProcedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async (req) => {
      const { first_name, last_name, email } = req.input;

      const insertedPara = await req.ctx.db
        .insertInto("user")
        .values({
          first_name,
          last_name,
          email: email.toLowerCase(),
          role: "para",
        })
        .onConflict((oc) =>
          oc.column("email").doUpdateSet({ email: email.toLowerCase() })
        )
        .returningAll()
        .executeTakeFirstOrThrow();

      const { userId } = req.ctx.auth;

      const inRelationalTable = await req.ctx.db
        .selectFrom("user")
        .innerJoin(
          "paras_assigned_to_case_manager",
          "user.user_id",
          "paras_assigned_to_case_manager.para_id"
        )
        .where("paras_assigned_to_case_manager.case_manager_id", "=", userId) //can make this better with lookup on new primary key
        .where(
          "paras_assigned_to_case_manager.para_id",
          "=",
          insertedPara.user_id
        )
        .selectAll()
        .execute();

      if (inRelationalTable.length === 0) {
        await req.ctx.db
          .insertInto("paras_assigned_to_case_manager")
          .values({ case_manager_id: userId, para_id: insertedPara.user_id })
          .execute();
      }

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Para-professional email confirmation",
        text: "Email confirmation",
        html: "<h1>Email confirmation</h1><p>Please confirm your email by going to the following link: <a>no link yet</a></p>",
      });
      // to do here: when site is deployed, add url to html above
      // to do elsewhere: add "email_verified_at" timestamp when para first signs in with their email address (entered into db by cm)
    }),

  unassignPara: protectedProcedure
    .input(
      z.object({
        para_id: z.string(),
      })
    )
    .mutation(async (req) => {
      const { userId } = req.ctx.auth;
      const { para_id } = req.input;

      await req.ctx.db
        .deleteFrom("paras_assigned_to_case_manager")
        .where("case_manager_id", "=", userId)
        .where("para_id", "=", para_id)
        .execute();
    }),
};
