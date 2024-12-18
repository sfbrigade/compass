import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Email from "email-templates";
import { Env } from "./types";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  const transport = createTransport(options);
  const email = new Email({
    send: true,
    transport,
    views: {
      root: path.resolve(__dirname, "../emails"),
      options: {
        extension: "ejs",
      },
    },
    juice: false,
    preview: false,
  });
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send(options: Email.EmailOptions<any>) {
      return email.send({
        ...options,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        locals: {
          ...options.locals,
          env: {
            BASE_URL: env.BASE_URL,
          },
        },
      });
    },
  };
};
