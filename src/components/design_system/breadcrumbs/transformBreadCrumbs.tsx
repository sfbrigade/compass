import { PersonData } from "./usePersonData";

export interface BreadcrumbData {
  name: string;
  path: string;
  linkable: boolean;
}

export const transformPaths = ({
  fullPath,
  personData,
}: {
  fullPath: string;
  personData: PersonData;
}): BreadcrumbData[] => {
  return fullPath
    .split("/")
    .map((path, index) => {
      // 0th index seems to only be empty string
      if (index === 0) return null; // TODO Refactor so there is no first empty path element.

      // 1st index currently is either students or staff
      if (index % 2 === 1) {
        return {
          name: path.toUpperCase(),
          path: path,
          linkable: true,
        } as BreadcrumbData;
      }

      // 2nd index is the ID referencing 1st index
      if (index === 2) {
        return {
          name: `${personData?.first_name ?? ""} ${
            personData?.last_name ?? ""
          }`,
          path: path,
          linkable: false,
        } as BreadcrumbData;
      }
      return {
        name: path.toUpperCase(),
        path: path,
        linkable: false,
      } as BreadcrumbData;
    })
    .filter((nullable) => nullable !== null); // TODO Remove filter
};
