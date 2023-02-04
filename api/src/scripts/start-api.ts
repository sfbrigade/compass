import { app } from "~/app";
import { loadEnvFromFile, logger } from "~/lib";

const main = () => {
  loadEnvFromFile();

  app.listen(8080, () => {
    logger.info("Server started on port 8080");
  });
};

main();
