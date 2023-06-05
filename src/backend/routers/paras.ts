import { z } from "zod";
import { procedure } from "../trpc";
import { transporter } from "../lib/nodemailer";

export const paraProcedures = {
  getParaById: procedure
    .input(z.object({ user_id: z.string().uuid() }))
    .query(async (req) => {
      console.log("req", req);
      const { user_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("user")
        .where("user_id", "=", user_id)
        .selectAll()
        .executeTakeFirst();

      return result;
    }),

  getAllParas: procedure.query(async (req) => {
    const result = await req.ctx.db.selectFrom("user").selectAll().execute();

    return result;
  }),

  createPara: procedure
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

      await transporter.sendMail({
        from: process.env.EMAIL,
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
};
