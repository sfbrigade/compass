import cors from "cors";
import express from "express";
import { withDb, withEnv } from "./lib";
import { withMorgan } from "./lib/middleware/with-morgan";
import { healthRouter } from "./routes";
import { studentsRouter } from "./routes";

// TODO(amantri): Get client port from env. Do we add this only on dev env?
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const appFactory = (app = express()) => {
  app.use(withEnv);
  app.use(withDb);
  app.use(withMorgan);
  app.use(cors(options));
  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/students", studentsRouter);

  return app;
};
