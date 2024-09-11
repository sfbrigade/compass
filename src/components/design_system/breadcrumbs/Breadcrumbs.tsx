import Breadcrumbs from "@mui/material/Breadcrumbs";
import $breadcrumbs from "./Breadcrumbs.module.css";
import { transformPaths } from "./transformBreadCrumbs";
import { PersonData } from "./usePersonData";
import Link from "next/link";

const BreadcrumbsDesign = ({
  fullPath,
  personData,
}: {
  fullPath: string;
  personData: PersonData;
}) => {
  // An array of breadcrumbs fixed to students/staff as the first index. This will be modified depending on how the address bar will be displayed.
  const breadcrumbs = transformPaths({ fullPath, personData });

  return (
    <div className={$breadcrumbs.container}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {breadcrumbs.map((data, index) => {
          const isCurrentPage = index + 1 === breadcrumbs.length;

          if (!isCurrentPage && data.linkable) {
            return (
              <Link key={index} href={data.path} className={$breadcrumbs.link}>
                {data.name}
              </Link>
            );
          } else {
            return (
              <div key={index} className={$breadcrumbs["non-link-crumb"]}>
                {data.name}
              </div>
            );
          }
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsDesign;
