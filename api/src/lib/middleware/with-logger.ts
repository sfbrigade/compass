import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";

export const withLogger = (req: Request, _: Response, next: NextFunction) => {
  if (!req.logger) {
    req.logger = logger;
  }

  next();
};
