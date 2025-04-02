import { MouseEventHandler, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import PeopleOutline from "@mui/icons-material/PeopleOutline";
import Logout from "@mui/icons-material/Logout";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { ExtendedSession, UserType } from "@/types/auth";

import classes from "./Navigation.module.css";

interface NavItemProps {
  href?: string;
  icon: ReactNode;
  text: string;
  onClick?: MouseEventHandler<HTMLParagraphElement>;
}

function NavItem({ href, icon, text, onClick }: NavItemProps) {
  const router = useRouter();
  const currentPath = router.pathname;
  const selectedPath = currentPath.includes(href as string);

  return (
    <Link
      href={href || ""}
      className={`${classes.link}
        ${selectedPath ? classes.linkSelected : ""}`}
    >
      <ListItem disablePadding className={classes.linkItem}>
        {icon}
        <p className={classes.linkTitle} onClick={onClick}>
          {text}
        </p>
      </ListItem>
    </Link>
  );
}

interface NavigationProps {
  closeIcon?: ReactNode;
}

export default function Navigation({ closeIcon }: NavigationProps) {
  const { data: session } = useSession() as {
    data: ExtendedSession | null;
  };

  const role = session?.user.role;

  return (
    <Box component="nav" aria-label="nav" className={classes.sidebar}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "1.5rem",
        }}
      >
        <Link href="/">
          <Image
            src="/img/compass-logo-white.svg"
            alt="logo"
            className={classes.logo}
            width={64}
            height={64}
            priority
          />
        </Link>
        {closeIcon}
      </Box>
      <List>
        {role && (
          <>
            {[UserType.Admin, UserType.Para].includes(role) && (
              <NavItem
                href="/benchmarks"
                icon={<ContentPaste />}
                text="Assigned"
              />
            )}
            {[UserType.Admin, UserType.CaseManager].includes(role) && (
              <NavItem
                href="/students"
                icon={<SchoolOutlined />}
                text="Students"
              />
            )}
            {[UserType.Admin, UserType.CaseManager].includes(role) && (
              <NavItem href="/staff" icon={<PeopleOutline />} text="Staff" />
            )}
            {UserType.Admin === role && (
              <NavItem
                href="/admin"
                icon={<AdminPanelSettings />}
                text="Admin"
              />
            )}
          </>
        )}
        <NavItem
          icon={<Logout />}
          text="Logout"
          onClick={() => signOut({ callbackUrl: "/" })}
        />
      </List>
    </Box>
  );
}
