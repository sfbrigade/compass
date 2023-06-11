import { sql } from "kysely";
import { adminProcedure, router } from "../trpc";

export const admin = router({
  getPostgresInfo: adminProcedure.query(async (req) => {
    const result = await sql<{ version: string }>`SELECT version()`.execute(
      req.ctx.db
    );

    return result.rows[0].version;
  }),
});
