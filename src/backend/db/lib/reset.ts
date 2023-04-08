import { Client } from "pg";
import { parse } from "pg-connection-string";
import { logger } from "backend/lib";
import { migrate } from "./migrate";

export const reset = async (databaseUrl: string) => {
  const connectionConfig = parse(databaseUrl);

  // Connect to the postgres database so we can drop the application database
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

  logger.info(`Dropping database ${targetDatabaseName}...`);

  await client
    .query(`DROP DATABASE IF EXISTS ${targetDatabaseName}`)
    .catch((error: Error) => {
      if (error.message.includes("does not exist")) {
        return;
      }

      throw error;
    });

  logger.info(`Creating database ${targetDatabaseName}...`);
  await client.query(`CREATE DATABASE ${targetDatabaseName}`);
  await client.end();

  logger.info("Running migrations...");
  await migrate(databaseUrl);

  logger.info("🫧  database has been reset and migrated.");
};
