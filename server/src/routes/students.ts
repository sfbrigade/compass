import { Router } from "express";

const studentsRouter = Router();

studentsRouter.get("/list", async (req, res) => {
  const students = await req.db.selectFrom("student").selectAll().execute();

  res.json({
    students,
  });
});

interface CreateStudentBody {
  first_name: string;
  last_name: string;
  email: string;
}

studentsRouter.post("/create", async (req, res) => {
  const { first_name, last_name, email } = req.body as CreateStudentBody;

  const student = await req.db
    .insertInto("student")
    .values({ first_name, last_name, email })
    .returningAll()
    .executeTakeFirstOrThrow();

  res.json({
    student,
  });
});

export { studentsRouter };
