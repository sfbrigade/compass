import CloseIcon from "@mui/icons-material/Close";
import PeopleOutline from "@mui/icons-material/PeopleOutline";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import ContentPaste from "@mui/icons-material/ContentPaste";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
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
import { useRouter } from "next/router";
import * as React from "react";
import { MouseEventHandler } from "react";
import $navbar from "./Navbar.module.css";
import BreadcrumbsNav from "../design_system/breadcrumbs/Breadcrumbs";
import { ExtendedSession, UserType } from "@/types/auth";

interface NavItemProps {
  href?: string;
  icon: React.ReactNode;
  text: string;
  onClick?: MouseEventHandler<HTMLParagraphElement>;
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const desktop = useMediaQuery("(min-width: 992px)");
  const router = useRouter();

  const { status, data: session } = useSession() as {
    data: ExtendedSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logo = (
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
  );

  const ToolbarMenu = ({ name }: { name: React.ReactNode }) => (
    <Toolbar className={$navbar.toolbar}>
      {logo}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        sx={{ mr: 2 }}
      >
        {name}
      </IconButton>
    </Toolbar>
  );

  const NavItem = ({ href, icon, text, onClick }: NavItemProps) => {
    const currentPath = router.pathname;
    const selectedPath = currentPath.includes(href as string);

    return (
      <Link
        href={href || ""}
        className={`${$navbar.link}
          ${selectedPath ? $navbar.linkSelected : ""}`}
      >
        <ListItem disablePadding className={$navbar.linkItem}>
          {icon}
          <p className={$navbar.linkTitle} onClick={onClick}>
            {text}
          </p>
        </ListItem>
      </Link>
    );
  };

  // Navigation Links
  const drawer = (
    <div className={$navbar.navbarDropdown}>
      <List>
        {session?.user.role === UserType.Para && (
          <NavItem href="/benchmarks" icon={<ContentPaste />} text="Assigned" />
        )}
        <NavItem href="/students" icon={<SchoolOutlined />} text="Students" />
        {(session?.user.role === UserType.CaseManager ||
          session?.user.role === UserType.Admin) && (
          <NavItem href="/staff" icon={<PeopleOutline />} text="Staff" />
        )}
        <NavItem href="/settings" icon={<SettingsOutlined />} text="Settings" />
        <NavItem
          icon={<Logout />}
          text="Logout"
          onClick={() => signOut({ callbackUrl: "/" })}
        />
      </List>
    </div>
  );

  return (
    <>
      {status === "authenticated" && (
        <Box sx={{ display: "flex" }}>
          {desktop ? (
            <>
              {/* Sidebar for screens & breadcrumbs > md size */}
              <Box component="nav" aria-label="nav" className={$navbar.sidebar}>
                {logo}
                {drawer}
              </Box>
              <BreadcrumbsNav />
            </>
          ) : (
            <>
              {/* Top nav for screen <= md size */}
              <AppBar position="fixed" sx={{ display: "block" }}>
                <ToolbarMenu
                  name={
                    <MenuIcon className={$navbar.burger} fontSize="large" />
                  }
                />
              </AppBar>

              {/* Modal for sidebar when screen is <= md size */}
              <Drawer
                variant="temporary"
                anchor="top"
                open={mobileOpen}
                onClick={handleDrawerToggle}
                sx={{
                  display: "block",
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: "full",
                  },
                }}
              >
                <ToolbarMenu
                  name={
                    <CloseIcon className={$navbar.burger} fontSize="large" />
                  }
                />
                {drawer}
              </Drawer>
            </>
          )}
        </Box>
      )}
    </>
  );
}
