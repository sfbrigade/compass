import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    status === "authenticated"
      ? void router.push("/students")
      : void router.push("/signInPage");
  }, [status, router]);

  return <>Redirecting...</>;
};

export default Home;
