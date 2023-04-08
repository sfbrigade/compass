import { Kysely, PostgresDialect } from "kysely";
import { KyselyDatabaseInstance, KyselySchema } from "backend/lib";
import { Pool } from "pg";

type DatabaseInstanceAndPool = { db: KyselyDatabaseInstance; pool: Pool };

const databaseUrlToSingleton = new Map<string, DatabaseInstanceAndPool>();
const poolToSingleton = new WeakMap<Pool, DatabaseInstanceAndPool>();

type GetDb = {
  (databaseUrl: string): DatabaseInstanceAndPool;
  (pool: Pool): DatabaseInstanceAndPool;
};

export const getDb: GetDb = (databaseUrlOrPool) => {
  if (databaseUrlOrPool instanceof Pool) {
    if (!poolToSingleton.has(databaseUrlOrPool)) {
      const db = new Kysely<KyselySchema>({
        dialect: new PostgresDialect({
          pool: databaseUrlOrPool,
        }),
      });

      const dbAndPool = { db, pool: databaseUrlOrPool };
      poolToSingleton.set(databaseUrlOrPool, dbAndPool);
    }

    return poolToSingleton.get(databaseUrlOrPool)!;
  }
  if (!databaseUrlToSingleton.has(databaseUrlOrPool)) {
    const pool = new Pool({
      connectionString: databaseUrlOrPool,
    });

    const db = new Kysely<KyselySchema>({
      dialect: new PostgresDialect({
        pool,
      }),
    });

    databaseUrlToSingleton.set(databaseUrlOrPool, { db, pool });
  }

  return databaseUrlToSingleton.get(databaseUrlOrPool)!;
};
