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

  getStudentDetailById: authenticatedProcedure
    .input(z.object({ student_id: z.string().uuid() }))
    .query(async (req) => {
      const { student_id } = req.input;

      const rows = await req.ctx.db
        .selectFrom("student")
        .innerJoin("iep", "iep.student_id", "student.student_id")
        .innerJoin("goal", "goal.iep_id", "iep.iep_id")
        .innerJoin("subgoal", "subgoal.goal_id", "goal.goal_id")
        .where("student.student_id", "=", student_id)
        .select([
          "student.student_id",
          "first_name",
          "last_name",
          "student.email",
          "assigned_case_manager_id",
          "grade",
          "iep.iep_id",
          "case_manager_id",
          "start_date",
          "end_date",
          "iep.created_at",
          "goal.goal_id",
          "goal.description as goal_description",
          "category",
          "subgoal.subgoal_id",
          "subgoal.description as subgoal_description",
          "instructions",
          "target_max_attempts",
        ])
        .execute();

      // return rows as an array of objects which in turn contain objects representing tables
      // [{{student, iep, goal, subgoal}}, {{student, iep, goal, subgoal}}, ...]
      const tableRows = rows.map(function (row) {
        return {
          student: {
            student_id: row.student_id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            assigned_case_manager_id: row.assigned_case_manager_id,
          },
          iep: {
            iep_id: row.iep_id,
            case_manager_id: row.assigned_case_manager_id,
            start_date: row.start_date,
            end_date: row.end_date,
            created_at: row.created_at,
          },
          goal: {
            goal_id: row.goal_id,
            description: row.goal_description,
            category: row.category,
          },
          subgoal: {
            subgoal_id: row.subgoal_id,
            description: row.subgoal_description,
            instructions: row.instructions,
            target_max_attempts: row.target_max_attempts,
          },
        };
      });

      return tableRows;
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

  // TODO: get only the active IEP from the student
  getActiveStudentIep: authenticatedProcedure
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
        .where("is_active", "=", true)
        .selectAll()
        .executeTakeFirst();

      return result || null;
    }),

  //for future CM's to not have access to a former CM's IEP data, we need a property on the IEP's for the case manager ID and only retrieve database data that matches the current CM's ID.
});
