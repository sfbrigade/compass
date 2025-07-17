import { useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Container } from "@mui/material";

import { requiresLogin } from "@/client/lib/authenticated-page";
import Breadcrumbs, {
  Breadcrumb,
} from "@/components/design_system/breadcrumbs/Breadcrumbs";
import { useBreadcrumbsContext } from "@/components/design_system/breadcrumbs/BreadcrumbsContext";
import Header from "@/components/header/Header";
import Navigation from "@/components/navigation/Navigation";

import classes from "./Layout.module.css";

interface LayoutProps {
  initialBreadcrumbs?: Breadcrumb[];
  children: ReactNode;
}

const Layout = ({ initialBreadcrumbs, children }: LayoutProps) => {
  const { breadcrumbs, setInitialBreadcrumbs } = useBreadcrumbsContext();
  const { status } = useSession();
  const isSignedIn = "authenticated" === status;

  useEffect(() => {
    setInitialBreadcrumbs(initialBreadcrumbs);
  }, [initialBreadcrumbs, setInitialBreadcrumbs]);

  return (
    <div className={classes.layout}>
      {isSignedIn && (
        <>
          <div className={classes.layout__header}>
            <Header />
          </div>
          <div className={classes.layout__sidebar}>
            <Navigation />
          </div>
        </>
      )}
      {breadcrumbs && (
        <div className={classes.layout__breadcrumbs}>
          <Breadcrumbs data={breadcrumbs} />
        </div>
      )}
      <main className={classes.layout__main}>
        <Container>{children}</Container>
      </main>
    </div>
  );
};

export default requiresLogin(Layout);
