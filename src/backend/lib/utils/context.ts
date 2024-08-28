import { tRPCContext } from "@/backend/context";
import { Transaction } from "kysely";
import { KyselySchema } from "../types";

export const substituteTransactionOnContext = (
  trx: Transaction<KyselySchema>,
  context: tRPCContext,
): tRPCContext => ({
  ...context,
  db: trx,
});
