import { z } from "zod";
import { procedure } from "../trpc";

export const paraProcedures = {
  getParaById: procedure
    .input(z.object({ para_id: z.string().uuid() }))
    .query(async (req) => {
      const { para_id } = req.input;

      const result = await req.ctx.db
        .selectFrom("para")
        .where("para_id", "=", para_id)
        .selectAll()
        .executeTakeFirst();

      return result;
    }),

  getAllParas: procedure.query(async (req) => {
    const result = await req.ctx.db.selectFrom("para").selectAll().execute();

    return result;
  }),

  createPara: procedure
    .input(z.object({ first_name: z.string(), last_name: z.string() }))
    .mutation(async (req) => {
      const { first_name, last_name } = req.input;

      // todo: add a unique constraint to prevent duplicate paras
      const result = await req.ctx.db
        .insertInto("para")
        .values({ first_name, last_name })
        .returningAll()
        .execute();
      return result;
    }),

  deletePara: procedure
    .input(z.object({ para_id: z.string() }))
    .mutation(async (req) => {
      const { para_id } = req.input;

      const result = await req.ctx.db
        .deleteFrom("para")
        .where("para_id", "=", para_id)
        .returningAll()
        .execute();
      return result;
    }),
};
