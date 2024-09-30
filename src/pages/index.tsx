import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession() as {
    data: ExtendedSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      switch (session.user.role) {
        case "para":
          void router.push("/benchmarks");
          break;
        default:
          void router.push("/students");
          break;
      }
    } else {
      void router.push("/signInPage");
    }
  }, [status, router, session]);

  return <>Redirecting...</>;
};

export default Home;
