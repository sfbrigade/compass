import * as grpc from "@grpc/grpc-js";
import { appFactory } from "~/app";
import { loadEnvFromFile, logger } from "~/lib";
import { CompassServer } from "../grpc_server";
import { CompassService } from "../../proto-gen/compass_grpc_pb"; // TODO: export this from grpc_server as well - that should ideally be the only place interacting with pb

const main = () => {
  loadEnvFromFile();

  const grpcPort = process.env.GRPC_PORT || 9090;
  const grpcServer = new grpc.Server();
  grpcServer.addService(CompassService, new CompassServer());
  grpcServer.bindAsync(
    `localhost:${grpcPort}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        throw err;
      }
      logger.info(`Started grpc server at http://localhost:${grpcPort}`);
      grpcServer.start();
    }
  );

  const port = process.env.PORT || 8085;

  const app = appFactory();
  app.listen(port, () => {
    logger.info(`Server http server at http://localhost:${port}`);
  });
};

main();
