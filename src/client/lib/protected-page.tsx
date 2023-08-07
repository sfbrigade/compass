import { trpc } from "./trpc";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const requiresAdminAuth =
  <Props extends object>(WrappedPage: React.ComponentType<Props>) =>
  // eslint-disable-next-line react/display-name
  (props: Props) => {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        void router.push("/");
      }
    }, [status, router]);

    if (status === "loading") {
      return "Loading...";
    }

    if (status === "authenticated") {
      return <WrappedPage {...props} />;
    }
  };
