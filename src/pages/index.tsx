import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, signOut } from "next-auth/react";
import { trpc } from "@/client/lib/trpc";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: me } = trpc.user.getMe.useQuery();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.userInfoWrap}>
          {me ? (
            <div className={styles.userInfo}>
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
              <button className={styles.signOut} onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          ) : (
            <div className={styles.greetWrap}>
              <div className={styles.greet}>
                <Image
                  src="/img/compass-logo.svg"
                  alt="logo"
                  width={60}
                  height={60}
                  priority
                />
                <h1 className={styles.bold}>Welcome to Project Compass</h1>
                <div>Log in with your Google account to continue</div>
                <button
                  className={`${styles.signIn} ${styles.bold}`}
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: "/students",
                    })
                  }
                >
                  Sign in with Google
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default Home;
