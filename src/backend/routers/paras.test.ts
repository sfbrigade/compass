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

  const para = await trpc.getParaById.query({ user_id });
  t.is(para.user_id, user_id);
});
