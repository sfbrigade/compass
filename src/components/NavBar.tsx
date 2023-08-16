import $navbar from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import {
  PeopleOutline,
  CoPresent,
  Settings,
  Logout,
  NoEncryption,
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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

/*interface Props {
  window?: () => Window;
}*/

export default function NavBar() {
  /*const { window } = props;*/
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={$navbar.sidebar}>
      <Toolbar />
      <Divider />
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
        <ListItem disablePadding className={$navbar.linkItem}>
          <Link href="/students" className={$navbar.link}>
            <ListItemButton>
              <PeopleOutline className={$navbar.icon} />
              <p className={$navbar.linkTitle}>Students</p>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding className={$navbar.linkItem}>
          <Link href="/staff" className={$navbar.link}>
            <ListItemButton>
              <CoPresent className={$navbar.icon} />
              <p className={$navbar.linkTitle}>Staff</p>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding className={$navbar.linkItem}>
          <ListItemButton>
            <Link href="/settings" className={$navbar.link}>
              <Settings className={$navbar.icon} />
              <p className={$navbar.linkTitle}>Settings</p>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className={$navbar.linkItem}>
          <Link href="" className={$navbar.link}>
            <ListItemButton>
              <Logout className={$navbar.icon} />
              <p
                className={$navbar.linkTitle}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </p>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  /*const container = window !== undefined ? () => window().document.body : undefined;*/

  const { status } = useSession();

  return (
    <>
      {status === "authenticated" && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { md: `calc(100% - ${drawerWidth}px)` },
              ml: { md: `${drawerWidth}px` },
              boxShadow: 0,
            }}
          >
            <Toolbar className={$navbar.toolbar}>
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
          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="mailbox folders"
            className={$navbar.sidebar}
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              /*container={container}*/
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
      )}
      ;
    </>
  );
}

/* const NavBar = () => {
  const { status } = useSession(); 

  return (
    <>
      {status === "authenticated" && (
        <nav className={$navbar.sidebar}>

          <div className={$navbar.allLinks}>
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

          </div>
        </nav>

      )}
    </>
  );
}; 

export default NavBar; */
