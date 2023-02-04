import morgan from "morgan";
import { logger } from "../logger";

export const withMorgan = morgan(":method :url :status :response-time ms", {
  stream: {
    write: (message) => logger.http(message),
  },
  skip: () => process.env.NODE_ENV === "production",
});
