import test from "ava";
import { getTestServer } from "@/backend/tests";

test("getStudentById", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const { student_id } = await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      assigned_case_manager_id: seed.case_manager.user_id,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const student = await trpc.student.getStudentById.query({ student_id });
  t.is(student?.student_id, student_id);
});

test("getMyStudents", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const { student_id } = await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      assigned_case_manager_id: seed.case_manager.user_id,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const students = await trpc.student.getMyStudents.query();
  t.is(students.length, 1);
  t.is(students[0].student_id, student_id);
});

test("createStudent", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  await trpc.student.createStudentOrAssignManager.mutate({
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

test("doNotAddDuplicateEmails", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      assigned_case_manager_id: seed.case_manager.user_id,
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

  const students = await trpc.student.getMyStudents.query();
  t.is(students.length, 1);
});

test("assignCaseManager", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      assigned_case_manager_id: seed.case_manager.user_id,
    })
    .execute();

  let students = await trpc.student.getMyStudents.query();
  t.is(students.length, 1);

  await db
    .updateTable("student")
    .set({ assigned_case_manager_id: null })
    .where("email", "=", "foo.bar@email.com")
    .execute();

  students = await trpc.student.getMyStudents.query();
  t.is(students.length, 0);

  await trpc.student.createStudentOrAssignManager.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
  });

  students = await trpc.student.getMyStudents.query();
  t.is(students.length, 1);
});

test("unassignStudent", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const { student_id } = await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      assigned_case_manager_id: seed.case_manager.user_id,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  await trpc.student.unassignStudent.mutate({
    student_id,
  });

  const students = await trpc.student.getMyStudents.query();
  t.is(students.length, 0);
});

test("addIep", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, { authenticateAs: "para" });

  const tf = await trpc.student.addIep.mutate({
    student_id: seed.student.student_id,
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
  });

  t.truthy(
    await db
      .selectFrom("iep")
      .where("student_id", "=", seed.student.student_id)
      .selectAll()
      .executeTakeFirst()
  );
});
