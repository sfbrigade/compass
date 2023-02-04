import { appFactory } from "~/app";
import { loadEnvFromFile, logger } from "~/lib";

const main = () => {
  loadEnvFromFile();

  const app = appFactory();

  app.listen(8080, () => {
    logger.info("Server started on port 8080");
  });
};

main();
