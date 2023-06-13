import { createTransport } from "nodemailer";
import { Env } from "./types";

export const getTransporter = (environment: Env) =>
  createTransport({
    service: "gmail",
    auth: {
      user: environment.EMAIL,
      pass: environment.EMAIL_PASS,
    },
  });
