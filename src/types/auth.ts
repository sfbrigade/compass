import { User, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

export interface UserWithRole extends User {
  profile: {
    role: string;
  };
}

export interface ExtendedSession extends Session {
  user: Session["user"] & {
    role: string;
  };
}

export interface CustomAdapterUser extends AdapterUser {
  profile?: {
    role: string;
  };
}
