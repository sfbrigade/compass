import React from "react";
import NavBar from "./NavBar";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
