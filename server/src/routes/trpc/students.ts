import { z } from "zod";
import { t } from "./context";

// todo: define .output() schemas for all procedures

export const studentProcedures = {
  getStudentById: t.procedure
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

  getAllStudents: t.procedure.query(async (req) => {
    const result = await req.ctx.db.selectFrom("student").selectAll().execute();

    return result;
  }),

  createStudent: t.procedure
    .input(z.object({ first_name: z.string(), last_name: z.string() }))
    .mutation(async (req) => {
      const { first_name, last_name } = req.input;

      // todo: add a unique constraint to prevent duplicate students
      const result = await req.ctx.db
        .insertInto("student")
        .values({ first_name, last_name })
        .returningAll()
        .execute();

      return result;
    }),
};
