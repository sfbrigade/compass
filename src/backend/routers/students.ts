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
        .where("assigned_case_manager_id", "=", assigned_case_manager_id)
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

      const inDatabase = await req.ctx.db
        .selectFrom("student")
        .selectAll()
        .where("email", "=", email)
        .executeTakeFirst();

      // case 1: not in database, create new student in database
      if (!inDatabase) {
        await req.ctx.db
          .insertInto("student")
          .values({ first_name, last_name, email, assigned_case_manager_id })
          .execute();
        // case 2: in database, but no case manager associated
      } else if (inDatabase?.assigned_case_manager_id === null) {
        await req.ctx.db
          .updateTable("student")
          .set({ assigned_case_manager_id })
          .where("email", "=", email)
          .execute();
        // case 3: in database, different case manager
      } else if (
        inDatabase?.assigned_case_manager_id !== assigned_case_manager_id
        //! use the code below for testing the error message
        // typeof inDatabase?.assigned_case_manager_id === "string"
      ) {
        throw new Error("This student already has a case manager!");
        // Case 4: in database, adding same student email
      } else if (
        inDatabase?.assigned_case_manager_id === assigned_case_manager_id
      ) {
        throw new Error("You already added this student to your classroom.");
      } else {
        throw new Error("Error adding student. This is a database error.");
      }
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
