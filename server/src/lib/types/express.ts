import { Pool } from "pg";
import { logger } from "../logger";
import { KyselyDatabaseInstance } from "./derived-db-types";
import { Env } from "./env";

export {};

declare global {
  namespace Express {
    interface Request {
      env: Env;
      db: KyselyDatabaseInstance;
      pool: Pool;
      logger: typeof logger;
    }
  }
}
