import { z } from "zod";
import { authenticatedProcedure, router } from "../trpc";

export const case_manager = router({
  /**
   * Get all students assigned to the current user
   */
  getMyStudents: authenticatedProcedure.query(async (req) => {
    const { userId } = req.ctx.auth;

    const result = await req.ctx.db
      .selectFrom("student")
      .selectAll()
      .where("assigned_case_manager_id", "=", userId)
      .execute();

    return result;
  }),

  getMyStudentsAndIepInfo: authenticatedProcedure.query(async (req) => {
    const { userId } = req.ctx.auth;

    const studentData = await req.ctx.db
      .selectFrom("iep")
      .fullJoin("student", (join) =>
        join.onRef("student.student_id", "=", "iep.student_id")
      )
      .where("assigned_case_manager_id", "=", userId)
      .select([
        "student.student_id as student_id",
        "first_name",
        "last_name",
        "student.email",
        "iep.iep_id as iep_id",
        "iep.end_date as end_date",
        "student.grade as grade",
      ])
      .execute();

    return studentData;
  }),

  /**
   * Adds the given student to the CM's roster. The student row is created if
   * it doesn't already exist. Throws an error if the student is already
   * assigned to another CM.
   */
  addStudent: authenticatedProcedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        grade: z.number(),
      })
    )
    .mutation(async (req) => {
      const { first_name, last_name, email, grade } = req.input;
      const { userId } = req.ctx.auth;

      await req.ctx.db
        .insertInto("student")
        .values({
          first_name,
          last_name,
          email: email.toLowerCase(),
          assigned_case_manager_id: userId,
          grade,
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
   * Edits the given student in the CM's roster. Throws an error if the student was not found in the db.
   */
  editStudent: authenticatedProcedure
    .input(
      z.object({
        student_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        grade: z.number(),
      })
    )
    .mutation(async (req) => {
      const { student_id, first_name, last_name, email, grade } = req.input;
      const { userId } = req.ctx.auth; // case manager id

      // Check if the student exists and if the case manager is assigned to the student
      const existingStudent = req.ctx.db
        .selectFrom("student")
        .selectAll()
        .where("student_id", "=", student_id)
        .where("assigned_case_manager_id", "=", userId);

      if (!existingStudent) {
        throw new Error("Student not found");
      }

      // Update the student's information
      return await req.ctx.db
        .updateTable("student")
        .set({
          first_name,
          last_name,
          email: email.toLowerCase(),
          grade,
        })
        .where("student_id", "=", student_id)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  /**
   * Removes the case manager associated with this student.
   */
  removeStudent: authenticatedProcedure
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

  getMyParas: authenticatedProcedure.query(async (req) => {
    const { userId } = req.ctx.auth;

    const me = await req.ctx.db
      .selectFrom("user")
      .where("user_id", "=", userId)
      .selectAll()
      .executeTakeFirst();

    const result = await req.ctx.db
      .selectFrom("user")
      .innerJoin(
        "paras_assigned_to_case_manager",
        "user.user_id",
        "paras_assigned_to_case_manager.para_id"
      )
      .where("paras_assigned_to_case_manager.case_manager_id", "=", userId)
      .selectAll()
      .execute();

    return [me, ...result];
  }),

  addPara: authenticatedProcedure
    .input(
      z.object({
        para_id: z.string(),
      })
    )
    .mutation(async (req) => {
      const { para_id } = req.input;
      const { userId } = req.ctx.auth;

      await req.ctx.db
        .insertInto("paras_assigned_to_case_manager")
        .values({ case_manager_id: userId, para_id })
        .execute();
    }),

  editPara: authenticatedProcedure
    .input(
      z.object({
        para_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async (req) => {
      const { para_id, first_name, last_name, email } = req.input;
      const { userId } = req.ctx.auth;

      if (userId !== para_id) {
        const existingPara = req.ctx.db
          .selectFrom("user")
          .innerJoin(
            "paras_assigned_to_case_manager",
            "user.user_id",
            "paras_assigned_to_case_manager.para_id"
          )
          .where("paras_assigned_to_case_manager.case_manager_id", "=", userId)
          .selectAll();

        if (!existingPara) {
          throw new Error("Para not found");
        }
      }

      return await req.ctx.db
        .updateTable("user")
        .set({
          first_name,
          last_name,
          email: email.toLowerCase(),
        })
        .where("user_id", "=", para_id)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  removePara: authenticatedProcedure
    .input(
      z.object({
        para_id: z.string(),
      })
    )
    .mutation(async (req) => {
      const { para_id } = req.input;
      const { userId } = req.ctx.auth;

      await req.ctx.db
        .deleteFrom("paras_assigned_to_case_manager")
        .where("case_manager_id", "=", userId)
        .where("para_id", "=", para_id)
        .execute();
    }),
});
