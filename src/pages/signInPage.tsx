import React, { useEffect } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import $home from "../styles/Home.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const SignInPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    status === "authenticated" ? void router.push("/students") : null;
  }, [router, status]);

  return (
    <div className={$home.greetWrap}>
      <button className={$button.about} onClick={() => router.push("/about")}>
        <Image
          src="/img/compass-logo.svg"
          alt="logo"
          width={60}
          height={60}
          priority
        />
      </button>
      <h1 className={$home.bold}>Welcome to Project Compass</h1>
      <div>Log in with your Google account to continue</div>
      <button
        className={$button.default}
        onClick={() =>
          signIn("google", {
            callbackUrl: "/students",
          })
        }
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInPage;
