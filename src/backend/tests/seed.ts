import { KyselyDatabaseInstance } from "@/backend/lib";
import { UserType } from "@/types/auth";

export type SeedResult = Awaited<ReturnType<typeof seed>>;

export const seed = async (db: KyselyDatabaseInstance) => {
  const admin = await db
    .insertInto("user")
    .values({
      first_name: "Admin",
      last_name: "One",
      email: "admin1@example.com",
      role: UserType.Admin,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const case_manager = await db
    .insertInto("user")
    .values({
      first_name: "CaseManager",
      last_name: "One",
      email: "case_manager1@example.com",
      role: UserType.CaseManager,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const para = await db
    .insertInto("user")
    .values({
      first_name: "Para",
      last_name: "One",
      email: "para1@example.com",
      role: UserType.Para,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const student = await db
    .insertInto("student")
    .values({
      first_name: "Student",
      last_name: "One",
      email: "student1@example.com",
      grade: 12,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return {
    admin,
    case_manager,
    student,
    para,
  };
};
