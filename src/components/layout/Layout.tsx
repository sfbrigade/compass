import React from "react";
import NavBar from "../navbar/NavBar";
import $layout from "./Layout.module.css";
import { useRouter } from "next/router";
import { requiresLogin } from "@/client/lib/authenticated-page";

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
      <main
        className={`${isPurpleBg ? $layout.mainPurple : $layout.main}
        ${router.query.student_id ? $layout.mainStudent : ""}
        ${router.query.goal_id ? $layout.mainGoal : ""} 
        ${router.query.user_id ? $layout.mainStaff : ""}`}
      >
        {children}
      </main>
    </div>
  );
};

export default requiresLogin(Layout);
