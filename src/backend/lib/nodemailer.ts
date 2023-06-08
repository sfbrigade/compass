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
