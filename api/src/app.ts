import express from "express";
import { withDb, withEnv } from "./lib";
import { healthRouter } from "./routes";
import { studentsRouter } from "./routes";

const app = express();

app.use(withEnv);
app.use(withDb);

app.use("/health", healthRouter);
app.use("/students", studentsRouter);

export { app };
