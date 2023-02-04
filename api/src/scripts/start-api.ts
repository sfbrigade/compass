import { app } from "~/app";
import { logger } from "~/lib";

const main = () => {
  app.listen(8080, () => {
    logger.info("Server started on port 8080");
  });
};

main();
