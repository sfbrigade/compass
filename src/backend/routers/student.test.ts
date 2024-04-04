import test from "ava";
import { getTestServer } from "@/backend/tests";
import { parseISO } from "date-fns";

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
      grade: 6,
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
      grade: 6,
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
        grade: 6,
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

test("editIep", async (t) => {
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

  const updated_start_date = "2023-03-02";
  const updated_end_date = "2024-03-01";

  console.log({
    inputs: { updated_start_date, updated_end_date },
  });

  await trpc.student.editIep.mutate({
    student_id: seed.student.student_id,
    first_name: seed.student.first_name,
    last_name: seed.student.last_name,
    grade: seed.student.grade,
    email: seed.student.email,
    start_date: updated_start_date,
    end_date: updated_end_date,
  });

  const editedStudent = await trpc.student.getStudentById.query({
    student_id: seed.student.student_id,
  });

  const editedIep = await trpc.student.getIeps.query({
    student_id: seed.student.student_id,
  });

  t.is(editedStudent?.student_id, seed.student.student_id);
  t.is(editedStudent?.first_name, seed.student.first_name);
  t.is(editedStudent?.last_name, seed.student.last_name);
  t.is(editedStudent?.email, seed.student.email);
  t.is(editedStudent?.grade, seed.student.grade);
  t.is(editedIep.length, 1);
  t.deepEqual(editedIep[0].start_date, parseISO(updated_start_date));
  t.deepEqual(editedIep[0].end_date, parseISO(updated_end_date));
});

test("getActiveStudentIep - return only one iep object", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const start_date = new Date("2023-01-01");
  const end_date = new Date("2023-12-31");

  const addedIep = await trpc.student.addIep.mutate({
    student_id: seed.student.student_id,
    start_date: start_date,
    end_date: end_date,
  });

  const studentWithIep = await trpc.student.getActiveStudentIep.query({
    student_id: seed.student.student_id,
  });

  t.deepEqual(typeof studentWithIep, "object");
  t.is(studentWithIep?.student_id, seed.student.student_id);
  t.deepEqual(studentWithIep?.start_date, addedIep.start_date);
  t.deepEqual(studentWithIep?.end_date, addedIep.end_date);
});
