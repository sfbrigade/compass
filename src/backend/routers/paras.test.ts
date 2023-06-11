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
      role: "para",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const para = await trpc.getParaById.query({ user_id });
  t.is(para.user_id, user_id);
});

test("createPara", async (t) => {
  const { trpc, db, nodemailerMock } = await getTestServer(t, {
    authenticateAs: "para",
  });

  await trpc.createPara.mutate({
    first_name: "Foo",
    last_name: "Bar",
    email: "foo.bar@email.com",
    role: "para",
  });

  t.truthy(
    await db
      .selectFrom("user")
      .where("first_name", "=", "Foo")
      .selectAll()
      .executeTakeFirst()
  );

  nodemailerMock.mock.getSentMail();
  console.log(nodemailerMock.mock.getSentMail());
  t.true(
    nodemailerMock.mock
      .getSentMail()
      .some((mail) => mail.subject.includes("confirmation"))
  );
});
