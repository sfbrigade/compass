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
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={$navbar.sidebar}>
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
      <List className={$navbar.list}>
        <Link href="/students" className={$navbar.linkItem}>
          <ListItem disablePadding className={$navbar.link}>
            <PeopleOutline className={$navbar.icon} />
            <p className={$navbar.linkTitle}>Students</p>
          </ListItem>
        </Link>
        <Link href="/staff" className={$navbar.linkItem}>
          <ListItem disablePadding className={$navbar.link}>
            <CoPresent className={$navbar.icon} />
            <p className={$navbar.linkTitle}>Staff</p>
          </ListItem>
        </Link>
        <Link href="/settings" className={$navbar.linkItem}>
          <ListItem disablePadding className={$navbar.link}>
            <Settings className={$navbar.icon} />
            <p className={$navbar.linkTitle}>Settings</p>
          </ListItem>
        </Link>
        <Link href="" className={$navbar.linkItem}>
          <ListItem disablePadding className={$navbar.link}>
            <Logout className={$navbar.icon} />
            <p
              className={$navbar.linkTitle}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </p>
          </ListItem>
        </Link>
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
              display: { xs: "block", md: "none" },
            }}
          >
            <Toolbar className={$navbar.toolbar}>
              <Link href="/">
                <Image
                  src="/img/compass-logo-white.svg"
                  alt="logo"
                  className={$navbar.logo}
                  width={56}
                  height={56}
                  priority
                />
              </Link>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon className={$navbar.burger} fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Sidebar for screens > md size */}
          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "block" },
              width: { md: "200px" },
              flexShrink: { md: 0 },
            }}
            aria-label="nav"
            className={$navbar.sidebar}
          >
            {drawer}
          </Box>

          {/* Modal for sidebar when screen is <= md size */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "200px",
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
