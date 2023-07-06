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

// TODO: This test looks to be testing the `UNIQUE` constraing on the schema.
// Improve this test
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

  const students = await trpc.case_manager.getMyStudents.query();
  t.is(students.length, 1);
});

test("addIep and getIep", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const start_date = new Date("2023-01-01");
  const end_date = new Date("2023-12-31");

  const added = await trpc.student.addIep.mutate({
    student_id: seed.student.student_id,
    start_date: start_date,
    end_date: end_date,
  });

  const got = await trpc.student.getIeps.query({
    student_id: seed.student.student_id,
  });

  t.is(got.length, 1);
  t.is(got[0].student_id, seed.student.student_id);
  t.deepEqual(got[0].start_date, added.start_date);
  t.deepEqual(got[0].end_date, added.end_date);
});
