import * as grpc from "@grpc/grpc-js";
import { appFactory } from "~/app";
import { loadEnvFromFile, logger } from "~/lib";
import { CompassServer } from "../grpc_server";
import { CompassService } from "proto"; // TODO: share

const main = () => {
  loadEnvFromFile();

  const grpcPort = process.env.GRPC_PORT || 8081;
  const grpcServer = new grpc.Server();
  grpcServer.addService(CompassService, new CompassServer());
  grpcServer.bindAsync(
    `localhost:${grpcPort}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        throw err;
      }
      console.log(`Started grpc server at http://localhost:${grpcPort}`);
      grpcServer.start();
    }
  );

  const port = process.env.PORT || 8080;

  const app = appFactory();
  app.listen(port, () => {
    logger.info(`Server started on port ${port}: http://localhost:${port}`);
  });
};

main();
