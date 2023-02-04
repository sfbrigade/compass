import { NextFunction, Request, Response } from "express";
import { getDb } from "~/db/lib/get-db";

export const withDb = (req: Request, _: Response, next: NextFunction) => {
  if (!req.db) {
    const { db } = getDb(req.env.DATABASE_URL);
    req.db = db;
  }

  if (!req.pool) {
    const { pool } = getDb(req.env.DATABASE_URL);
    req.pool = pool;
  }

  next();
};
