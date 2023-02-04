import { Router } from "express";

const studentsRouter = Router();

studentsRouter.get("/list", async (req, res) => {
  const students = await req.db.selectFrom("student").selectAll().execute();

  res.json({
    students,
  });
});

export { studentsRouter };
