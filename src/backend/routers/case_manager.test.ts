import test from "ava";
import { getTestServer } from "@/backend/tests";

import {
  STUDENT_ASSIGNED_TO_YOU_ERR,
  STUDENT_ALREADY_ASSIGNED_ERR,
} from "@/backend/lib/db_helpers/case_manager";
import { UserType } from "@/types/auth";

test("getMyStudents - can fetch students", async (t) => {
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

  const myStudents = await trpc.case_manager.getMyStudents.query();
  t.is(myStudents.length, 1);
  t.is(myStudents[0].student_id, student_id);
});

test("getMyStudents - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.case_manager.getMyStudents.query();
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message",
  );
});

test("getMyStudentsAndIepInfo - student does not have IEP", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
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
    authenticateAs: UserType.CaseManager,
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

test("getMyStudentsAndIepInfo - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.case_manager.getMyStudentsAndIepInfo.query();
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message",
  );
});

test("addStudent - student doesn't exist in db", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const myStudentsBefore = await trpc.case_manager.getMyStudents.query();
  t.is(myStudentsBefore.length, 0);
  t.falsy(
    await db
      .selectFrom("student")
      .where("first_name", "=", "Foo")
      .selectAll()
      .executeTakeFirst(),
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

test("addStudent - student exists in db but is unassigned", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const before = await trpc.case_manager.getMyStudents.query();
  t.is(before.length, 0);
  t.truthy(
    await db
      .selectFrom("student")
      .where("first_name", "=", seed.student.first_name)
      .selectAll()
      .executeTakeFirst(),
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
      .executeTakeFirstOrThrow(),
  );
});

test("addStudent - student exists in db and is already assigned to user", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const studentsBefore = await trpc.case_manager.getMyStudents.query();
  t.is(studentsBefore.length, 0);

  await trpc.case_manager.addStudent.mutate({
    first_name: seed.student.first_name,
    last_name: seed.student.last_name,
    email: seed.student.email,
    grade: seed.student.grade,
  });

  const studentsAfter = await trpc.case_manager.getMyStudents.query();
  t.is(studentsAfter.length, 1);

  // this should be a duplicate operation, student's email should already be assigned to this user
  const err = await t.throwsAsync(
    trpc.case_manager.addStudent.mutate({
      first_name: seed.student.first_name,
      last_name: seed.student.last_name,
      email: seed.student.email,
      grade: seed.student.grade,
    }),
  );

  t.is(err?.message, STUDENT_ASSIGNED_TO_YOU_ERR.message);
});

test("addStudent - student exists in db but is assigned to another case manager", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const studentsBefore = await trpc.case_manager.getMyStudents.query();
  t.is(studentsBefore.length, 0);

  // create alternative case manager
  const fakeCM = await db
    .insertInto("user")
    .values({
      first_name: "Fake",
      last_name: "CM",
      role: UserType.Admin,
      email: "fakecm@test.com",
    })
    .returningAll()
    .executeTakeFirst();

  t.truthy(fakeCM?.user_id);

  const newStudent = {
    first_name: "New",
    last_name: "Student",
    email: "ns@gmail.com",
    grade: 1,
    assigned_case_manager_id: fakeCM!.user_id,
  };

  const studentCheck = await db
    .selectFrom("student")
    .selectAll()
    .where("email", "=", newStudent.email)
    .execute();

  t.is(studentCheck.length, 0);

  // assign student to new case manager
  await db.insertInto("student").values(newStudent).execute();

  // this student's email should already be assigned to the alternative case manager
  const err = await t.throwsAsync(
    trpc.case_manager.addStudent.mutate({
      first_name: newStudent.first_name,
      last_name: newStudent.last_name,
      email: newStudent.email,
      grade: newStudent.grade,
    }),
  );

  t.is(err?.message, STUDENT_ALREADY_ASSIGNED_ERR.message);

  // reassign student to user
  await db
    .updateTable("student")
    .set({ assigned_case_manager_id: seed.case_manager.user_id })
    .where("email", "=", newStudent.email)
    .returningAll()
    .execute();

  // perform redundant assignment to user
  const redundantErr = await t.throwsAsync(
    trpc.case_manager.addStudent.mutate({
      first_name: newStudent.first_name,
      last_name: newStudent.last_name,
      email: newStudent.email,
      grade: newStudent.grade,
    }),
  );

  t.is(redundantErr?.message, STUDENT_ASSIGNED_TO_YOU_ERR.message);
});

test("addStudent - invalid email", async (t) => {
  const { trpc } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  const err = await t.throwsAsync(
    trpc.case_manager.addStudent.mutate({
      first_name: "Foo",
      last_name: "Bar",
      email: "invalid-email",
      grade: 6,
    }),
  );
  // should be zod error
  t.is(typeof err?.message, "string");
  const parsed = (JSON.parse(err?.message) || []) as Array<{
    [index: string]: string;
  }>;
  if (parsed instanceof Array && parsed.length > 0) {
    t.deepEqual(parsed[0], {
      validation: "email",
      code: "invalid_string",
      message: "Invalid email",
      path: ["email"],
    });
  } else {
    t.fail();
  }
});

test("addStudent - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.case_manager.addStudent.mutate({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo@bar.com",
      grade: 6,
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message",
  );
});

test("removeStudent", async (t) => {
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

  const before = await trpc.case_manager.getMyStudents.query();
  t.is(before.length, 1);

  await trpc.case_manager.removeStudent.mutate({
    student_id,
  });

  const after = await trpc.case_manager.getMyStudents.query();
  t.is(after.length, 0);
});

test("removeStudent - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.case_manager.removeStudent.mutate({
      student_id: "student_id",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message",
  );
});

test("getMyParas", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
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

test("getMyParas - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.case_manager.getMyParas.query();
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message",
  );
});

test("addStaff", async (t) => {
  const { trpc } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
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

test("addStaff - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.case_manager.addStaff.mutate({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo@bar.com",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message",
  );
});

test("addPara", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
  });

  let myParas = await trpc.case_manager.getMyParas.query();
  t.is(myParas.length, 0);

  await trpc.case_manager.addPara.mutate({
    para_id: seed.para.user_id,
  });

  myParas = await trpc.case_manager.getMyParas.query();
  t.is(myParas.length, 1);
});

test("addPara - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.case_manager.addPara.mutate({
      para_id: "para_id",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message",
  );
});

test("removePara", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: UserType.CaseManager,
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

test("removePara - paras do not have access", async (t) => {
  const { trpc } = await getTestServer(t, { authenticateAs: UserType.Para });

  const error = await t.throwsAsync(async () => {
    await trpc.case_manager.removePara.mutate({
      para_id: "para_id",
    });
  });

  t.is(
    error?.message,
    "UNAUTHORIZED",
    "Expected an 'unauthorized' error message",
  );
});
