import { z } from "zod";
import { procedure } from "../trpc";

// todo: define .output() schemas for all procedures

export const studentProcedures = {
  getStudentById: procedure
    .input(z.object({ student_id: z.string().uuid() }))
    .query(async (req) => {
      const { student_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("student")
        .where("student_id", "=", student_id)
        .selectAll()
        .executeTakeFirst();

      return result;
    }),

  getAllStudents: procedure.query(async (req) => {
    const result = await req.ctx.db.selectFrom("student").selectAll().execute();

    return result;
  }),

  createStudent: procedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async (req) => {
      const { first_name, last_name, email } = req.input;

      // todo: add a unique constraint to prevent duplicate students
      const result = await req.ctx.db
        .insertInto("student")
        .values({ first_name, last_name, email })
        .returningAll()
        .execute();

      return result;
    }),
};
