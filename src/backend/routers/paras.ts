import { z } from "zod";
import { protectedProcedure, procedure } from "../trpc";

export const paraProcedures = {
  getParaById: procedure
    .input(z.object({ user_id: z.string().uuid() }))
    .query(async (req) => {
      console.log("req", req);
      const { user_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("user")
        .where("user_id", "=", user_id)
        .selectAll()
        .executeTakeFirst();

      return result;
    }),

  getMyParas: protectedProcedure.query(async (req) => {
    const { userId } = req.ctx.auth;

    const result = await req.ctx.db
      .selectFrom("user")
      .innerJoin("cm_to_para", "user.user_id", "cm_to_para.para_id")
      .where("role", "=", "para")
      .where("cm_to_para.case_manager_id", "=", userId)
      .selectAll()
      .execute();

    return result;
  }),

  // getAllParas: procedure.query(async (req) => {
  //   const result = await req.ctx.db.selectFrom("user").selectAll().execute();

  //   return result;
  // }),

  createPara: protectedProcedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        role: z.string(),
      })
    )
    .mutation(async (req) => {
      const { first_name, last_name, email, role } = req.input;

      const insertedPara = await req.ctx.db
        .insertInto("user")
        .values({ first_name, last_name, email, role })
        .returningAll()
        .executeTakeFirstOrThrow();

      const { userId } = req.ctx.auth;
      await req.ctx.db
        .insertInto("cm_to_para")
        .values({ case_manager_id: userId, para_id: insertedPara.user_id })
        .returningAll()
        .execute();
    }),

  // createPara: procedure
  //   .input(
  //     z.object({
  //       first_name: z.string(),
  //       last_name: z.string(),
  //       email: z.string(),
  //       role: z.string(),
  //     })
  //   )
  //   .mutation(async (req) => {
  //     const { first_name, last_name, email, role } = req.input;

  //     // todo: add a unique constraint to prevent duplicate paras
  //     const result = await req.ctx.db
  //       .insertInto("user")
  //       .values({ first_name, last_name, email, role })
  //       .returningAll()
  //       .execute();
  //     return result;
  //   }),

  //this is a placeholder for the archive-para action that will be covered in a future PR
};
