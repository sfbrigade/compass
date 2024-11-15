import { hasAuthenticated, hasAdmin, router } from "../trpc";
import { z } from "zod";

const sortOrderSchema = z.enum(["asc", "desc"]).default("asc");
const sortBySchema = z
  .enum(["first_name", "last_name", "email", "role"])
  .default("first_name");

const paginationInput = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).default(10),
  sortBy: sortBySchema,
  sortOrder: sortOrderSchema,
  search: z.string().optional(),
});

const createUserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  role: z
    .enum(["ADMIN", "CASE_MANAGER", "PARA"])
    .transform((role) => role.toLowerCase()),
});

export const user = router({
  getMe: hasAuthenticated.query(async (req) => {
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

  getUsers: hasAdmin.input(paginationInput).query(async (req) => {
    const { page, pageSize, sortBy, sortOrder, search } = req.input;
    const offset = (page - 1) * pageSize;

    let baseQuery = req.ctx.db
      .selectFrom("user")
      .select([
        "user_id",
        "first_name",
        "last_name",
        "email",
        "image_url",
        "role",
      ]);

    if (search) {
      baseQuery = baseQuery.where((eb) =>
        eb.or([
          eb("first_name", "ilike", `%${search}%`),
          eb("last_name", "ilike", `%${search}%`),
          eb("email", "ilike", `%${search}%`),
          eb("role", "ilike", `%${search}%`),
        ])
      );
    }

    // Separate count query
    const countQuery = req.ctx.db
      .selectFrom("user")
      .select(req.ctx.db.fn.countAll().as("count"));

    // Apply search filter to count query if exists
    if (search) {
      countQuery.where((eb) =>
        eb.or([
          eb("first_name", "ilike", `%${search}%`),
          eb("last_name", "ilike", `%${search}%`),
          eb("email", "ilike", `%${search}%`),
          eb("role", "ilike", `%${search}%`),
        ])
      );
    }

    const [users, totalCount] = await Promise.all([
      baseQuery
        .orderBy(sortBy, sortOrder)
        .limit(pageSize)
        .offset(offset)
        .execute(),
      countQuery.executeTakeFirst(),
    ]);

    return {
      users,
      totalCount: Number(totalCount?.count ?? 0),
      totalPages: Math.ceil(Number(totalCount?.count ?? 0) / pageSize),
    };
  }),
  /**
   * @returns Whether the current user is a case manager
   */
  isCaseManager: hasAuthenticated.query(async (req) => {
    const { userId } = req.ctx.auth;

    const result = await req.ctx.db
      .selectFrom("paras_assigned_to_case_manager")
      .select("case_manager_id")
      .where("case_manager_id", "=", userId)
      .execute();

    return result.length > 0;
  }),

  createUser: hasAdmin.input(createUserSchema).mutation(async (req) => {
    const { first_name, last_name, email, role } = req.input;

    // Check if user already exists
    const existingUser = await req.ctx.db
      .selectFrom("user")
      .where("email", "=", email)
      .selectAll()
      .executeTakeFirst();

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const user = await req.ctx.db
      .insertInto("user")
      .values({
        first_name,
        last_name,
        email,
        role,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return user;
  }),
});
