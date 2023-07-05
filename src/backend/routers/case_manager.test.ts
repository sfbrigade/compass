import test from "ava";
import { getTestServer } from "@/backend/tests";

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

  const students = await trpc.case_manager.getMyStudents.query();
  t.is(students.length, 1);
  t.is(students[0].student_id, student_id);
});

test("addStudent - student doesn't exist in db", async (t) => {
  const { trpc } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const before = await trpc.case_manager.getMyStudents.query();
  t.is(before.length, 0);

  await trpc.case_manager.addStudent.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
  });

  const after = await trpc.case_manager.getMyStudents.query();
  t.is(after.length, 1);
});

test("addStudent - student exists in db", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const before = await trpc.case_manager.getMyStudents.query();
  t.is(before.length, 0);

  await trpc.case_manager.addStudent.mutate({
    first_name: seed.student.first_name,
    last_name: seed.student.last_name,
    email: seed.student.email,
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
