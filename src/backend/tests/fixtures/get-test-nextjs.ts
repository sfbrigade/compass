import { registerSharedTypeScriptWorker } from "ava-typescript-worker";
import {
  NextWorkerPublishedMessage,
  NextWorkerRequestPayload,
} from "./workers/get-test-nextjs.worker";

const worker = registerSharedTypeScriptWorker({
  filename: new URL("./workers/get-test-nextjs.worker.ts", import.meta.url),
});

export const getTestNextJs = async (payload: NextWorkerRequestPayload) => {
  const fixture = await worker.publish(payload).replies().next();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return fixture.value.data as NextWorkerPublishedMessage;
};
