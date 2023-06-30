import test from "ava";
import { getTestServer } from "@/backend/tests";

test("addGoal", async (t) => {
  const { trpc, db, seed } = await getTestServer(t, { authenticateAs: "para" });

  const tf = await trpc.student.addIep.mutate({
    student_id: seed.student.student_id,
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-12-31"),
  });

  t.truthy(
    await db
      .selectFrom("iep")
      .where("student_id", "=", seed.student.student_id)
      .selectAll()
      .executeTakeFirst()
  );
});
