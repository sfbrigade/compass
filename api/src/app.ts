import express from "express";
import { healthRouter } from "./routes";

const app = express();

app.use("/health", healthRouter);

export { app };
