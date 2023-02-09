import { NextFunction, Request, Response } from "express";

export const withEnv = (req: Request, _: Response, next: NextFunction) => {
  if (!req.env) {
    req.env = process.env as any;
  }

  next();
};
