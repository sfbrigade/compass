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

  const { data } = await axios.get<{ students: { student_id: string }[] }>(
    "/students/list"
  );
  t.is(data.students.length, 1);
  t.is(data.students[0].student_id, student_id);
});

test("POST /students/create", async (t) => {
  const { axios } = await getTestServer();

  const { data } = await axios.post<{ student: { student_id: string } }>(
    "/students/create",
    {
      first_name: "Foo",
      last_name: "Bar",
    }
  );

  t.truthy(data.student.student_id);
});
