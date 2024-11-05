import { logger } from "@/backend/lib";
import { getDb } from "@/backend/db/lib/get-db";
import { UserType } from "@/types/auth";

export const seedfile = async (databaseUrl: string) => {
  const { db } = getDb(databaseUrl);

  // variable created for Compass app visualization purposes
  const firstuser = await db
    .selectFrom("user")
    .select("user_id")
    .executeTakeFirstOrThrow();

  const { student_id: student_1_id } = await db
    .insertInto("student")
    .values({
      first_name: "Edna",
      last_name: "Mode",
      email: "fashion@example.com",
      grade: 1,
      assigned_case_manager_id: firstuser.user_id,
    })
    .returning("student_id")
    .executeTakeFirstOrThrow();

  const { student_id: student_2_id } = await db
    .insertInto("student")
    .values({
      first_name: "Colette",
      last_name: "Tatou",
      email: "chef@example.com",
      grade: 2,
      assigned_case_manager_id: firstuser.user_id,
    })
    .returning("student_id")
    .executeTakeFirstOrThrow();

  await db
    .insertInto("student")
    .values({
      first_name: "Carl",
      last_name: "Fredricksen",
      email: "zoo@example.com",
      grade: 5,
      assigned_case_manager_id: firstuser.user_id,
    })
    .execute();

  const { user_id } = await db
    .insertInto("user")
    .values({
      first_name: "Helen",
      last_name: "Parr",
      email: "elastic@example.com",
      role: UserType.Para,
    })
    .returning("user_id")
    .executeTakeFirstOrThrow();

  // need to assign staff member to case manager so that it appears in the Compass staff index
  await db
    .insertInto("paras_assigned_to_case_manager")
    .values({
      case_manager_id: firstuser.user_id,
      para_id: user_id,
    })
    .execute();

  const { iep_id: student_1_iep_id } = await db
    .insertInto("iep")
    .values({
      case_manager_id: firstuser.user_id,
      student_id: student_1_id,
      start_date: new Date("2024-11-05"),
      end_date: new Date("2028-12-31"),
    })
    .returning("iep_id")
    .executeTakeFirstOrThrow();

  const { iep_id: student_2_iep_id } = await db
    .insertInto("iep")
    .values({
      case_manager_id: firstuser.user_id,
      student_id: student_2_id,
      start_date: new Date("2024-11-04"),
      end_date: new Date("2028-12-30"),
    })
    .returning("iep_id")
    .executeTakeFirstOrThrow();

  const { goal_id: student_1_goal_1_id } = await db
    .insertInto("goal")
    .values({
      iep_id: student_1_iep_id,
      description: "Improve Spanish grade",
      category: "other",
    })
    .returning("goal_id")
    .executeTakeFirstOrThrow();

  const { goal_id: student_1_goal_2_id } = await db
    .insertInto("goal")
    .values({
      iep_id: student_1_iep_id,
      description: "Come to class more punctually",
      category: "other",
    })
    .returning("goal_id")
    .executeTakeFirstOrThrow();

  const { goal_id: student_2_goal_id } = await db
    .insertInto("goal")
    .values({
      iep_id: student_2_iep_id,
      description: "Organize notebook",
      category: "other",
    })
    .returning("goal_id")
    .executeTakeFirstOrThrow();

  const { benchmark_id: benchmark_student_1_goal_1_id } = await db
    .insertInto("benchmark")
    .values({
      goal_id: student_1_goal_1_id,
      status: "In Progress",
      description: "Create example sentences from vocab",
      setup: "Make Google Sheets from vocab list",
      instructions:
        "Have student create example sentences for each vocab word in Google Sheets",
      materials: "N/A",
      frequency: "Once per week",
      target_level: 60,
      baseline_level: 0,
      attempts_per_trial: 1,
      number_of_trials: 16,
      metric_name: "",
    })
    .returning("benchmark_id")
    .executeTakeFirstOrThrow();

  await db
    .insertInto("task")
    .values({
      benchmark_id: benchmark_student_1_goal_1_id,
      assignee_id: firstuser.user_id,
    })
    .execute();

  const { benchmark_id: benchmark_student_1_goal_2_id } = await db
    .insertInto("benchmark")
    .values({
      goal_id: student_1_goal_2_id,
      status: "In Progress",
      description: "Create morning schedule",
      setup: "Make Google Sheet of empty schedule",
      instructions:
        "Have student fill out schedule on Google Sheets and print it",
      materials: "N/A",
      frequency: "Once per week",
      target_level: 60,
      baseline_level: 0,
      attempts_per_trial: 1,
      number_of_trials: 16,
      metric_name: "",
    })
    .returning("benchmark_id")
    .executeTakeFirstOrThrow();

  await db
    .insertInto("task")
    .values({
      benchmark_id: benchmark_student_1_goal_2_id,
      assignee_id: firstuser.user_id,
    })
    .execute();

  const { benchmark_id: benchmark_student_2_goal_id } = await db
    .insertInto("benchmark")
    .values({
      goal_id: student_2_goal_id,
      status: "In Progress",
      description: "Consolidate new class handouts",
      setup: "N/A",
      instructions:
        "Have student write dates and sort handouts by date and class",
      materials: "Pen, folders for each class",
      frequency: "Tuesdays and Fridays",
      target_level: 80,
      baseline_level: 0,
      attempts_per_trial: 4,
      number_of_trials: 16,
      metric_name: "",
    })
    .returning("benchmark_id")
    .executeTakeFirstOrThrow();

  await db
    .insertInto("task")
    .values({
      benchmark_id: benchmark_student_2_goal_id,
      assignee_id: firstuser.user_id,
    })
    .execute();

  logger.info("Database has been seeded with test data.");
};
