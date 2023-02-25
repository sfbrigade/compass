import { Pool } from "pg";
import { logger } from "../logger";
import { KyselyDatabaseInstance } from "./derived-db-types";
import { Env } from "./env";

export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      env: Env;
      db: KyselyDatabaseInstance;
      pool: Pool;
      logger: typeof logger;
    }
  }
}
