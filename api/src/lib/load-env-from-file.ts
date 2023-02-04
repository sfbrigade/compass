import { config } from "dotenv";

export const loadEnvFromFile = () => {
  config({ path: ".env.local" });
};
