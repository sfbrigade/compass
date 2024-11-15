import { User, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

export interface UserWithRole extends User {
  profile: {
    role: UserType;
  };
}

export interface ExtendedSession extends Session {
  user: Session["user"] & {
    role: UserType;
  };
}

export interface CustomAdapterUser extends AdapterUser {
  profile?: {
    role: UserType;
  };
}

export enum UserType {
  User = "user",
  Para = "para",
  CaseManager = "case_manager",
  Admin = "admin",
}

export const ROLE_OPTIONS = [
  { label: "Para", value: "PARA" },
  { label: "Case Manager", value: "CASE_MANAGER" },
  { label: "Admin", value: "ADMIN" },
] as const;

export function getRoleLabel(role: string): string {
  const option = ROLE_OPTIONS.find(
    (opt) => opt.value.toLowerCase() === role.toLowerCase()
  );
  return option?.label || role;
}
