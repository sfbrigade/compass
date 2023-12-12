import { trpc } from "@/client/lib/trpc";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/router";
import { SelectableForTable } from "zapatos/schema";
import $breadcrumbs from "./Breadcrumbs.module.css";

type Student = SelectableForTable<"student">;
type Para = SelectableForTable<"user">;

const BreadcrumbsNav = () => {
  const router = useRouter();
  const paths = router.asPath.split("/");

  // student and para queries will only runs if enabled options are both true
  // Only 1 of these will run at a time
  const { data: student } = trpc.student.getStudentById.useQuery(
    { student_id: paths[2] },
    { enabled: Boolean(paths[2] && paths[1] === "students") }
  );
  const { data: para } = trpc.para.getParaById.useQuery(
    { user_id: paths[2] },
    { enabled: Boolean(paths[2] && paths[1] === "staff") }
  );

  const personData: Student | Para | undefined = student || para;

  // An array of breadcrumbs fixed to students/staff as the first index. This will be modified depending on how the address bar will be displayed.
  const breadcrumbs = paths.map((path, index) => {
    console.log("path ", path, index);
    // 0th index seems to only be empty string
    if (index === 0) return "";
    // 1st index currently is either students or staff
    if (index % 2 === 1) {
      return (
        <Link key={index} href={`/${path}`} className={$breadcrumbs.link}>
          {path.toUpperCase()}
        </Link>
      );
    }
    // 2nd index is the ID referencing 1st index
    if (index === 2) {
      return (
        <div key={index} style={{ color: "var(--grey-10)" }}>
          {personData?.first_name} {personData?.last_name}
        </div>
      );
    }
    return <div key={index}>{path}</div>;
  });

  return (
    <div className={$breadcrumbs.container}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsNav;
