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
        role: z.string(),
      })
    )
    .mutation(async (req) => {
      const { first_name, last_name, email, role } = req.input;

      const result = await req.ctx.db
        .insertInto("user")
        .values({ first_name, last_name, email, role })
        .returningAll()
        .execute();

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

  //this is a placeholder for the archive-para action that will be covered in a future PR
});
