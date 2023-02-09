import express from "express";
import { withDb, withEnv } from "./lib";
import { withMorgan } from "./lib/middleware/with-morgan";
import { healthRouter } from "./routes";
import { studentsRouter } from "./routes";

export const appFactory = (app = express()) => {
  app.use(withEnv);
  app.use(withDb);
  app.use(withMorgan);
  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/students", studentsRouter);

  return app;
};
