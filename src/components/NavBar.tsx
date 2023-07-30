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
import { useSession } from "next-auth/react";

interface NavBarProps {
  children: React.ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  const { status } = useSession();

  return (
    <React.Fragment>
      <div className={styles.container}>
        {status === "authenticated" && (
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
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
