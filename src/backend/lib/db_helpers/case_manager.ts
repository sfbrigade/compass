import { Env } from "@/backend/lib/types";
import { KyselyDatabaseInstance } from "@/backend/lib";
import { getTransporter } from "@/backend/lib/nodemailer";
import { user } from "zapatos/schema";
import { UserType } from "@/types/auth";

interface paraInputProps {
  first_name: string;
  last_name: string;
  email: string;
}

/**
 * Checks for the existence of a user with the given email, if
 * they do not exist, create the user with the role of "para",
 * initiate email sending without awaiting result
 */
export async function createPara(
  para: paraInputProps,
  db: KyselyDatabaseInstance,
  case_manager_name: string,
  from_email: string,
  to_email: string,
  env: Env
): Promise<user.Selectable> {
  const { first_name, last_name, email } = para;

  let paraData = await db
    .selectFrom("user")
    .where("email", "=", email.toLowerCase())
    .selectAll()
    .executeTakeFirst();

  if (!paraData) {
    paraData = await db
      .insertInto("user")
      .values({
        first_name,
        last_name,
        email: email.toLowerCase(),
        role: UserType.Para,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // promise, will not interfere with returning paraData
    void sendInviteEmail(
      from_email,
      to_email,
      first_name,
      case_manager_name,
      env
    );
  }

  return paraData;
}

/**
 * Sends an invitation email to a para
 */
export async function sendInviteEmail(
  fromEmail: string,
  toEmail: string,
  first_name: string,
  case_manager_name: string,
  env: Env
): Promise<void> {
  await getTransporter(env).send({
    message: {
      from: fromEmail,
      to: toEmail,
    },
    template: "invite_para",
    locals: {
      case_manager_name,
      first_name,
    },
  });
  return;
}

/**
 * Takes a given user (para), another user (cm), and a Kysely database,
 * creates a link between the users in the database's
 * "paras_assigned_to_case_manager" table
 */
export async function assignParaToCaseManager(
  para_id: string,
  case_manager_id: string,
  db: KyselyDatabaseInstance
): Promise<void> {
  await db
    .insertInto("paras_assigned_to_case_manager")
    .values({ case_manager_id, para_id })
    .execute();

  return;
}

type createStudentProps = {
  first_name: string;
  last_name: string;
  email?: string | null | undefined;
  grade: number;
  db: KyselyDatabaseInstance;
  userId: string;
};

export const STUDENT_ASSIGNED_TO_YOU_ERR = new Error(
  "This student is already assigned to you"
);
export const STUDENT_ALREADY_ASSIGNED_ERR = new Error(
  "This student is already assigned to another case manager."
);

/**
 * Check for the existence of a student by email,
 * if they do not exist, create them as a student
 * assigned to the given case manager
 */
export async function createAndAssignStudent({
  first_name,
  last_name,
  email,
  grade,
  db,
  userId,
}: createStudentProps) {
  if (email) {
    const lookahead = await db
      .selectFrom("student")
      .selectAll()
      .where("email", "=", email)
      .execute();

    if (lookahead.length > 0) {
      const student = lookahead[0];
      if (student.assigned_case_manager_id === userId) {
        throw STUDENT_ASSIGNED_TO_YOU_ERR;
      }
      // not null
      else if (student.assigned_case_manager_id) {
        throw STUDENT_ALREADY_ASSIGNED_ERR;
      }
      // if student exists in table, but is unassigned,
      // handle in onConflict during creation
    }
  }

  // else, safe to create or re-assign student
  await db
    .insertInto("student")
    .values({
      first_name,
      last_name,
      email: email?.toLowerCase(),
      assigned_case_manager_id: userId,
      grade,
    })
    .onConflict((oc) =>
      oc
        .column("email")
        .doUpdateSet({ assigned_case_manager_id: userId })
        .where("student.assigned_case_manager_id", "is", null)
    )
    .returningAll()
    .executeTakeFirstOrThrow();
}
