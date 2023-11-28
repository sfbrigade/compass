import React from "react";
import $box from "@/styles/Box.module.css";
import $button from "@/components/button/Button.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const ParaNav = () => {
  const {
    asPath,
    query: { benchmark_id },
  } = useRouter();
  const modifyPaths = (path: string, toPath: string) => {
    // If we are already at the designated 'toPath', we return to '/benchmarks/[id]'
    // If not, we move to the new path
    if (path.includes(toPath)) {
      return `/benchmarks/${benchmark_id as string}`;
    }
    return `/benchmarks/${benchmark_id as string}/${toPath}`;
  };

  return (
    <div className={`${$box.flex} ${$box.fullWidth}`}>
      <Link
        href={modifyPaths(asPath, "studentprofile")}
        className={`${
          asPath.includes("studentprofile")
            ? $button.switchActive
            : $button.switch
        } ${$button.leftPill} ${$box.fullWidth}`}
      >
        Student profile
      </Link>
      <Link
        href={modifyPaths(asPath, "instructions")}
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
