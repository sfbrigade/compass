import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, signOut } from "next-auth/react";
import { trpc } from "client/lib/trpc";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: me } = trpc.getMe.useQuery();
  return (
    <div className={styles.container}>
      <Head>
        <title>Compass</title>
        <meta name="description" content="Make IEPs easier" />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.userinfowrap}>
          {me ? (
            <div className={styles.userinfo}>
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
              <Link href="/cmDashboard">
                <p>CM Dashboard</p>
              </Link>
              <button className={styles.signout} onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          ) : (
            <div className={styles.greetwrap}>
              <div className={styles.greet}>
                <Image
                  src="/img/compass-logo.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  priority
                />
                <div>Welcome to Project Compass</div>
                <div>Log in with your Google account to continue</div>
                <button
                  className={styles.signin}
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
