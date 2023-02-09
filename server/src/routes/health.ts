import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (req, res) => {
  res.json({
    status: "ok",
  });
});

export { healthRouter };
