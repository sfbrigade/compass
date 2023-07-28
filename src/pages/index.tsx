import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { status } = useSession();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.userInfoWrap}>
          {status === "unauthenticated" && (
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
