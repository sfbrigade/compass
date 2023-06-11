import { z } from "zod";
import {
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { authenticatedProcedure, router } from "../trpc";
import { randomUUID } from "crypto";

export const file = router({
  getMyFiles: authenticatedProcedure.query(async (req) => {
    return req.ctx.db
      .selectFrom("file")
      .selectAll()
      .where("uploaded_by_user_id", "=", req.ctx.auth.userId)
      .execute();
  }),

  getPresignedUrlForFileDownload: authenticatedProcedure
    .input(
      z.object({
        file_id: z.string().uuid(),
      })
    )
    .mutation(async (req) => {
      const file = await req.ctx.db
        .selectFrom("file")
        .select("ext_s3_path")
        .where("file_id", "=", req.input.file_id)
        // Only allow access to your own files
        .where("uploaded_by_user_id", "=", req.ctx.auth.userId)
        .executeTakeFirstOrThrow();

      const command = new GetObjectCommand({
        Bucket: req.ctx.env.S3_USER_UPLOADS_BUCKET_NAME,
        Key: file.ext_s3_path,
      });

      const url = await getSignedUrl(req.ctx.s3, command, {
        expiresIn: 60 * 60, // 1 hour
      });
      return url;
    }),

  getPresignedUrlForFileUpload: authenticatedProcedure
    .input(
      z.object({
        type: z.string(),
      })
    )
    .mutation(async (req) => {
      const key = randomUUID();

      const command = new PutObjectCommand({
        Bucket: req.ctx.env.S3_USER_UPLOADS_BUCKET_NAME,
        Key: key,
        ContentType: req.input.type,
      });
      const url = await getSignedUrl(req.ctx.s3, command, {
        expiresIn: 60 * 60,
      });

      return { url, key };
    }),

  finishFileUpload: authenticatedProcedure
    .input(
      z.object({
        filename: z.string(),
        key: z.string(),
      })
    )
    .mutation(async (req) => {
      const command = new HeadObjectCommand({
        Bucket: req.ctx.env.S3_USER_UPLOADS_BUCKET_NAME,
        Key: req.input.key,
      });
      const fileHead = await req.ctx.s3.send(command);

      const file = await req.ctx.db
        .insertInto("file")
        .values({
          name: req.input.filename,
          content_type: fileHead.ContentType ?? "unknown",
          uploaded_by_user_id: req.ctx.auth.userId,
          ext_s3_path: req.input.key,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      return file;
    }),
});
