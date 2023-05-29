import { createTransport } from "nodemailer";

const email: string | undefined = process.env.EMAIL;
const pass: string | undefined = process.env.EMAIL_PASS;

export const transporter = createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

// this just means we are sending an email from our own email for testing purposes. The "to" email will be changed in src/backend/routers/paras to the para email address entered into the db by the cm.
export const mailOptions = {
  from: email,
  to: email,
};
