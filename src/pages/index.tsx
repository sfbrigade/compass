import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "client/lib/trpc";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data: me } = trpc.getMe.useQuery();
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
          {me ? (
            <div className={styles.card}>
              <Image
                src={me.image_url ?? ""}
                alt="Profile picture"
                width={50}
                height={50}
                referrerPolicy="no-referrer"
              />
              {JSON.stringify(me)}
              user.name: {me.first_name} {me.last_name}
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
