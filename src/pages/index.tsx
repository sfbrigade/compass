import type { NextPage } from "next";
import Image from "next/image";
import $home from "../styles/Home.module.css";
import { signIn, signOut } from "next-auth/react";
import { trpc } from "@/client/lib/trpc";
import Link from "next/link";
import $button from "@/styles/Button.module.css";

const Home: NextPage = () => {
  const { data: me } = trpc.user.getMe.useQuery();

  return (
    <>
      {me ? (
        <div className={$home.userInfo}>
          <Image
            src={me?.image_url ?? ""}
            alt="Profile picture"
            width={50}
            height={50}
            referrerPolicy="no-referrer"
          />
          <h1>
            Welcome {me?.first_name} {me?.last_name}
          </h1>
          {JSON.stringify(me)}
          <Link href="/students">
            <p>CM Dashboard</p>
          </Link>
          <button className={$button.default} onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      ) : (
        <div className={$home.greetWrap}>
          <Image
            src="/img/compass-logo.svg"
            alt="logo"
            width={60}
            height={60}
            priority
          />
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
      )}
    </>
  );
};
export default Home;
