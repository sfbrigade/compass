import React from "react";
import NavBar from "./NavBar";
import $layout from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={$layout.container}>
      <NavBar />
      <main className={$layout.main}>{children}</main>
    </div>
  );
};

export default Layout;
