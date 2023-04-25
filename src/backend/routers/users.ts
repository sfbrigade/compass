import { protectedProcedure } from "../trpc";

export const userProcedures = {
  getMe: protectedProcedure.query(async (req) => {
    const { userId } = req.ctx.auth;

    const user = await req.ctx.db
      .selectFrom("user")
      .where("user_id", "=", userId)
      .select(["user_id", "first_name", "last_name", "email", "image_url"])
      .executeTakeFirst();

    return user;
  }),
};
