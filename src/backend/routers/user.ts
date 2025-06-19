import { hasAuthenticated, hasAdmin, router } from "../trpc";
import { z } from "zod";
import { UserType, ROLE_OPTIONS } from "@/types/auth";
import { TRPCError } from "@trpc/server";

export const sortOrderSchema = z.enum(["asc", "desc"]).default("asc");
export const sortBySchema = z
  .enum(["first_name", "last_name", "email", "role"])
  .default("first_name");

const paginationInput = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).default(10),
  sort: sortBySchema,
  sortAsc: z.coerce.boolean().default(true),
  search: z.string().optional(),
});

const createUserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  role: z.string(),
});

const roleValues = ROLE_OPTIONS.map((r) => r.value) as [string, ...string[]];

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
    const { page, pageSize, sort, sortAsc, search } = req.input;
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
    let countQuery = req.ctx.db
      .selectFrom("user")
      .select(req.ctx.db.fn.countAll().as("count"));

    // Apply search filter to count query if exists
    if (search) {
      countQuery = countQuery.where((eb) =>
        eb.or([
          eb("first_name", "ilike", `%${search}%`),
          eb("last_name", "ilike", `%${search}%`),
          eb("email", "ilike", `%${search}%`),
          eb("role", "ilike", `%${search}%`),
        ])
      );
    }

    const [records, totalCount] = await Promise.all([
      baseQuery
        .orderBy(sort, sortAsc ? "asc" : "desc")
        .limit(pageSize)
        .offset(offset)
        .execute(),
      countQuery.executeTakeFirst(),
    ]);

    return {
      records,
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
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User with this email already exists",
      });
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

  getUserById: hasAdmin
    .input(z.object({ user_id: z.string() }))
    .query(async (req) => {
      const { user_id } = req.input;

      return await req.ctx.db
        .selectFrom("user")
        .selectAll()
        .where("user_id", "=", user_id)
        .executeTakeFirstOrThrow();
    }),

  editUser: hasAdmin
    .input(
      z.object({
        user_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        role: z.enum(roleValues).transform((role) => {
          switch (role) {
            case "admin":
              return UserType.Admin;
            case "case_manager":
              return UserType.CaseManager;
            case "para":
              return UserType.Para;
            default:
              return UserType.User;
          }
        }),
      })
    )
    .mutation(async (req) => {
      const { user_id, first_name, last_name, email, role } = req.input;

      const { userId } = req.ctx.auth;

      const dbUser = await req.ctx.db
        .selectFrom("user")
        .where("user_id", "=", user_id)
        .selectAll()
        .executeTakeFirstOrThrow();

      if (userId === user_id && dbUser.role !== (role as string)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot change your own role",
        });
      }

      return await req.ctx.db
        .updateTable("user")
        .set({
          first_name,
          last_name,
          email: email.toLowerCase(),
          role,
        })
        .where("user_id", "=", user_id)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),
});
