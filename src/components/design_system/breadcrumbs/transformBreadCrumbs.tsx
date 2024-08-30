import Link from "next/link";
import $breadcrumbs from "./Breadcrumbs.module.css";
import { PersonData } from "./usePersonData";

export const transformPaths = ({
  fullPath,
  personData,
}: {
  fullPath: string;
  personData: PersonData;
}) => {
  return fullPath.split("/").map((path, index) => {
    // 0th index seems to only be empty string
    if (index === 0) return "";
    // 1st index currently is either students or staff
    if (index % 2 === 1) {
      return (
        <Link key={index} href={`/${path}`} className={$breadcrumbs.link}>
          {
            path.toUpperCase() /* TODO ALL CAPS is generally bad for a11y; revisit this. */
          }
        </Link>
      );
    }
    // 2nd index is the ID referencing 1st index
    if (index === 2) {
      return (
        <div key={index} className={$breadcrumbs["non-link-crumb"]}>
          {personData?.first_name} {personData?.last_name}
        </div>
      );
    }
    return <div key={index}>{path}</div>;
  });
};
