import React from "react";
import $box from "@/styles/Box.module.css";
import $button from "@/styles/Button.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

interface ParaNavProps {
  studentPath: string;
  instructPath: string;
}

const ParaNav = () => {
  const { asPath } = useRouter();
  const modifyPaths = (path: string, toPath: string) => {
    // If we are already at that path, we want to return to the benchmark
    // If not, we move to the added path
    if (path.includes(toPath)) {
      return path.slice(0, path.lastIndexOf("/"));
    }
    if (path.includes("/studentprofile") || path.includes("/instructions")) {
      return path.slice(0, path.lastIndexOf("/")) + toPath;
    }
    return path + toPath;
  };

  return (
    <div className={`${$box.flex} ${$box.fullWidth}`}>
      <Link
        href={modifyPaths(asPath, "/studentprofile")}
        className={`${
          asPath.includes("studentprofile")
            ? $button.switchActive
            : $button.switch
        } ${$button.leftPill} ${$box.fullWidth}`}
      >
        Student profile
      </Link>
      <Link
        href={modifyPaths(asPath, "/instructions")}
        className={`${
          asPath.includes("instructions")
            ? $button.switchActive
            : $button.switch
        } ${$button.rightPill} ${$box.fullWidth}`}
      >
        Instructions
      </Link>
    </div>
  );
};

export default ParaNav;
