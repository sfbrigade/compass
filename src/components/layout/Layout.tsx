import React from "react";
import { useSession } from "next-auth/react";
import { Container } from "@mui/material";

import { requiresLogin } from "@/client/lib/authenticated-page";
import Header from "@/components/header/Header";
import Navigation from "@/components/navigation/Navigation";

import classes from "./Layout.module.css";

interface LayoutProps {
  breadcrumbs: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({ breadcrumbs, children }: LayoutProps) => {
  const { status } = useSession();
  const isSignedIn = "authenticated" === status;

  return (
    <div className={classes.layout}>
      {isSignedIn && (
        <>
          <div className={classes.layout__header}>
            <Header />
          </div>
          <div className={classes.layout__sidebar}>
            <Navigation />
          </div>
        </>
      )}
      {breadcrumbs && (
        <div className={classes.layout__breadcrumbs}>{breadcrumbs}</div>
      )}
      <main className={classes.layout__main}>
        <Container>{children}</Container>
      </main>
    </div>
  );
};

export default requiresLogin(Layout);
