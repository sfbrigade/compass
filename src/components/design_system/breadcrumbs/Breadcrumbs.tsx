import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useRouter } from "next/router";
import $breadcrumbs from "./Breadcrumbs.module.css";
import { transformPaths, BreadcrumbData } from "./transformBreadCrumbs";
import { usePersonData } from "./usePersonData";
import Link from "next/link";

export const BreadcrumbNav = ({
  data,
  key,
  isCurrentPage,
}: {
  data: BreadcrumbData;
  key: number;
  isCurrentPage: boolean;
}) => {
  if (!isCurrentPage && data.linkable) {
    return (
      <Link key={key} href={data.path} className={$breadcrumbs.link}>
        {data.name}
      </Link>
    );
  } else {
    return (
      <div key={key} className={$breadcrumbs["non-link-crumb"]}>
        {data.name}
      </div>
    );
  }
};

const BreadcrumbsNav = () => {
  const { query, asPath } = useRouter();
  const personData = usePersonData(query as Record<string, string>);

  // An array of breadcrumbs fixed to students/staff as the first index. This will be modified depending on how the address bar will be displayed.
  const breadcrumbs = transformPaths({ fullPath: asPath, personData });

  return (
    <div className={$breadcrumbs.container}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {breadcrumbs.map((data, index) => {
          return (
            <BreadcrumbNav
              data={data}
              key={index}
              isCurrentPage={index + 1 === breadcrumbs.length}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsNav;
