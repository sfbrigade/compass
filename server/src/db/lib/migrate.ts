import * as postgresMigrations from "postgres-migrations";
import * as zg from "zapatos/generate";
import { Pool } from "pg";
import path from "node:path";
import { logger } from "~/lib";

export const migrate = async (databaseUrl: string, silent = false) => {
  const migrationsDirectory = path.join(process.cwd(), "src/db/migrations");
  const zapatosDirectory = path.join(process.cwd(), "src/db");

  if (!silent) {
    logger.info("Migrating database...");
  }

  const pool = new Pool({
    connectionString: databaseUrl,
  });
  await postgresMigrations.migrate(
    {
      client: pool,
    },
    migrationsDirectory
  );
  await pool.end();

  if (!silent) {
    logger.info("Generating types...");
  }

  // Generate typings
  await zg.generate({
    db: {
      connectionString: databaseUrl,
    },
    outDir: zapatosDirectory,
  });
};
