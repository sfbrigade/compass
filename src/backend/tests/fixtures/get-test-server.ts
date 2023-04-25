import { getTestDatabase } from "./get-test-database";
import getPort from "@ava/get-port";
import { getDb, type SeedResult } from "backend/db";
import { Env } from "backend/lib";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "backend/routers/_app";
import next from "next";
import { ExecutionContext } from "ava";
import { createServer, Server } from "http";
import { randomUUID } from "crypto";
import ms from "ms";

export interface GetTestServerOptions {
  authenticateAs?: "para";
}

export const getTestServer = async (
  t: ExecutionContext,
  { authenticateAs }: GetTestServerOptions = {}
) => {
  const [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    { connectionString: databaseConnectionString, beforeTemplateIsBakedResult },
    appPort,
  ] = await Promise.all([getTestDatabase(), getPort()]);

  const seed = beforeTemplateIsBakedResult as SeedResult;

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

  let trpcRequestHeaders = {};

  if (authenticateAs === "para") {
    const sessionToken = randomUUID();
    await db
      .insertInto("session")
      .values({
        session_token: sessionToken,
        user_id: seed.para.user_id,
        expires_at: new Date(Date.now() + ms("1 hour")),
      })
      .execute();

    trpcRequestHeaders = {
      cookie: `next-auth.session-token=${sessionToken}`,
    };
  }

  return {
    trpc: createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `http://localhost:${appPort}/api/trpc`,
          headers: trpcRequestHeaders,
        }),
      ],
    }),
    db,
    seed,
    pool,
  };
};
