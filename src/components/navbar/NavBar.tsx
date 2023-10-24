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

interface NavItemProps {
  href?: string;
  icon: React.ReactNode;
  text: string;
  onClick?: MouseEventHandler<HTMLParagraphElement>;
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const desktop = useMediaQuery("(min-width: 992px)");

  const { status } = useSession();

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
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: desktop ? "none" : "" }}
      >
        {name}
      </IconButton>
    </Toolbar>
  );

  const NavItem = ({ href, icon, text, onClick }: NavItemProps) => (
    <ListItem disablePadding className={$navbar.linkItem}>
      <Link href={href || ""} className={$navbar.link}>
        {icon}
        <p className={$navbar.linkTitle} onClick={onClick}>
          {text}
        </p>
      </Link>
    </ListItem>
  );

  const drawer = (
    <div className={$navbar.sidebar}>
      <List>
        <NavItem href="/students" icon={<PeopleOutline />} text="Students" />
        <NavItem href="/staff" icon={<CoPresent />} text="Staff" />
        <NavItem href="/settings" icon={<Settings />} text="Settings" />
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
          {/* Sidebar for screens > md size */}
          <Box
            component="nav"
            aria-label="nav"
            className={$navbar.sidebar}
            sx={{
              display: desktop ? "block" : "none",
              width: "200px",
            }}
          >
            {logo}
            {drawer}
          </Box>

          {/* Top nav for screen <= md size */}
          <AppBar
            position="fixed"
            sx={{
              display: desktop ? "none" : "block",
            }}
          >
            <ToolbarMenu
              name={<MenuIcon className={$navbar.burger} fontSize="large" />}
            />
          </AppBar>

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
              },
            }}
          >
            <ToolbarMenu
              name={<CloseIcon className={$navbar.burger} fontSize="large" />}
            />
            {drawer}
          </Drawer>
        </Box>
      )}
    </>
  );
}
