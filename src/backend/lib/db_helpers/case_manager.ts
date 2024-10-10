import { Env } from "@/backend/lib/types";
import { KyselyDatabaseInstance } from "@/backend/lib";
import { getTransporter } from "@/backend/lib/nodemailer";
import { user } from "zapatos/schema";

interface paraInputProps {
  first_name: string;
  last_name: string;
  email: string;
}

/**
 * Checks for the existence of a user with the given email, if
 * they do not exist, create the user with the role of "staff",
 * initiate email sending without awaiting result
 */
export async function createPara(
  para: paraInputProps,
  db: KyselyDatabaseInstance,
  case_manager_id: string,
  from_email: string,
  to_email: string,
  env: Env,
): Promise<user.Selectable | undefined> {
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
        role: "staff",
      })
      .returningAll()
      .executeTakeFirst();

    // promise, will not interfere with returning paraData
    void sendInviteEmail(
      from_email,
      to_email,
      first_name,
      case_manager_id,
      env,
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
  caseManagerName: string,
  env: Env,
): Promise<void> {
  await getTransporter(env).sendMail({
    from: fromEmail,
    to: toEmail,
    subject: `Welcome to ${caseManagerName}'s classroom`,
    text: `${first_name}, get set up for data collection with Compass`,
    html: `Hi ${first_name}! <br/>
${caseManagerName} has added you as a staff member for their classroom in Compass. <br/>
Compass is an all in one tool for collecting data for students’ IEP goals and empowering your classroom team to better assist students. <br/> <br/>
How does Compass work? <br/>
Compass will help you organize data collection for the students you work with and securely store the data you collect. <br/>
${caseManagerName} will add you to data collection tasks for specific student goals. Upon logging in, you’ll see which students you’re expected to collect data for. 
Instructions from ${caseManagerName} will be available with each assignment. When you’re ready to begin, you’ll be able to collect and submit data and notes directly in the app. <br/><br/>
Getting started <br/>
To get set up with Compass, use the link below and log in with the email address you received this message at. <br/>
Thank you for the key role you play in improving student outcomes!`,
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
  db: KyselyDatabaseInstance,
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
  email: string;
  grade: number;
  db: KyselyDatabaseInstance;
  userId: string;
};

export const STUDENT_ASSIGNED_TO_YOU_ERR = new Error(
  "This student is already assigned to you",
);
export const STUDENT_ALREADY_ASSIGNED_ERR = new Error(
  "This student is already assigned to another case manager.",
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

  // else, safe to create or re-assign student
  await db
    .insertInto("student")
    .values({
      first_name,
      last_name,
      email: email.toLowerCase(),
      assigned_case_manager_id: userId,
      grade,
    })
    .onConflict((oc) =>
      oc
        .column("email")
        .doUpdateSet({ assigned_case_manager_id: userId })
        .where("student.assigned_case_manager_id", "is", null),
    )
    .returningAll()
    .executeTakeFirstOrThrow();
}
