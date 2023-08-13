import React from "react";
import NavBar from "./NavBar";
import $layout from "./Layout.module.css";
import { requiresLogin } from "@/client/lib/authenticated-page";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className={$layout.container}>
        <NavBar />
        <main className={$layout.main}>{children}</main>
      </div>
    </>
  );
};

export default requiresLogin(Layout);
