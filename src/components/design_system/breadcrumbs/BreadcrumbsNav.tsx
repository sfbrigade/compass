import { useRouter } from "next/router";
import { useBreadcrumbContext } from "./useBreadcrumbContext";
import BreadcrumbsDesign from "./Breadcrumbs";

const BreadcrumbsNav = () => {
  const { query, asPath } = useRouter();
  const contextData = useBreadcrumbContext(query as Record<string, string>);

  return <BreadcrumbsDesign fullPath={asPath} contextData={contextData} />;
};

export default BreadcrumbsNav;
