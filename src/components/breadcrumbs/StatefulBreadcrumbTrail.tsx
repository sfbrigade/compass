import { useRouter } from "next/router";
import { useBreadcrumbContext } from "./StatefulBreadcrumbTrailContext";
import BreadcrumbTrail from "@/components/design_system/breadcrumbs/BreadcrumbTrail";

const StatefulBreadcrumbTrail = () => {
  const { query, asPath } = useRouter();
  const contextData = useBreadcrumbContext(query as Record<string, string>);

  return <BreadcrumbTrail fullPath={asPath} contextData={contextData} />;
};

export default StatefulBreadcrumbTrail;
