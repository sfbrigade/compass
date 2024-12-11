import { Kysely, PostgresDialect } from "kysely";
import { KyselyDatabaseInstance, KyselySchema } from "@/backend/lib";
import pg from "pg";

const { Pool } = pg;

type DatabaseInstanceAndPool = {
  db: KyselyDatabaseInstance;
  pool: typeof Pool;
};

const databaseUrlToSingleton = new Map<string, DatabaseInstanceAndPool>();
const poolToSingleton = new WeakMap<typeof Pool, DatabaseInstanceAndPool>();

type GetDb = {
  (databaseUrl: string): DatabaseInstanceAndPool;
  (pool: typeof Pool): DatabaseInstanceAndPool;
};

export const getDb: GetDb = (databaseUrlOrPool) => {
  if (databaseUrlOrPool instanceof Pool) {
    if (!poolToSingleton.has(databaseUrlOrPool as typeof Pool)) {
      const db = new Kysely<KyselySchema>({
        dialect: new PostgresDialect({
          pool: databaseUrlOrPool,
        }),
      });

      const dbAndPool = {
        db,
        pool: databaseUrlOrPool,
      } as DatabaseInstanceAndPool;
      poolToSingleton.set(databaseUrlOrPool as typeof Pool, dbAndPool);
    }

    return poolToSingleton.get(databaseUrlOrPool as typeof Pool)!;
  }
  if (!databaseUrlToSingleton.has(databaseUrlOrPool as string)) {
    const pool = new Pool({
      connectionString: databaseUrlOrPool as string,
    });

    const db = new Kysely<KyselySchema>({
      dialect: new PostgresDialect({
        pool,
      }),
    });

    databaseUrlToSingleton.set(databaseUrlOrPool as string, {
      db,
      pool: Pool as unknown as typeof Pool,
    });
  }

  return databaseUrlToSingleton.get(databaseUrlOrPool as string)!;
};
