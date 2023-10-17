import {
  CoPresent,
  Logout,
  PeopleOutline,
  Settings,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
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
import $navbar from "./Navbar.module.css";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const desktop = useMediaQuery("(min-width: 992px)");

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

  const drawer = (
    <div className={$navbar.sidebar}>
      <List className={$navbar.list}>
        <ListItem disablePadding className={$navbar.linkItem}>
          <Link href="/students" className={$navbar.link}>
            <PeopleOutline />
            <p className={$navbar.linkTitle}>Students</p>
          </Link>
        </ListItem>
        <ListItem disablePadding className={$navbar.linkItem}>
          <Link href="/staff" className={$navbar.link}>
            <CoPresent />
            <p className={$navbar.linkTitle}>Staff</p>
          </Link>
        </ListItem>
        <ListItem disablePadding className={$navbar.linkItem}>
          <Link href="/settings" className={$navbar.link}>
            <Settings />
            <p className={$navbar.linkTitle}>Settings</p>
          </Link>
        </ListItem>
        <ListItem disablePadding className={$navbar.linkItem}>
          <Link href="" className={$navbar.link}>
            <Logout />
            <p
              className={$navbar.linkTitle}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </p>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  const { status } = useSession();

  return (
    <>
      {status === "authenticated" && (
        <Box sx={{ display: "flex" }}>
          {/* Top nav for screen <= md size */}
          <AppBar
            position="fixed"
            sx={{
              display: desktop ? "none" : "block",
            }}
          >
            <Toolbar className={$navbar.toolbar}>
              {logo}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: desktop ? "none" : "" }}
              >
                <MenuIcon className={$navbar.burger} fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Sidebar for screens > md size */}
          <Box
            component="nav"
            sx={{
              display: desktop ? "block" : "none",
              width: "200px",
            }}
            aria-label="nav"
            className={$navbar.sidebar}
          >
            {logo}
            {drawer}
          </Box>

          {/* Modal for sidebar when screen is <= md size */}
          <Drawer
            variant="temporary"
            anchor="top"
            open={mobileOpen}
            onClick={handleDrawerToggle}
            sx={{
              display: desktop ? "none" : "block",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "full",
                marginTop: "4.25rem",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      )}
    </>
  );
}
