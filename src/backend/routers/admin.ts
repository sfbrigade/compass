import { sql } from "kysely";
import { hasAdmin, router } from "../trpc";

export const admin = router({
  getPostgresInfo: hasAdmin.query(async (req) => {
    const result = await sql<{ version: string }>`SELECT version()`.execute(
      req.ctx.db,
    );

    return result.rows[0].version;
  }),
});
