import { Env } from "@/backend/lib/types";
import { KyselyDatabaseInstance } from "@/backend/lib";
import { getTransporter } from "@/backend/lib/nodemailer";

interface paraInputProps {
  first_name: string;
  last_name: string;
  email: string;
}

export async function createPara(
  para: paraInputProps,
  db: KyselyDatabaseInstance,
  caseManagerName: string,
  fromEmail: string,
  toEmail: string,
  env: Env
) {
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
    void sendInviteEmail(fromEmail, toEmail, first_name, caseManagerName, env);
  }

  return paraData;
}

export async function sendInviteEmail(
  fromEmail: string,
  toEmail: string,
  first_name: string,
  caseManagerName: string,
  env: Env
) {
  await getTransporter(env).sendMail({
    from: fromEmail,
    to: toEmail,
    subject: "Para-professional email confirmation",
    text: "Email confirmation",
    html: `<p>Dear ${first_name},</p><p>Welcome to the data collection team for SFUSD.EDU!</p><p>I am writing to invite you to join our data collection efforts for our students. We are using an online platform called <strong>Project Compass</strong> to track and monitor student progress, and your participation is crucial to the success of this initiative.</p><p>To access Project Compass and begin collecting data, please follow these steps:</p><ul><li>Go to the website: (<a href="https://staging.compassiep.com/">https://staging.compassiep.com/</a>)</li> <li>Login using your provided username and password</li><li>Once logged in, navigate to the dashboard where you would see the student goals page</li></ul><p>By clicking on the <strong>data collection</strong> button, you will be directed to the instructions outlining the necessary steps for data collection. Simply follow the provided instructions and enter the required data points accurately.</p><p>If you encounter any difficulties or have any questions, please feel free to reach out to me. I am here to assist you throughout the process and ensure a smooth data collection experience. Your dedication and contribution will make a meaningful impact on our students' educational journeys.</p><p>Thank you,</p><p>${caseManagerName}<br>Case Manager</p>`,
  });
}

// todo
// export async function assignParaToCaseManager() {
//
// }
