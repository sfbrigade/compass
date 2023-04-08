import { getTestPostgresDatabaseFactory } from "ava-postgres";
import { migrate } from "backend/db";

export const getTestDatabase = getTestPostgresDatabaseFactory({
  postgresVersion: "15",
  async beforeTemplateIsBaked({ connection: { connectionString } }) {
    await migrate(connectionString, {
      silent: true,
      shouldGenerateTypes: false,
    });
  },
});
