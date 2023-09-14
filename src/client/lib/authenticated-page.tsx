import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const requiresLogin =
  <Props extends object>(WrappedPage: React.ComponentType<Props>) =>
  // eslint-disable-next-line react/display-name
  (props: Props) => {
    const router = useRouter();
    const { status } = useSession();

    // Include any public pathnames here
    const publicPaths = ["/signInPage"];
    const pathIsProtected = !publicPaths.includes(router.pathname);

    useEffect(() => {
      if (status === "unauthenticated" && pathIsProtected) {
        void router.push("/");
      }
    }, [status, router, pathIsProtected]);

    if (status === "loading") {
      return <>Loading...</>;
    }

    return <WrappedPage {...props} />;
  };
