import { User, Session } from "next-auth";

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
