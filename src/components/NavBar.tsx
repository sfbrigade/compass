import React from "react";
import $navbar from "./Navbar.module.css";
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

const NavBar = () => {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" && (
        <nav className={$navbar.sidebar}>
          <Link href="/">
            <Image
              src="/img/compass-logo.svg"
              alt="logo"
              className={$navbar.logo}
              width={64}
              height={64}
              priority
            />
          </Link>
          <br />

          <div className={$navbar.linkContainer}>
            <Link href="/students" className={$navbar.link}>
              <PeopleOutline className={$navbar.icon} />
              <p className={$navbar.linkTitle}>Students</p>
            </Link>
            <br />
            <Link href="/staff" className={$navbar.link}>
              <CoPresent className={$navbar.icon} />
              <p className={$navbar.linkTitle}>Staff</p>
            </Link>
            <br />
            <Link href="/settings" className={$navbar.link}>
              <Settings className={$navbar.icon} />
              <p className={$navbar.linkTitle}>Settings</p>
            </Link>
            <br />
            <Link href="" className={$navbar.link}>
              <Logout className={$navbar.icon} />
              <p
                className={$navbar.linkTitle}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </p>
            </Link>
          </div>
        </nav>)}
    </>
  );
};

export default NavBar;
