import test from "ava";
import { getTestServer } from "backend/tests";

// test("getParaById", async (t) => {
//   const { trpc, db } = await getTestServer(t, { authenticateAs: "para" });

//   const { user_id } = await db
//     .insertInto("user")
//     .values({
//       first_name: "John",
//       last_name: "Doe",
//       email: "john.doe@example.com",
//       role: "staff",
//     })
//     .returningAll()
//     .executeTakeFirstOrThrow();

//   const para = await trpc.para.getParaById.query({ user_id });
//   t.is(para.user_id, user_id);
// });

// test("createPara", async (t) => {
//   const { trpc, db, nodemailerMock } = await getTestServer(t, {
//     authenticateAs: "para",
//   });

//   await trpc.para.createPara.mutate({
//     first_name: "Foo",
//     last_name: "Bar",
//     email: "foo.bar@email.com",
//     role: "staff",
//   });

//   t.truthy(
//     await db
//       .selectFrom("user")
//       .where("first_name", "=", "Foo")
//       .selectAll()
//       .executeTakeFirst()
//   );

//   t.true(
//     nodemailerMock.mock
//       .getSentMail()
//       .some((mail) => mail.subject?.includes("confirmation"))
//   );
// });

// test("getParaById", async (t) => {
//   const { trpc, seed } = await getTestServer(t, { authenticateAs: "admin" });

//   const para = await trpc.getParaById.query({ user_id: seed.para.user_id });
//   t.is(para.user_id, seed.para.user_id);
// });

// test("getMyParas", async (t) => {
//   const { trpc, db, seed } = await getTestServer(t, {
//     authenticateAs: "admin",
//   });

//   let myParas = await trpc.getMyParas.query();
//   t.is(myParas.length, 0);

//   await db
//     .insertInto("paras_assigned_to_case_manager")
//     .values({ case_manager_id: seed.admin.user_id, para_id: seed.para.user_id })
//     .execute();

//   myParas = await trpc.getMyParas.query();
//   t.is(myParas.length, 1);
//   t.is(myParas[0].user_id, seed.para.user_id);
// });

// test("createParaAndAddToRelationalTable", async (t) => {
//   const { trpc, db } = await getTestServer(t, { authenticateAs: "admin" });

//   t.falsy(
//     await db
//       .selectFrom("user")
//       .where("email", "=", "foo.bar@email.com")
//       .selectAll()
//       .executeTakeFirst()
//   );

//   await trpc.createParaAndAssignCaseManager.mutate({
//     first_name: "Foo",
//     last_name: "Bar",
//     email: "foo.bar@email.com",
//   });

//   t.truthy(
//     await db
//       .selectFrom("user")
//       .where("email", "=", "foo.bar@email.com")
//       .selectAll()
//       .executeTakeFirst()
//   );

//   const myParas = await trpc.getMyParas.query();
//   t.is(myParas.length, 1);
// });

// test("assignParaAlreadyInDBToCaseManager", async (t) => {
//   const { trpc, db } = await getTestServer(t, { authenticateAs: "admin" });

//   t.truthy(
//     await db
//       .selectFrom("user")
//       .where("email", "=", "emily@example.com")
//       .selectAll()
//       .executeTakeFirst()
//   );

//   let myParas = await trpc.getMyParas.query();
//   t.is(myParas.length, 0);

//   await trpc.createParaAndAssignCaseManager.mutate({
//     first_name: "Emily",
//     last_name: "Smith",
//     email: "emily@example.com",
//   });

//   myParas = await trpc.getMyParas.query();
//   t.is(myParas.length, 1);
// });

// test("doNotAddDuplicateParaEmails", async (t) => {
//   const { db } = await getTestServer(t, {
//     authenticateAs: "admin",
//   });

//   await t.throwsAsync(() => {
//     return db
//       .insertInto("user")
//       .values({
//         first_name: "Emily",
//         last_name: "Smith",
//         email: "emily@example.com",
//         role: "para",
//       })
//       .execute();
//   });
// });

// test("unassignPara", async (t) => {
//   const { trpc } = await getTestServer(t, {
//     authenticateAs: "admin",
//   });

//   await trpc.createParaAndAssignCaseManager.mutate({
//     first_name: "Foo",
//     last_name: "Bar",
//     email: "foo.bar@email.com",
//   });

//   let myParas = await trpc.getMyParas.query();
//   t.is(myParas.length, 1);

//   await trpc.unassignPara.mutate({
//     para_id: myParas[0].user_id,
//   });

//   myParas = await trpc.getMyParas.query();
//   t.is(myParas.length, 0);
// });
