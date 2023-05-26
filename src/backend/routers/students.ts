import { z } from "zod";
import { protectedProcedure, procedure } from "../trpc";

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

  /**
   * Get all students assigned to the current user
   */
  getMyStudents: protectedProcedure.query(async (req) => {
    const { userId } = req.ctx.auth;

    const result = await req.ctx.db
      .selectFrom("student")
      .selectAll()
      .where("assigned_case_manager_id", "=", userId)
      .execute();

    return result;
  }),

  createStudentOrAssignManager: protectedProcedure
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

      await req.ctx.db
        .insertInto("student")
        .values({
          first_name,
          last_name,
          email,
          assigned_case_manager_id: userId,
        })
        .onConflict((oc) =>
          oc
            .column("email")
            .doUpdateSet({ assigned_case_manager_id: userId })
            .where("student.assigned_case_manager_id", "is", null)
        )
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  /**
   * Removes the case manager associated with this student
   */
  unassignStudent: procedure
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
