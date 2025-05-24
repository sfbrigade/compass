import { z } from "zod";
import { parseISO, sub } from "date-fns";

import { hasCaseManager, router } from "../trpc";
import {
  createPara,
  assignParaToCaseManager,
} from "../lib/db_helpers/case_manager";

export const case_manager = router({
  /**
   * Get all students assigned to the current user
   */
  getMyStudents: hasCaseManager.query(async (req) => {
    const { userId } = req.ctx.auth;

    const result = await req.ctx.db
      .selectFrom("student")
      .selectAll()
      .where("assigned_case_manager_id", "=", userId)
      .execute();

    return result;
  }),

  getMyStudentsAndIepInfo: hasCaseManager
    .input(
      z
        .object({
          search: z.string().optional(),
          sort: z.string().optional(),
          sortAsc: z.coerce.boolean().optional(),
        })
        .optional()
    )
    .query(async (req) => {
      const { userId } = req.ctx.auth;
      const { search, sort, sortAsc = true } = req.input ?? {};

      let query = req.ctx.db
        .selectFrom("iep")
        .fullJoin("student", (join) =>
          join.onRef("student.student_id", "=", "iep.student_id")
        )
        .where("assigned_case_manager_id", "=", userId);

      if (search) {
        query = query.where((eb) =>
          eb.or([
            eb("student.first_name", "ilike", `%${search}%`),
            eb("student.last_name", "ilike", `%${search}%`),
          ])
        );
      }

      const result = await query
        .select([
          "student.student_id as student_id",
          "first_name",
          "last_name",
          "student.grade as grade",
          "iep.iep_id as iep_id",
          "iep.end_date as end_date",
        ])
        .orderBy(
          (eb) => {
            switch (sort) {
              case "last_name":
                return eb.ref("student.last_name");
              case "grade":
                return eb.ref("student.grade");
              case "end_date":
                return eb.ref("iep.end_date");
              default:
                return eb.ref("student.first_name");
            }
          },
          sortAsc ? "asc" : "desc"
        )
        .execute();

      return result;
    }),

  /**
   * Adds the given student to the CM's roster. The student row is created if
   * it doesn't already exist. Throws an error if the student is already
   * assigned to another CM.
   */
  addStudent: hasCaseManager
    .input(
      z.object({
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        grade: z.number().min(1).max(12),
        email: z.string().optional(),
        end_date: z.string().date().optional(),
      })
    )
    .mutation(async (req) => {
      const { userId } = req.ctx.auth;
      const { first_name, last_name, grade, email, end_date } = req.input;

      return req.ctx.db.transaction().execute(async (trx) => {
        const result = await trx
          .insertInto("student")
          .values({
            first_name,
            last_name,
            grade,
            email,
            assigned_case_manager_id: userId,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        if (end_date) {
          const start_date = sub(parseISO(end_date), { years: 1 });
          await trx
            .insertInto("iep")
            .values({
              student_id: result.student_id,
              case_manager_id: userId,
              start_date,
              end_date: parseISO(end_date),
            })
            .returningAll()
            .executeTakeFirstOrThrow();
        }

        return result;
      });
    }),

  /**
   * Edits the given student in the CM's roster. Throws an error if the student was not found in the db.
   */
  editStudent: hasCaseManager
    .input(
      z.object({
        student_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        grade: z.number(),
        email: z.string().optional(),
      })
    )
    .mutation(async (req) => {
      const { student_id, first_name, last_name, grade, email } = req.input;
      const { userId } = req.ctx.auth; // case manager id

      // Check if the student exists and if the case manager is assigned to the student
      const existingStudent = await req.ctx.db
        .selectFrom("student")
        .selectAll()
        .where("student_id", "=", student_id)
        .where("assigned_case_manager_id", "=", userId)
        .execute();

      if (!existingStudent[0]) {
        throw new Error("Student not found");
      }

      // Update the student's information
      return await req.ctx.db
        .updateTable("student")
        .set({
          first_name,
          last_name,
          grade,
          email,
        })
        .where("student_id", "=", student_id)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  /**
   * Removes the case manager associated with this student.
   */
  removeStudent: hasCaseManager
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

  getMyParas: hasCaseManager
    .input(
      z
        .object({
          search: z.string().optional(),
          sort: z.string().optional(),
          sortAsc: z.coerce.boolean().optional(),
        })
        .optional()
    )
    .query(async (req) => {
      const { userId } = req.ctx.auth;
      const { search, sort, sortAsc = true } = req.input ?? {};

      let query = req.ctx.db
        .selectFrom("user")
        .innerJoin(
          "paras_assigned_to_case_manager",
          "user.user_id",
          "paras_assigned_to_case_manager.para_id"
        )
        .where("paras_assigned_to_case_manager.case_manager_id", "=", userId);

      if (search) {
        query = query.where((eb) =>
          eb.or([
            eb("user.first_name", "ilike", `%${search}%`),
            eb("user.last_name", "ilike", `%${search}%`),
            eb("user.email", "ilike", `%${search}%`),
          ])
        );
      }

      const result = await query
        .selectAll()
        .orderBy(
          (eb) => {
            switch (sort) {
              case "last_name":
                return eb.ref("user.last_name");
              case "email":
                return eb.ref("user.email");
              default:
                return eb.ref("user.first_name");
            }
          },
          sortAsc ? "asc" : "desc"
        )
        .execute();

      return result;
    }),

  /**
   * Handles creation of para and assignment to user, attempts to send
   * email but does not await email success
   */
  addStaff: hasCaseManager
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async (req) => {
      const para = await createPara(
        req.input,
        req.ctx.db,
        req.ctx.auth.session.user?.name ?? "",
        req.ctx.env.EMAIL_FROM,
        req.input.email,
        req.ctx.env
      );

      return await assignParaToCaseManager(
        para.user_id,
        req.ctx.auth.userId,
        req.ctx.db
      );
    }),

  /**
   * Deprecated: use addStaff instead
   */
  addPara: hasCaseManager
    .input(
      z.object({
        para_id: z.string(),
      })
    )
    .mutation(async (req) => {
      await assignParaToCaseManager(
        req.input.para_id,
        req.ctx.auth.userId,
        req.ctx.db
      );
      return;
    }),

  editPara: hasCaseManager
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

  removePara: hasCaseManager
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
