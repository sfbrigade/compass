import test from "ava";
import { getTestServer } from "@/backend/tests";

test("getParaById", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const { user_id } = await db
    .insertInto("user")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      role: "staff",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const para = await trpc.para.getParaById.query({ user_id });
  t.is(para?.user_id, user_id);
});

test("getParaByEmail", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  const { email } = await db
    .insertInto("user")
    .values({
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@email.com",
      role: "staff",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const para = await trpc.para.getParaByEmail.query({ email });
  t.is(para?.email, email);
});

test("getMyParas", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  let myParas = await trpc.para.getMyParas.query();
  t.is(myParas.length, 0);

  await db
    .insertInto("paras_assigned_to_case_manager")
    .values({
      case_manager_id: seed.case_manager.user_id,
      para_id: seed.para.user_id,
    })
    .execute();

  myParas = await trpc.para.getMyParas.query();
  t.is(myParas.length, 1);
});

test("createPara", async (t) => {
  const { trpc, db, nodemailerMock } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  await trpc.para.createPara.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
  });

  t.truthy(
    await db
      .selectFrom("user")
      .where("first_name", "=", "Foo")
      .selectAll()
      .executeTakeFirst()
  );

  t.true(
    nodemailerMock.mock
      .getSentMail()
      .some((mail) => mail.subject?.includes("confirmation"))
  );
});

test("paras are deduped by email", async (t) => {
  const { trpc, db } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  t.falsy(await trpc.para.getParaByEmail.query({ email: "foo.bar@email.com" }));

  await trpc.para.createPara.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
  });

  await trpc.para.createPara.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
  });

  const para = await db
    .selectFrom("user")
    .where("email", "=", "foo.bar@email.com")
    .selectAll()
    .execute();

  t.is(para.length, 1);
});

test("assignParaToCaseManager", async (t) => {
  const { trpc, seed } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  let myParas = await trpc.para.getMyParas.query();
  t.is(myParas.length, 0);

  await trpc.para.assignParaToCaseManager.mutate({
    para_id: seed.para.user_id,
  });

  myParas = await trpc.para.getMyParas.query();
  t.is(myParas.length, 1);
});

test("unassignPara", async (t) => {
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

  let myParas = await trpc.para.getMyParas.query();
  t.is(myParas.length, 1);

  await trpc.para.unassignPara.mutate({
    para_id: seed.para.user_id,
  });

  myParas = await trpc.para.getMyParas.query();
  t.is(myParas.length, 0);
});
