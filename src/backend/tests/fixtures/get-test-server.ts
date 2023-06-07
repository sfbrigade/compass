import { getTestDatabase } from "./get-test-database";
import getPort from "@ava/get-port";
import { getDb, type SeedResult } from "backend/db";
import { Env } from "backend/lib";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "backend/routers/_app";
import { ExecutionContext } from "ava";
import { randomUUID } from "crypto";
import ms from "ms";
import { getTestMinio } from "./get-test-minio";
import { getTestNextJs } from "./get-test-nextjs";

export interface GetTestServerOptions {
  authenticateAs?: "para" | "admin";
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
  ] = await Promise.all([getTestDatabase(), getPort(), getTestMinio()]);

  const seed = beforeTemplateIsBakedResult as SeedResult;

  const { db, pool } = getDb(databaseConnectionString);

  const env: Env = {
    DATABASE_URL: databaseConnectionString,
    S3_USER_UPLOADS_ENDPOINT: minio.endpoint,
    S3_USER_UPLOADS_REGION: minio.region,
    S3_USER_UPLOADS_ACCESS_KEY_ID: minio.accessKey,
    S3_USER_UPLOADS_SECRET_ACCESS_KEY: minio.secretKey,
    S3_USER_UPLOADS_BUCKET_NAME: minio.bucket,
    EMAIL: "example string",
    EMAIL_PASS: "example string",
  };

  const { endpoint } = await getTestNextJs({
    env,
    appPort,
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
  } else if (authenticateAs === "admin") {
    const sessionToken = randomUUID();
    await db
      .insertInto("session")
      .values({
        session_token: sessionToken,
        user_id: seed.admin.user_id,
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
          url: new URL("/api/trpc", endpoint).toString(),
          headers: trpcRequestHeaders,
        }),
      ],
    }),
    db,
    seed,
    pool,
  };
};
