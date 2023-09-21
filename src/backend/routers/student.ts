import { z } from "zod";
import { authenticatedProcedure, router } from "../trpc";

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
        .executeTakeFirstOrThrow();

      return result;
    }),

  //for future CM's to not have access to a former CM's IEP data, we need a property on the IEP's for the case manager ID and only retrieve database data that matches the current CM's ID.
});
