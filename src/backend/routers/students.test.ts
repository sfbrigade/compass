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

  const students = await trpc.getMyStudents.query();
  t.is(students.length, 1);
  t.is(students[0].student_id, student_id);
});

test("createStudent", async (t) => {
  const { trpc, db } = await getTestServer(t, { authenticateAs: "para" });

  await trpc.createStudentOrAssignManager.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
  });

  t.truthy(
    await db
      .selectFrom("student")
      .where("first_name", "=", "Foo")
      .selectAll()
      .executeTakeFirst()
  );
});

// create test for reassigning case manager

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
    .execute();

  await t.throwsAsync(() => {
    return db
      .insertInto("student")
      .values({
        first_name: "Foos",
        last_name: "Bar",
        email: "foo.bar@email.com",
        assigned_case_manager_id: seed.para.user_id,
      })
      .execute();
  });

  const students = await trpc.getMyStudents.query();
  t.is(students.length, 1);
});

test("unassignStudent", async (t) => {
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

  await trpc.unassignStudent.mutate({
    student_id,
  });

  const students = await trpc.getMyStudents.query();
  t.is(students.length, 0);
});
