import { Pool } from "pg";
import { KyselyDatabaseInstance } from "./derived-db-types";
import { Env } from "./env";

export {};

declare global {
  namespace Express {
    interface Request {
      env: Env;
      db: KyselyDatabaseInstance;
      pool: Pool;
    }
  }
}
