import test from "ava";
import { getTestServer } from "~/tests";

test("GET /students/list", async (t) => {
  const { axios, db } = await getTestServer();

  const { student_id } = await db
    .insertInto("student")
    .values({
      first_name: "Foo",
      last_name: "Bar",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const { data } = await axios.get("/students/list");
  t.is(data.students.length, 1);
  t.is(data.students[0].student_id, student_id);
});
