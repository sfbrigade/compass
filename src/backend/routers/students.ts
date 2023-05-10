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
  //* this function gets students for the current logged in case manager
  getAllStudents: procedure
    .input(z.object({ assigned_case_manager_id: z.string().uuid() }))
    .query(async (req) => {
      const { assigned_case_manager_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("student")
        .selectAll()
        // .where("assigned_case_manager_id", "=", assigned_case_manager_id)
        .where(
          "assigned_case_manager_id",
          "=",
          "6e2b8fda-d24e-41d7-b8ec-8cb4258b103d"
        ) //this is for testing archive prop

        .execute();

      return result;
    }),

  createStudent: procedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        assigned_case_manager_id: z.string(),
      })
    )
    .mutation(async (req) => {
      const { first_name, last_name, email, assigned_case_manager_id } =
        req.input;

      const result = await req.ctx.db
        .insertInto("student")
        .values({ first_name, last_name, email, assigned_case_manager_id })
        .returningAll()
        .execute();

      return result;
    }),

  archiveStudent: procedure
    .input(
      z.object({
        student_id: z.string(),
      })
    )
    .mutation(async (req) => {
      const { student_id } = req.input;

      await req.ctx.db
        .updateTable("student")
        .set({ assigned_case_manager_id: null })
        .where("student_id", "=", student_id)
        .execute();
    }),

  //for future CM's to not have access to a former CM's IEP data, we need a property on the IEP's for the case manager ID and only retrieve database data that matches the current CM's ID.
};
