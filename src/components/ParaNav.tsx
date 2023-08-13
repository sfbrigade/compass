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
    if (path.includes(toPath)) {
      return path.slice(0, path.lastIndexOf("/"));
    }
    return path + toPath;
  };

  return (
    <div className={`${$box.flex} ${$box.fullWidth}`}>
      <Link
        href={modifyPaths(asPath, "/studentprofile")}
        className={`${$button.switch} ${$button.leftPill} ${$box.fullWidth}`}
      >
        Student profile
      </Link>
      <Link
        href={modifyPaths(asPath, "/instructions")}
        className={`${$button.switch} ${$button.switchActive} ${$button.rightPill} ${$box.fullWidth}`}
      >
        Instructions
      </Link>
    </div>
  );
};

export default ParaNav;
