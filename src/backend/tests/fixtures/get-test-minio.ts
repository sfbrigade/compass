// import { registerSharedTypeScriptWorker } from "ava-typescript-worker";
// import { type MinioWorkerPublishedMessage } from "./workers/get-test-minio.worker";

// const worker = registerSharedTypeScriptWorker({
//   filename: new URL("./workers/get-test-minio.worker.ts", import.meta.url),
// });

// const msgPromise = worker.subscribe().next();

// export const getTestMinio = async (): Promise<MinioWorkerPublishedMessage> => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//   return (await msgPromise).value.data as MinioWorkerPublishedMessage;
// };
