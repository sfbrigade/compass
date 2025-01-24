import { nodemailerMock } from "./mocks";
import { getTestDatabase } from "./get-test-database";
import getPort from "@ava/get-port";
import { getDb, type SeedResult } from "@/backend/db";
import { Env } from "@/backend/lib";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@/backend/routers/_app";
import { ExecutionContext } from "ava";
import { randomUUID } from "crypto";
import ms from "ms";
import { getTestMinio } from "./get-test-minio";
import superjson from "superjson";
import { UserType } from "@/types/auth";

import { createServer, Server } from "http";
import { parse } from "url";
import next from "next";

const getTestServerFixture = async ({
  port,
  env,
}: {
  port: number;
  env: Env;
}) => {
  const app = next({ dev: false });
  const handle = app.getRequestHandler();
  let server: Server;
  await app.prepare().then(() => {
    server = createServer((req, res) => {
      const parsedUrl = parse(req.url!, true);
      (req as unknown as { env: Env }).env = env;
      void handle(req, res, parsedUrl);
    }).listen(port);
  });
  return {
    close: async () => {
      await app.close();
      server.closeAllConnections();
      server.close();
    },
  };
};

export interface GetTestServerOptions {
  authenticateAs?: UserType.CaseManager | UserType.Para | UserType.Admin;
}

export const getTestServer = async (
  t: ExecutionContext,
  { authenticateAs }: GetTestServerOptions = {}
) => {
  const [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    { connectionString: databaseConnectionString, beforeTemplateIsBakedResult },
    appPort,
    minio,
  ] = await Promise.all([getTestDatabase(t), getPort(), getTestMinio()]);

  const seed = beforeTemplateIsBakedResult as SeedResult;

  const { db, pool } = getDb(databaseConnectionString);

  const env: Env = {
    BASE_URL: "http://localhost:3000",
    DATABASE_URL: databaseConnectionString,
    S3_USER_UPLOADS_ENDPOINT: minio.endpoint,
    S3_USER_UPLOADS_REGION: minio.region,
    S3_USER_UPLOADS_ACCESS_KEY_ID: minio.accessKey,
    S3_USER_UPLOADS_SECRET_ACCESS_KEY: minio.secretKey,
    S3_USER_UPLOADS_BUCKET_NAME: minio.bucket,
    EMAIL_SERVICE: "smtp",
    EMAIL_FROM: "no-reply@compassiep.org",
    EMAIL_AUTH_USER: "", // note that these server settings will not be used, nodemailer is mocked
    EMAIL_AUTH_PASS: "",
    EMAIL_HOST: "localhost",
    EMAIL_PORT: "1025",
  };

  const server = await getTestServerFixture({ port: appPort, env });

  t.teardown(async () => {
    await server.close();
  });

  let trpcRequestHeaders = {};

  if (authenticateAs) {
    const user = seed[authenticateAs];
    const sessionToken = randomUUID();
    await db
      .insertInto("session")
      .values({
        session_token: sessionToken,
        user_id: user.user_id,
        expires_at: new Date(Date.now() + ms("1 hour")),
      })
      .execute();

    trpcRequestHeaders = {
      cookie: `next-auth.session-token=${sessionToken}`,
    };
  }

  return {
    trpc: createTRPCProxyClient<AppRouter>({
      transformer: superjson,
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
    nodemailerMock,
  };
};
