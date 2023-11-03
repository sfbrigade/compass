import CloseIcon from "@mui/icons-material/Close";
import CoPresent from "@mui/icons-material/CoPresent";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleOutline from "@mui/icons-material/PeopleOutline";
import Settings from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { MouseEventHandler } from "react";
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
              src="/img/compass-logo-white.svg"
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
        </nav>
      )}
    </>
  );
};
