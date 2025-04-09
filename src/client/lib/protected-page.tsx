import { trpc } from "./trpc";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { UserType } from "@/types/auth";

export const requiresAdminAuth =
  <Props extends object>(WrappedPage: React.ComponentType<Props>) =>
  // eslint-disable-next-line react/display-name
  (props: Props) => {
    const router = useRouter();
    const { data: me, error } = trpc.user.getMe.useQuery();

    useEffect(() => {
      if ((me && (me.role as UserType) !== UserType.Admin) || error) {
        void router.push("/");
      }
    }, [me, error, router]);

    if (!me) {
      return "Loading...";
    }

    if ((me?.role as UserType) === UserType.Admin) {
      return <WrappedPage {...props} />;
    }
  };
