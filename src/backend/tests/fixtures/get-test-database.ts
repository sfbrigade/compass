import { KyselySchema } from "@/backend/lib";
import { getTestPostgresDatabaseFactory } from "ava-postgres";
import { migrate, seed } from "@/backend/db";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export const getTestDatabase = getTestPostgresDatabaseFactory({
  postgresVersion: "15",
  async beforeTemplateIsBaked({ connection: { connectionString } }) {
    await migrate(connectionString, {
      silent: true,
      shouldGenerateTypes: false,
    });

    const db = new Kysely<KyselySchema>({
      dialect: new PostgresDialect({
        pool: new Pool({ connectionString }),
      }),
    });

    const seedResult = await seed(db);

    await db.destroy();
    return seedResult;
  },
});
