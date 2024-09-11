import { useRouter } from "next/router";
import { usePersonData } from "./usePersonData";
import BreadcrumbsDesign from "./Breadcrumbs";

const BreadcrumbsNav = () => {
  const { query, asPath } = useRouter();
  const personData = usePersonData(query as Record<string, string>);

  return <BreadcrumbsDesign fullPath={asPath} personData={personData} />;
};

export default BreadcrumbsNav;
