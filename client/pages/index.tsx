import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
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
      <nav className={styles.navbar}>
        <div className={styles.signup}>
          {session && session.user ? (
            <button onClick={() => signOut()}>Sign out</button>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </div>
      </nav>
      <main className={styles.main}>
        <div>
          {session && session.user ? (
            <div className={styles.card}>
              <img
                src={session.user.image}
                width={50}
                height={50}
                referrerPolicy="no-referrer"
              />
              {JSON.stringify(session)}
              user.name: {session.user.name}
            </div>
          ) : (
            <p>You need to sign in to access Compass</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
