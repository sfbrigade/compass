import { SharedWorker } from "ava/plugin";
import next from "next";
import { Env } from "@/backend/lib";
import { createServer } from "node:http";

const getNextRequestHandler = async () => {
  const app = next({
    dev: true,
  });
  await app.prepare();
  return app.getRequestHandler();
};

export type NextWorkerRequestPayload = {
  env: Env;
  appPort: number;
};

export type NextWorkerPublishedMessage = {
  endpoint: string;
};

const nextRequestHandlerPromise = getNextRequestHandler();

const handleTestWorkers = async (protocol: SharedWorker.Protocol) => {
  for await (const msg of protocol.subscribe()) {
    const { env, appPort } = msg.data as NextWorkerRequestPayload;

    const nextRequestHandler = await nextRequestHandlerPromise;
    const server = createServer(async (req, res) => {
      (req as unknown as { env: Env }).env = env;
      await nextRequestHandler(req, res);
    });

    server.listen(appPort);

    msg.testWorker.teardown(() => {
      console.log("tearing down");
      server.close();
    });

    msg.reply({
      endpoint: `http://localhost:${appPort}`,
    });
  }
};

export default handleTestWorkers;
