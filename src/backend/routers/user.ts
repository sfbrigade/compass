import { authenticatedProcedure, router } from "../trpc";

export const user = router({
  getMe: authenticatedProcedure.query(async (req) => {
    const { userId } = req.ctx.auth;

    const user = await req.ctx.db
      .selectFrom("user")
      .where("user_id", "=", userId)
      .select([
        "user_id",
        "first_name",
        "last_name",
        "email",
        "image_url",
        "role",
      ])
      .executeTakeFirst();

    return user;
  }),

  /**
   * @returns Whether the current user is a case manager
   */
  isCaseManager: authenticatedProcedure.query(async (req) => {
    const { userId } = req.ctx.auth;

    const result = await req.ctx.db
      .selectFrom("paras_assigned_to_case_manager")
      .select("case_manager_id")
      .where("case_manager_id", "=", userId)
      .execute();

    return result.length > 0;
  }),
});
