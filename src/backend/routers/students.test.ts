import test from "ava";
import { getTestServer } from "backend/tests";

test("getStudentById", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, { authenticateAs: "para" });

  const { student_id } = await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      assigned_case_manager_id: seed.para.user_id,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const student = await trpc.getStudentById.query({ student_id });
  t.is(student.student_id, student_id);
});

test("getMyStudents", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, { authenticateAs: "para" });

  const { student_id } = await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      assigned_case_manager_id: seed.para.user_id,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const students = await trpc.getMyStudents.query({
    assigned_case_manager_id: seed.para.user_id,
  });
  t.is(students.length, 1);
  t.is(students[0].student_id, student_id);
});

test("createStudent", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, { authenticateAs: "para" });

  await trpc.createStudent.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
    assigned_case_manager_id: seed.para.user_id,
  });

  t.truthy(
    await db
      .selectFrom("student")
      .where("first_name", "=", "Foo")
      .selectAll()
      .executeTakeFirst()
  );
});

test("doNotAddDuplicateEmails", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, { authenticateAs: "para" });

  await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      assigned_case_manager_id: seed.para.user_id,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  await t.throwsAsync(() => {
    return trpc.createStudent.mutate({
      first_name: "Foos",
      last_name: "Bar",
      email: "foo.bar@email.com",
      assigned_case_manager_id: seed.para.user_id,
    });
  });

  const students = await trpc.getMyStudents.query({
    assigned_case_manager_id: seed.para.user_id,
  });
  t.is(students.length, 1);
});
