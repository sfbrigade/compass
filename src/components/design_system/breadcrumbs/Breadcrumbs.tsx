import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useRouter } from "next/router";
import $breadcrumbs from "./Breadcrumbs.module.css";
import { transformPaths } from "./transformBreadCrumbs";
import { usePersonData } from "./usePersonData";

export interface BreadcrumbsNavProps {
  urlPath?: string;
}

const BreadcrumbsNav = ({ urlPath }: BreadcrumbsNavProps) => {
  const router = useRouter();
  if (urlPath === undefined) {
    urlPath = router.asPath;
  }
  const paths = urlPath.split("/");

  const personData = usePersonData(paths);

  // An array of breadcrumbs fixed to students/staff as the first index. This will be modified depending on how the address bar will be displayed.
  const breadcrumbs = transformPaths({ paths, personData });

  return (
    <div className={$breadcrumbs.container}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsNav;
