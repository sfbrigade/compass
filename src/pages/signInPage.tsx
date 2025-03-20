import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import $home from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Typography } from "@mui/material";

import Button from "@/components/design_system/button/Button";

const SignInPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/students");
    }
  }, [router, status]);

  return (
    <div className={$home.greetWrap}>
      <Link href="/about">
        <Image
          src="/img/compass-logo.svg"
          alt="logo"
          width={60}
          height={60}
          priority
        />
      </Link>
      <Typography variant="h3">Welcome to Project Compass</Typography>
      <div>Log in with your Google account to continue</div>
      <Button
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
          })
        }
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default SignInPage;
