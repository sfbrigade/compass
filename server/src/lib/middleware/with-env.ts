import { NextFunction, Request, Response } from "express";
import { Env } from "../types";

export const withEnv = (req: Request, _: Response, next: NextFunction) => {
  if (!req.env) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req.env = process.env as unknown as Env;
  }

  next();
};
