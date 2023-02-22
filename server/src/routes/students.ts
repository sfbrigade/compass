import { Router } from "express";

const studentsRouter = Router();

studentsRouter.get("/list", async (req, res) => {
  const students = await req.db.selectFrom("students").selectAll().execute();

  res.json({
    students,
  });
});

studentsRouter.post("/create", async (req, res) => {
  const { first_name, last_name } = req.body;

  const student = await req.db
    .insertInto("students")
    .values({ first_name, last_name })
    .returningAll()
    .executeTakeFirstOrThrow();

  res.json({
    student,
  });
});

export { studentsRouter };
