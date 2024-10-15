import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { tRPCContext } from "../context";
import { substituteTransactionOnContext } from "./utils/context";

const deleteFileWithoutTransaction = async (
  fileId: string,
  ctx: tRPCContext,
) => {
  if (ctx.auth.type === "none") {
    throw new Error("File deletion requires authentication.");
  }

  const { ext_s3_path } = await ctx.db
    .deleteFrom("file")
    .where("file_id", "=", fileId)
    .where("uploaded_by_user_id", "=", ctx.auth.userId)
    .returning("ext_s3_path")
    .executeTakeFirstOrThrow();

  await ctx.s3.send(
    new DeleteObjectCommand({
      Bucket: ctx.env.S3_USER_UPLOADS_BUCKET_NAME,
      Key: ext_s3_path,
    }),
  );
};

export const deleteFile = async (fileId: string, ctx: tRPCContext) => {
  if (ctx.db.isTransaction) {
    return await deleteFileWithoutTransaction(fileId, ctx);
  }

  await ctx.db.transaction().execute(async (trx) => {
    await deleteFileWithoutTransaction(
      fileId,
      substituteTransactionOnContext(trx, ctx),
    );
  });
};
