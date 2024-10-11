import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Env } from "./types";

export const getTransporter = (env: Env) => {
  const options: SMTPTransport.Options = {
    service: env.EMAIL_SERVICE,
    auth: {
      user: env.EMAIL_AUTH_USER,
      pass: env.EMAIL_AUTH_PASS,
    },
  };
  if (env.EMAIL_SERVICE === "smtp") {
    options.host = env.EMAIL_HOST;
    options.port = parseInt(env.EMAIL_PORT, 10);
  }
  return createTransport(options);
};
