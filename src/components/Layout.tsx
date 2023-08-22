import React from "react";
import NavBar from "./NavBar";
import $layout from "./Layout.module.css";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  // TODO?: Are there better ways to achieve this?
  //Sets purple background for student profile and instructions routes
  const isPurpleBg =
    router.asPath.includes("/studentprofile") ||
    router.asPath.includes("/instructions");
  return (
    <div className={$layout.container}>
      <NavBar />
      <main className={`${isPurpleBg ? $layout.mainPurple : $layout.main}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
