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
      // todo: add a unique constraint to prevent duplicate paras (already taken care of in SCHEMA - email is TEXT UNIQUE NOT NULL)
      await transporter.sendMail({
        ...mailOptions,
        subject: "Para-professional email confirmation",
        text: "Test text",
        html: "<h1>Test Title</h1><p>Please confirm your email by going to the following link: <a></a></p>",
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
