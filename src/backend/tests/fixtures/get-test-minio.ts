import { registerSharedTypeScriptWorker } from "ava-typescript-worker";
import { type MinioWorkerPublishedMessage } from "./workers/get-test-minio.worker";
import path from "node:path";
import { fileURLToPath } from "node:url";

const worker = registerSharedTypeScriptWorker({
  filename: path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "./workers/get-test-minio.worker.ts",
  ),
});

const msgPromise = worker.subscribe().next();

export const getTestMinio = async (): Promise<MinioWorkerPublishedMessage> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return (await msgPromise).value.data as MinioWorkerPublishedMessage;
};
