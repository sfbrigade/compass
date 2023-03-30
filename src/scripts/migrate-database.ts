import { migrate } from "api/db";
import { loadEnvFromFile } from "api/lib";

const main = async () => {
  loadEnvFromFile();

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  await migrate(process.env.DATABASE_URL);
};

void main();
