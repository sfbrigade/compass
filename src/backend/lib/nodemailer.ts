import crypto from "crypto";
import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Email from "email-templates";
import { Env } from "./types";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getTransporter = (env: Env) => {
  if (env.SES_REGION && env.SES_ACCESS_KEY_ID && env.SES_SECRET_ACCESS_KEY) {
    env.EMAIL_SERVICE = "smtp";
    env.EMAIL_HOST = `email-smtp.${env.SES_REGION}.amazonaws.com`;
    env.EMAIL_PORT = "587";
    env.EMAIL_AUTH_USER = env.SES_ACCESS_KEY_ID;
    // convert secret access key to SMTP password
    // based on pseudocode at: https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html#smtp-credentials-convert
    const date = "11111111";
    const service = "ses";
    const terminal = "aws4_request";
    const message = "SendRawEmail";
    const version = 4;
    let signature;
    signature = crypto
      .createHmac("sha256", `AWS4${env.SES_SECRET_ACCESS_KEY}`, {
        encoding: "utf8",
      })
      .update(date)
      .digest();
    signature = crypto
      .createHmac("sha256", signature)
      .update(env.SES_REGION)
      .digest();
    signature = crypto.createHmac("sha256", signature).update(service).digest();
    signature = crypto
      .createHmac("sha256", signature)
      .update(terminal)
      .digest();
    signature = crypto.createHmac("sha256", signature).update(message).digest();
    signature = Buffer.concat([new Uint8Array([version]), signature]);
    env.EMAIL_AUTH_PASS = signature.toString("base64");
  }

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
