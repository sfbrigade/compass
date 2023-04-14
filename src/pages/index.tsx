import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../styles/img/compass-logo.png";
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
        <div>
          {session && session.user ? (
            <div className={styles.card}>
              <Image
                src={session.user.image || ""}
                alt="Profile picture"
                width={50}
                height={50}
                referrerPolicy="no-referrer"
              />
              {JSON.stringify(session)}
              user.name: {session.user.name}
              <button onClick={() => signOut()}>Sign out</button>
            </div>
          ) : (
            <div className={styles.greet}>
              <Image src={logo} alt="logo" />
              <div>Welcome to Project Compass</div>
              <div>You need to sign in to access Compass</div>
              <div className={styles.navbar}>
                <div className={styles.signin}>
                  <button onClick={() => signIn("google")}>
                    Sign in with Google
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default Home;
