import test from "ava";
import { getTestServer } from "backend/tests";

test("getParaById", async (t) => {
  const { trpc, db } = await getTestServer(t, { authenticateAs: "para" });

  const { user_id } = await db
    .insertInto("user")
    .values({
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      role: "staff",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const para = await trpc.para.getParaById.query({ user_id });
  t.is(para.user_id, user_id);
});

test("getParaByEmail", async (t) => {
  const { trpc, db } = await getTestServer(t, { authenticateAs: "para" });

  const { email } = await db
    .insertInto("user")
    .values({
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      role: "staff",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const para = await trpc.para.getParaByEmail.query({ email });
  t.is(para.email, email);
});

test("getMyParas", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, { authenticateAs: "para" });

  await db
    .insertInto("paras_assigned_to_case_manager")
    .values({
      case_manager_id: seed.para.user_id,
      para_id: seed.paraJohn.user_id,
    })
    .execute();

  const myParas = await trpc.para.getMyParas.query();
  t.is(myParas.length, 1);
});

test("createPara", async (t) => {
  const { trpc, db, nodemailerMock } = await getTestServer(t, {
    authenticateAs: "para",
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

test("duplicateEmail", async (t) => {
  const { db } = await getTestServer(t, { authenticateAs: "para" });

  await t.throwsAsync(() => {
    return db
      .insertInto("user")
      .values({
        first_name: "Foos",
        last_name: "Bar",
        email: "john@example.com",
        role: "staff",
      })
      .execute();
  });
});

test("assignParaToCaseManager", async (t) => {
  const { trpc, seed } = await getTestServer(t, { authenticateAs: "para" });

  await trpc.para.assignParaToCaseManager.mutate({
    para_id: seed.paraJohn.user_id,
  });

  const myParas = await trpc.para.getMyParas.query();
  t.is(myParas.length, 1);
});

test("unassignPara", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, { authenticateAs: "para" });

  await db
    .insertInto("paras_assigned_to_case_manager")
    .values({
      case_manager_id: seed.para.user_id,
      para_id: seed.paraJohn.user_id,
    })
    .execute();

  let myParas = await trpc.para.getMyParas.query();
  t.is(myParas.length, 1);

  await trpc.para.unassignPara.mutate({
    para_id: seed.paraJohn.user_id,
  });

  myParas = await trpc.para.getMyParas.query();
  t.is(myParas.length, 0);
});
