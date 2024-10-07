import { UserType } from "@/types/global";
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
