import test from "ava";
import { getTestServer } from "@/backend/tests";
import { parseISO } from "date-fns";
import { UserType } from "@/types/auth";

test("getStudentById - can query by student id", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
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

test("getStudentById - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.student.getStudentById.query({ student_id: "student_id" });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});

// TODO: This test looks to be testing the `UNIQUE` constraing on the schema.
// Improve this test
test("doNotAddDuplicateEmails", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
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
    authenticateAs: UserType.CaseManager,
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

test("addIep - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.student.addIep.mutate({
      student_id: "student_id",
      start_date: new Date("2023-01-01"),
      end_date: new Date("2023-01-01"),
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});

test("getIeps - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.student.getIeps.query({
      student_id: "student_id",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});

test("editIep", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  // * must add student this way to populate the assigned_case_manager_id
  await trpc.case_manager.addStudent.mutate({
    first_name: seed.student.first_name,
    last_name: seed.student.last_name,
    email: seed.student.email,
    grade: seed.student.grade,
  });

  const myStudents = await trpc.case_manager.getMyStudents.query();
  const student_id = myStudents[0].student_id;

  const iep = await trpc.student.addIep.mutate({
    student_id: student_id,
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
  });

  let got = await trpc.student.getIeps.query({
    student_id: student_id,
  });

  t.is(got.length, 1);
  t.is(got[0].student_id, iep.student_id);
  t.deepEqual(got[0].start_date, iep.start_date);
  t.deepEqual(got[0].end_date, iep.end_date);

  const updated_start_date = new Date(parseISO("2023-03-02"));
  const updated_end_date = new Date(parseISO("2024-03-01"));

  await trpc.student.editIep.mutate({
    student_id: student_id,
    start_date: updated_start_date,
    end_date: updated_end_date,
  });

  got = await trpc.student.getIeps.query({
    student_id: student_id,
  });

  t.is(got.length, 1);
  t.is(got[0].student_id, student_id);
  t.notDeepEqual(got[0].start_date, iep.start_date);
  t.notDeepEqual(got[0].end_date, iep.end_date);
  t.deepEqual(got[0].start_date, updated_start_date);
  t.deepEqual(got[0].end_date, updated_end_date);
});

test("editIep - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.student.editIep.mutate({
      student_id: "student_id",
      start_date: new Date(parseISO("2023-03-02")),
      end_date: new Date(parseISO("2023-03-02")),
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});

test("getActiveStudentIep - return only one iep object", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
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

test("getActiveStudentIep - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.student.getActiveStudentIep.query({
      student_id: "student_id",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message"
  );
});

test("checkAddedIEPEndDates", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });
  const start_date = new Date("2023-01-01");
  const end_date = new Date("2022-01-01");

  await t.throwsAsync(async () => {
    await trpc.student.addIep.mutate({
      student_id: seed.student.student_id,
      start_date: start_date,
      end_date: end_date,
    });
  });

  const got = await trpc.student.getIeps.query({
    student_id: seed.student.student_id,
  });

  t.is(got.length, 0);
});

test("checkEditedIEPEndDates", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  await trpc.case_manager.addStudent.mutate({
    first_name: seed.student.first_name,
    last_name: seed.student.last_name,
    email: seed.student.email,
    grade: seed.student.grade,
  });

  const myStudents = await trpc.case_manager.getMyStudents.query();
  const student_id = myStudents[0].student_id;

  const iep = await trpc.student.addIep.mutate({
    student_id: student_id,
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
  });

  let got = await trpc.student.getIeps.query({
    student_id: student_id,
  });

  t.is(got.length, 1);
  t.is(got[0].student_id, iep.student_id);
  t.deepEqual(got[0].start_date, iep.start_date);
  t.deepEqual(got[0].end_date, iep.end_date);

  const updated_start_date = new Date(parseISO("2023-01-01"));
  const updated_end_date = new Date(parseISO("2022-01-01"));
  await t.throwsAsync(async () => {
    await trpc.student.editIep.mutate({
      student_id: student_id,
      start_date: updated_start_date,
      end_date: updated_end_date,
    });
  });

  got = await trpc.student.getIeps.query({
    student_id: student_id,
  });

  t.is(got.length, 1);
  t.is(got[0].student_id, iep.student_id);
  t.deepEqual(got[0].start_date, iep.start_date);
  t.deepEqual(got[0].end_date, iep.end_date);
});
