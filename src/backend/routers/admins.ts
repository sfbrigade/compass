import { sql } from "kysely";
import { adminProcedure } from "../trpc";

export const adminProcedures = {
  getPostgresInfo: adminProcedure.query(async (req) => {
    const result = await sql<{ version: string }>`SELECT version()`.execute(
      req.ctx.db
    );

    return result.rows[0].version;
  }),
};
