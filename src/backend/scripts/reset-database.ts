import { reset } from "backend/db/lib";
import { loadEnvFromFile } from "backend/lib";

const main = async () => {
  loadEnvFromFile();

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  await reset(process.env.DATABASE_URL);
};

void main();
