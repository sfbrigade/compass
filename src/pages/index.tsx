import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../public/img/compass-logo.png";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Compass</title>
        <meta name="description" content="Make IEPs easier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.user_info_wrap}>
          {session && session.user ? (
            <div className={styles.user_info}>
              <Image
                src={session.user.image || ""}
                alt="Profile picture"
                width={50}
                height={50}
                referrerPolicy="no-referrer"
              />
              <h1>Welcome {session.user.name}</h1>
              {JSON.stringify(session)}
              <button className={styles.sign_out} onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          ) : (
            <div className={styles.greet_wrap}>
              <div className={styles.greet}>
                <Image src={logo} className={styles.logo} alt="logo" />
                <h1 className={styles.bold}>Welcome to Project Compass</h1>
                <div>Log in with your Google account to continue</div>
                <button
                  className={`${styles.sign_in} ${styles.bold}`}
                  onClick={() => signIn("google")}
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
