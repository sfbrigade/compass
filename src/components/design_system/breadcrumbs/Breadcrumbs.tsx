import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useRouter } from "next/router";
import $breadcrumbs from "./Breadcrumbs.module.css";
import { transformPaths } from "./transformBreadCrumbs";
import { usePersonData } from "./usePersonData";

const BreadcrumbsNav = () => {
  const { query, asPath } = useRouter();
  const personData = usePersonData(query as Record<string, string>);

  // An array of breadcrumbs fixed to students/staff as the first index. This will be modified depending on how the address bar will be displayed.
  const breadcrumbs = transformPaths({ fullPath: asPath, personData });

  return (
    <div className={$breadcrumbs.container}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsNav;
