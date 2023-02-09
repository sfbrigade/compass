import express from "express";
import { getTestDatabase } from "./get-test-database";
import getPort from "@ava/get-port";
import axios from "axios";
import { appFactory } from "~/app";
import { getDb } from "~/db/lib/get-db";
import { Env } from "~/lib";

export const getTestServer = async () => {
  const [{ connectionString: databaseConnectionString }, appPort] =
    await Promise.all([getTestDatabase(), getPort()]);

  const { db, pool } = getDb(databaseConnectionString);

  const env: Env = {
    DATABASE_URL: databaseConnectionString,
  };

  const baseApp = express();
  baseApp.use((req, _, next) => {
    req.env = env;
    req.db = db;
    req.pool = pool;

    next();
  });

  const app = appFactory(baseApp);

  await new Promise<void>((resolve) => app.listen(appPort, resolve));

  return {
    axios: axios.create({
      baseURL: `http://localhost:${appPort}`,
    }),
    db,
    pool,
  };
};
