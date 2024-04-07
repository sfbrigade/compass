import test from "ava";
import { getTestServer } from "@/backend/tests";
import { constants } from "fs";

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
      grade: 6,
      assigned_case_manager_id: seed.case_manager.user_id,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const myStudents = await trpc.case_manager.getMyStudents.query();
  t.is(myStudents.length, 1);
  t.is(myStudents[0].student_id, student_id);
});

test("getMyStudentsAndIepInfo - student does not have IEP", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const student = await db
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

  const myStudents = await trpc.case_manager.getMyStudentsAndIepInfo.query();
  t.is(myStudents.length, 1);
  t.is(myStudents[0].student_id, student.student_id);
  t.is(myStudents[0].iep_id, null);
  t.is(myStudents[0].end_date, null);
});

test("getMyStudentsAndIepInfo - student has IEP", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  await trpc.case_manager.addStudent.mutate({
    first_name: seed.student.first_name,
    last_name: seed.student.last_name,
    email: seed.student.email,
    grade: seed.student.grade,
  });

  const myStudentsBefore =
    await trpc.case_manager.getMyStudentsAndIepInfo.query();
  t.is(myStudentsBefore[0].iep_id, null);
  t.is(myStudentsBefore[0].end_date, null);

  const iep = await trpc.student.addIep.mutate({
    student_id: seed.student.student_id,
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
  });

  const myStudentsAfter =
    await trpc.case_manager.getMyStudentsAndIepInfo.query();
  t.is(myStudentsAfter[0].iep_id, iep.iep_id);
  t.deepEqual(myStudentsAfter[0].end_date, iep.end_date);
});

test("addStudent - student doesn't exist in db", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const myStudentsBefore = await trpc.case_manager.getMyStudents.query();
  t.is(myStudentsBefore.length, 0);
  t.falsy(
    await db
      .selectFrom("student")
      .where("first_name", "=", "Foo")
      .selectAll()
      .executeTakeFirst()
  );

  await trpc.case_manager.addStudent.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
    grade: 6,
  });

  const myStudentsAfter = await trpc.case_manager.getMyStudents.query();
  t.is(myStudentsAfter.length, 1);
});

test("addStudent - student exists in db", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const before = await trpc.case_manager.getMyStudents.query();
  t.is(before.length, 0);
  t.truthy(
    await db
      .selectFrom("student")
      .where("first_name", "=", seed.student.first_name)
      .selectAll()
      .executeTakeFirst()
  );

  await trpc.case_manager.addStudent.mutate({
    first_name: seed.student.first_name,
    last_name: seed.student.last_name,
    email: seed.student.email,
    grade: seed.student.grade,
  });

  const after = await trpc.case_manager.getMyStudents.query();
  t.is(after.length, 1);

  t.truthy(
    await db
      .selectFrom("student")
      .where("student_id", "=", seed.student.student_id)
      .where("assigned_case_manager_id", "=", seed.case_manager.user_id)
      .selectAll()
      .executeTakeFirstOrThrow()
  );
});

test("addStudent - invalid email", async (t) => {
  const { trpc } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  await t.throwsAsync(
    trpc.case_manager.addStudent.mutate({
      first_name: "Foo",
      last_name: "Bar",
      email: "invalid-email",
      grade: 6,
    })
  );
});

test("removeStudent", async (t) => {
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

  const before = await trpc.case_manager.getMyStudents.query();
  t.is(before.length, 1);

  await trpc.case_manager.removeStudent.mutate({
    student_id,
  });

  const after = await trpc.case_manager.getMyStudents.query();
  t.is(after.length, 0);
});

test("getMyParas", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  let myParas = await trpc.case_manager.getMyParas.query();
  t.is(myParas.length, 0);

  await db
    .insertInto("paras_assigned_to_case_manager")
    .values({
      case_manager_id: seed.case_manager.user_id,
      para_id: seed.para.user_id,
    })
    .execute();

  myParas = await trpc.case_manager.getMyParas.query();
  t.is(myParas.length, 1);
});

test("addStaff", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const parasBeforeAdd = await trpc.case_manager.getMyParas.query();
  t.is(parasBeforeAdd.length, 0);

  const newParaData = {
    first_name: "Staffy",
    last_name: "Para",
    email: "sp@gmail.com",
  };

  await trpc.case_manager.addStaff.mutate(newParaData);

  const parasAfterAdd = await trpc.case_manager.getMyParas.query();
  t.is(parasAfterAdd.length, 1);

  const createdPara = parasAfterAdd[0];
  t.is(createdPara.first_name, newParaData.first_name);
  t.is(createdPara.last_name, newParaData.last_name);
  t.is(createdPara.email, newParaData.email);
});

test("addPara", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  let myParas = await trpc.case_manager.getMyParas.query();
  t.is(myParas.length, 0);

  await trpc.case_manager.addPara.mutate({
    para_id: seed.para.user_id,
  });

  myParas = await trpc.case_manager.getMyParas.query();
  t.is(myParas.length, 1);
});

test("removePara", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  await db
    .insertInto("paras_assigned_to_case_manager")
    .values({
      case_manager_id: seed.case_manager.user_id,
      para_id: seed.para.user_id,
    })
    .execute();

  let myParas = await trpc.case_manager.getMyParas.query();
  t.is(myParas.length, 1);

  await trpc.case_manager.removePara.mutate({
    para_id: seed.para.user_id,
  });

  myParas = await trpc.case_manager.getMyParas.query();
  t.is(myParas.length, 0);
});
