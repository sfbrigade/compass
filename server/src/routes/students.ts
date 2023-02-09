import { Router } from "express";

const studentsRouter = Router();

studentsRouter.get("/list", async (req, res) => {
  const students = await req.db.selectFrom("student").selectAll().execute();

  res.json({
    students,
  });
});

studentsRouter.post("/create", async (req, res) => {
  const {first_name, last_name, birth_year} = req.body;

  const student = await req.db
    .insertInto("student")
    .values({ first_name, last_name, birth_year })
    .returningAll()
    .executeTakeFirstOrThrow();

  res.json({
    student,
  });
})

export { studentsRouter };
