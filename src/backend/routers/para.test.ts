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

test("createPara - invalid email", async (t) => {
  const { trpc } = await getTestServer(t, {
    authenticateAs: "case_manager",
  });

  await t.throwsAsync(
    trpc.para.createPara.mutate({
      first_name: "Foo",
      last_name: "Bar",
      email: "invalid-email",
    })
  );
});
