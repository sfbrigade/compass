import React from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import {
  PeopleOutline,
  CoPresent,
  Settings,
  Logout,
} from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { trpc } from "@/client/lib/trpc";

interface Props {
  children: React.ReactNode;
}
const NavBar: React.FC<Props> = ({ children }) => {
  const { data: me } = trpc.user.getMe.useQuery();

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Link href="/">
            <Image
              src="/img/compass-logo.svg"
              alt="logo"
              className={styles.logo}
              width={64}
              height={64}
              priority
            />
          </Link>
          <br />

          {me && (
            <div className={styles.linkContainer}>
              <Link href="/students" className={styles.link}>
                <PeopleOutline className={styles.icon} />
                <p className={styles.linkTitle}>Students</p>
              </Link>
              <br />
              <Link href="/staff" className={styles.link}>
                <CoPresent className={styles.icon} />
                <p className={styles.linkTitle}>Staff</p>
              </Link>
              <br />
              <Link href="/settings" className={styles.link}>
                <Settings className={styles.icon} />
                <p className={styles.linkTitle}>Settings</p>
              </Link>
              <br />
              <Link href="" className={styles.link}>
                <Logout className={styles.icon} />
                <p
                  className={styles.linkTitle}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </p>
              </Link>
            </div>
          )}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
