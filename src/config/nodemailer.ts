import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const email: string | undefined = process.env.EMAIL;
const pass: string | undefined = process.env.EMAIL_PASS;

const options: SMTPTransport.Options = {
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
};

export const transporter = createTransport(options);

// this just means we are sending an email from our own email to test it.
export const mailOptions = {
  from: email,
  to: email,
};
