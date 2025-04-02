import { ReactNode } from "react";
import Link from "next/link";

import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";

import $breadcrumbs from "./Breadcrumbs.module.css";

export interface Breadcrumb {
  href?: string;
  children: ReactNode;
}

interface BreadcrumbsProps {
  data?: Breadcrumb[];
}

const Breadcrumbs = ({ data }: BreadcrumbsProps) => {
  const breadcrumbs = data?.map((bc, index) => {
    if (bc.href) {
      return (
        <Link key={index} href={bc.href} className={$breadcrumbs.link}>
          {bc.children}
        </Link>
      );
    } else {
      return <Typography key={index}>{bc.children}</Typography>;
    }
  });

  return (
    <MuiBreadcrumbs separator="/" aria-label="breadcrumb">
      {breadcrumbs}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
