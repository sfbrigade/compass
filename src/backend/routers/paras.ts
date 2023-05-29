import { z } from "zod";
import { procedure } from "../trpc";
import { mailOptions, transporter } from "../../config/nodemailer";

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
      // In the SCHEMA, email has the "unique" constraint TEXT UNIQUE NOT NULL, which will prevent duplicate paras from being inputted

      // this is where Nodemailer will send an email to the email address of the para inputted by the cm
      await transporter.sendMail({
        ...mailOptions,
        to: email,
        subject: "Para-professional email confirmation",
        text: "Email confirmation",
        html: "<h1>Email confirmation</h1><p>Please confirm your email by going to the following link: <a>no link yet</a></p>",
      });

      const result = await req.ctx.db
        .insertInto("user")
        .values({ first_name, last_name, email, role })
        .returningAll()
        .execute();

      return result;
    }),

  //this is a placeholder for the archive-para action that will be covered in a future PR
};
