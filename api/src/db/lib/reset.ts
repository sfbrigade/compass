import { Client, Pool } from "pg";
import {parse} from 'pg-connection-string'
import { logger } from "~/lib";
import { migrate } from "./migrate";

export const reset = async (databaseUrl: string) => {
  const connectionConfig = parse(databaseUrl)

  // Connect to the postgres database so we can drop the application database
  const client = new Client({
    user: connectionConfig.user,
    password: connectionConfig.password,
    host: connectionConfig.host ?? undefined,
    port: connectionConfig.port ? parseInt(connectionConfig.port, 10) : undefined,
    database: 'postgres',
  })

  await client.connect()

  logger.info(`Dropping database ${connectionConfig.database}...`)

  await client.query(`DROP DATABASE IF EXISTS ${connectionConfig.database}`).catch((error: Error) => {
    if (error.message.includes('does not exist')) {
      return
    }

    throw error
  })

  logger.info(`Creating database ${connectionConfig.database}...`)
  await client.query(`CREATE DATABASE ${connectionConfig.database}`)
  await client.end()

  logger.info('Running migrations...')
  await migrate(databaseUrl)

  logger.info('🫧  database has been reset and migrated.')
}
