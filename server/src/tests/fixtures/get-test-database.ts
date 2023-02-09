import { getTestPostgresDatabaseFactory } from "ava-postgres";
import { migrate } from "~/db";

export const getTestDatabase = getTestPostgresDatabaseFactory({
  postgresVersion: "15",
  async beforeTemplateIsBaked({ connection: { connectionString } }) {
    await migrate(connectionString, true);
  },
});
