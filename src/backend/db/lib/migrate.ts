import { Client, Pool } from "pg";
import { parse } from "pg-connection-string";
import * as postgresMigrations from "postgres-migrations";
import * as zg from "zapatos/generate";
import path from "node:path";
import { logger } from "backend/lib";

interface MigrateOptions {
  silent?: boolean;
  shouldGenerateTypes?: boolean;
}

export const migrate = async (
  databaseUrl: string,
  { silent = false, shouldGenerateTypes = true }: MigrateOptions = {}
) => {
  const migrationsDirectory = path.join(
    process.cwd(),
    "src/backend/db/migrations"
  );
  const zapatosDirectory = path.join(process.cwd(), "src/backend/db");

  if (!silent) {
    logger.info("Migrating database...");
  }

  // Create database if needed
  // Connect to the postgres database so we can create the application db if needed
  const connectionConfig = parse(databaseUrl);
  const client = new Client({
    user: connectionConfig.user,
    password: connectionConfig.password,
    host: connectionConfig.host ?? undefined,
    port: connectionConfig.port
      ? parseInt(connectionConfig.port, 10)
      : undefined,
    database: "postgres",
  });

  await client.connect();

  const targetDatabaseName = connectionConfig.database as string;

  const databaseExistsQuery = `SELECT 1 FROM pg_database WHERE datname = '${targetDatabaseName}'`;
  const { rows } = await client.query(databaseExistsQuery);

  if (rows.length === 0) {
    const createDatabaseQuery = `CREATE DATABASE ${targetDatabaseName}`;
    await client.query(createDatabaseQuery);

    console.log(`Database ${targetDatabaseName} created successfully`);
  } else {
    console.log(`Database ${targetDatabaseName} already exists`);
  }
  await client.end();

  // Run migrations
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

  if (shouldGenerateTypes) {
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
  }
};
