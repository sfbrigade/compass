import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import Navigation from "@/components/navigation/Navigation";

import classes from "./Header.module.css";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ display: "block" }}>
        <Toolbar className={classes.toolbar}>
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon className={classes.burger} fontSize="large" />
          </IconButton>
        </Toolbar>
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
        <Navigation
          closeIcon={<CloseIcon className={classes.burger} fontSize="large" />}
        />
      </Drawer>
    </>
  );
}
