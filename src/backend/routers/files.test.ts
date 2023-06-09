// import test from "ava";
// import axios from "axios";
// import fs from "node:fs/promises";
// import { getTestServer } from "backend/tests";

// test("can upload files", async (t) => {
//   const { trpc, db } = await getTestServer(t, { authenticateAs: "para" });

//   const { url, key } = await trpc.getPresignedUrlForFileUpload.mutate({
//     type: "image/png",
//   });

//   const file = await fs.readFile("public/img/favicon.png");
//   await axios.put(url, file);

//   await trpc.finishFileUpload.mutate({
//     key,
//     filename: "favicon.png",
//   });

//   t.truthy(
//     await db
//       .selectFrom("file")
//       .where("ext_s3_path", "=", key)
//       .executeTakeFirst()
//   );
// });

// test("finishFileUpload throws if file already exists", async (t) => {
//   const { trpc } = await getTestServer(t, { authenticateAs: "para" });

//   const { url, key } = await trpc.getPresignedUrlForFileUpload.mutate({
//     type: "image/png",
//   });

//   const file = await fs.readFile("public/img/favicon.png");
//   await axios.put(url, file);

//   await trpc.finishFileUpload.mutate({
//     key,
//     filename: "favicon.png",
//   });

//   await t.throwsAsync(async () => {
//     await trpc.finishFileUpload.mutate({
//       key,
//       filename: "favicon.png",
//     });
//   });
// });

// test("finishFileUpload throws if invalid key is provided", async (t) => {
//   const { trpc } = await getTestServer(t, { authenticateAs: "para" });

//   await t.throwsAsync(async () => {
//     await trpc.finishFileUpload.mutate({
//       key: "unknown-key",
//       filename: "favicon.png",
//     });
//   });
// });

// test("can download files", async (t) => {
//   const { trpc } = await getTestServer(t, { authenticateAs: "para" });

//   const { url, key } = await trpc.getPresignedUrlForFileUpload.mutate({
//     type: "image/png",
//   });

//   const file = await fs.readFile("public/img/favicon.png");
//   await axios.put(url, file);

//   const { file_id } = await trpc.finishFileUpload.mutate({
//     key,
//     filename: "favicon.png",
//   });

//   const downloadUrl = await trpc.getPresignedUrlForFileDownload.mutate({
//     file_id,
//   });

//   const { data } = await axios.get<Buffer>(downloadUrl, {
//     responseType: "arraybuffer",
//   });

//   t.deepEqual(data, file);
// });
