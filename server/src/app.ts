import express from "express";
import cors from "cors";
import { withDb, withEnv } from "./lib";
import { withMorgan } from "./lib/middleware/with-morgan";
import { withTrpc } from "./routes/trpc";
import { healthRouter } from "./routes";
import { studentsRouter } from "./routes";

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

  app.use("/trpc", withTrpc);
  app.use("/health", healthRouter);
  app.use("/students", studentsRouter);

  return app;
};
