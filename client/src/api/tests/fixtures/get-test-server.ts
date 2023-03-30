import { getTestDatabase } from "./get-test-database";
import getPort from "@ava/get-port";
import { getDb } from "api/db/lib/get-db";
import { Env } from "api/lib";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "api/routers/_app";
import next from "next";
import { ExecutionContext } from "ava";
import { createServer, Server } from "http";

export const getTestServer = async (t: ExecutionContext) => {
  const [{ connectionString: databaseConnectionString }, appPort] =
    await Promise.all([getTestDatabase(), getPort()]);

  const { db, pool } = getDb(databaseConnectionString);

  const env: Env = {
    DATABASE_URL: databaseConnectionString,
  };

  const app = next({
    dev: true,
  });
  const handle = app.getRequestHandler();

  let server: Server;
  await app.prepare().then(() => {
    server = createServer(async (req, res) => {
      (req as unknown as { env: Env }).env = env;
      await handle(req, res);
    });
    server.listen(appPort);
  });

  t.teardown(() => {
    if (server) {
      server.close();
    }
  });

  return {
    trpc: createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `http://localhost:${appPort}/api/trpc`,
        }),
      ],
    }),
    db,
    pool,
  };
};
