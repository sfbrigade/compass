import { NextFunction, Request, Response } from "express";

export const withEnv = (req: Request, _: Response, next: NextFunction) => {
  if (!(req as any).env) {
    (req as any).env = process.env;
  }

  next();
};
