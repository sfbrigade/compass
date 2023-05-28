/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

// this just means we are sending an email from our own email to test it.
export const mailOptions = {
  from: email,
  to: email,
};
