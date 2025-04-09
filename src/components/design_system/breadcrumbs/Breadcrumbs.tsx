import { ReactNode } from "react";
import Link from "next/link";

import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";

import classes from "./Breadcrumbs.module.css";

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
        <Link key={index} href={bc.href} className={classes.breadcrumbs__link}>
          {bc.children}
        </Link>
      );
    } else {
      return (
        <Typography variant="overline" key={index}>
          {bc.children}
        </Typography>
      );
    }
  });

  return (
    <MuiBreadcrumbs
      className={classes.breadcrumbs}
      separator={
        <Typography className={classes.breadcrumbs__separator} variant="h3">
          /
        </Typography>
      }
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
