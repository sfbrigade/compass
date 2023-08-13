import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Home from "@/pages";

export const requiresLogin =
  <Props extends object>(WrappedPage: React.ComponentType<Props>) =>
  // eslint-disable-next-line react/display-name
  (props: Props) => {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated" && router.pathname !== "/") {
        void router.push("/");
      }
    }, [status, router]);

    if (status === "loading") {
      return "Loading...";
    }

    return <WrappedPage {...props} />;
  };
