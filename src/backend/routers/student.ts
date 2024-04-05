import { z } from "zod";
import { authenticatedProcedure, router } from "../trpc";
import { parseISO } from "date-fns";

// TODO: define .output() schemas for all procedures
export const student = router({
  getStudentById: authenticatedProcedure
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

  getStudentByTaskId: authenticatedProcedure
    .input(z.object({ task_id: z.string().uuid() }))
    .query(async (req) => {
      const { task_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("task")
        .innerJoin("subgoal", "subgoal.subgoal_id", "task.subgoal_id")
        .innerJoin("goal", "goal.goal_id", "subgoal.goal_id")
        .innerJoin("iep", "iep.iep_id", "goal.iep_id")
        .innerJoin("student", "student.student_id", "iep.student_id")
        .where("task.task_id", "=", task_id)
        .select(["student.first_name", "student.last_name", "task.due_date"])
        .executeTakeFirstOrThrow();

      return result;
    }),

  /**
   * Adds a new IEP for the given student.
   */
  addIep: authenticatedProcedure
    .input(
      z.object({
        student_id: z.string(),
        start_date: z.date(),
        end_date: z.date(),
      })
    )
    .mutation(async (req) => {
      const { student_id, start_date, end_date } = req.input;
      const { userId } = req.ctx.auth;

      const result = await req.ctx.db
        .insertInto("iep")
        .values({
          student_id,
          case_manager_id: userId,
          start_date,
          end_date,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      return result;
    }),

  /**
   * Adds a new IEP for the given student.
   */
  editIep: authenticatedProcedure
    .input(
      z.object({
        student_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        grade: z.number(),
        start_date: z.string(),
        end_date: z.string(),
      })
    )
    .mutation(async (req) => {
      const { student_id, first_name, last_name, email, grade } = req.input;
      const start_date = parseISO(req.input.start_date);
      const end_date = parseISO(req.input.end_date);
      const { userId } = req.ctx.auth;

      // Check if the student exists and if the case manager is assigned to the student
      const existingStudent = await req.ctx.db
        .selectFrom("student")
        .selectAll()
        .where("student_id", "=", student_id)
        .where("assigned_case_manager_id", "=", userId)
        .execute();

      const allStudents = await req.ctx.db
        .selectFrom("student")
        .selectAll()
        .execute();
      console.log(allStudents);
      console.log({ existingStudent });
      if (!existingStudent[0]) {
        throw new Error("Student not found");
      }
      const [iep, student] = await Promise.all([
        req.ctx.db
          .updateTable("iep")
          .set({
            start_date,
            end_date,
          })
          .where("student_id", "=", student_id)
          .returningAll()
          .executeTakeFirstOrThrow(),

        req.ctx.db
          .updateTable("student")
          .set({
            first_name,
            last_name,
            email: email.toLowerCase(),
            grade,
          })
          .where("student_id", "=", student_id)
          .returningAll()
          .executeTakeFirstOrThrow(),
      ]);

      // return {iep, student};
      return;
    }),

  /**
   * Returns all the IEPs associated with the given student.
   */
  getIeps: authenticatedProcedure
    .input(
      z.object({
        student_id: z.string(),
      })
    )
    .query(async (req) => {
      const { student_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("iep")
        .where("student_id", "=", student_id)
        .orderBy("end_date", "desc")
        .selectAll()
        .execute();

      return result;
    }),

  /**
   * Gets a student's IEP
   * NOTE: This currently assumes a student has only
   * ONE IEP each. This is operating on the assumption
   * per the MVP that there will only be one IEP per student,
   * but this should be revisited after the MVP.
   */
  getActiveStudentIep: authenticatedProcedure
    .input(
      z.object({
        student_id: z.string().uuid(),
      })
    )
    .query(async (req) => {
      const { student_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("iep")
        .where("student_id", "=", student_id)
        .selectAll()
        .executeTakeFirst();

      return result ?? null;
    }),

  //for future CM's to not have access to a former CM's IEP data, we need a property on the IEP's for the case manager ID and only retrieve database data that matches the current CM's ID.
});
