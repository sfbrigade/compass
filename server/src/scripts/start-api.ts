import { appFactory } from "~/app";
import { loadEnvFromFile, logger } from "~/lib";

const main = () => {
  loadEnvFromFile();

  const port = process.env.PORT || 8080;

  const app = appFactory();

  app.listen(port, () => {
    logger.info(`Server started on port ${port}: http://localhost:${port}`);
  });
};

main();
