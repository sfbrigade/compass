import test from "ava";
import { getTestServer } from "~/tests";

test("getStudentById", async (t) => {
  const { trpc, db } = await getTestServer();

  const { student_id } = await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const student = await trpc.getStudentById.query({ student_id });
  t.is(student.student_id, student_id);
});

test("getAllStudents", async (t) => {
  const { trpc, db } = await getTestServer();

  const { student_id } = await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const students = await trpc.getAllStudents.query();
  t.is(students.length, 1);
  t.is(students[0].student_id, student_id);
});

test("createStudent", async (t) => {
  const { trpc, db } = await getTestServer();

  await trpc.createStudent.mutate({
    first_name: "Foo",
    last_name: "Bar",
  });

  t.truthy(
    await db
      .selectFrom("student")
      .where("first_name", "=", "Foo")
      .selectAll()
      .executeTakeFirst()
  );
});
