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

  getAllParas: authenticatedProcedure.query(async (req) => {
    const result = await req.ctx.db.selectFrom("user").selectAll().execute();

    return result;
  }),

  createPara: authenticatedProcedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async (req) => {
      const { first_name, last_name, email } = req.input;

      const result = await req.ctx.db
        .insertInto("user")
        .values({
          first_name,
          last_name,
          email: email.toLowerCase(),
          role: "staff",
        })
        .returningAll()
        .executeTakeFirst();

      await getTransporter(req.ctx.env).sendMail({
        from: req.ctx.env.EMAIL,
        to: email,
        subject: "Para-professional email confirmation",
        text: "Email confirmation",
        html: "<h1>Email confirmation</h1><p>Please confirm your email by going to the following link: <a>no link yet</a></p>",
      });
      // to do here: when site is deployed, add url to html above
      // to do elsewhere: add "email_verified_at" timestamp when para first signs in with their email address (entered into db by cm)

      return result;
    }),

  /**
   * The function called in the frontend.
   * Checks if para exists and finds it. If it doesn't we create one using createPara(). Then we assign the para to CM.
   * Sends email only if createPara() is called. Not sure if this needs to be changed.
   */
  assignParaToCaseManager: authenticatedProcedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async (req) => {
      const { first_name, last_name, email } = req.input;
      const { userId } = req.ctx.auth;

      let paraObj = await req.ctx.db
        .selectFrom("user")
        .selectAll()
        .where("email", "=", email.toLowerCase())
        .executeTakeFirst();

      if (!paraObj) {
        const caller = para.createCaller(req.ctx);
        paraObj = await caller.createPara({ first_name, last_name, email });
      }

      if (paraObj) {
        await req.ctx.db
          .insertInto("paras_assigned_to_case_manager")
          .values({ case_manager_id: userId, para_id: paraObj.user_id })
          .execute();
      }
    }),

  //this is a placeholder for the archive-para action that will be covered in a future PR
});
