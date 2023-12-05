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

  const { data: student } = trpc.student.getStudentById.useQuery(
    { student_id: paths[2] },
    { enabled: Boolean(paths[2]), retry: false }
  );
  const { data: para } = trpc.para.getParaById.useQuery(
    { user_id: paths[2] },
    { enabled: Boolean(paths[2]), retry: false }
  );

  const personData: Student | Para | undefined = student || para;

  // An array of breadcrumbs fixed to students/staff as the first index. This will be modified depending on how the address bar will be displayed.
  const breadcrumbs = paths.map((path, index) => {
    if (index === 0) return "";
    if (index % 2 === 1) {
      return (
        <Link key={index} href={`/${path}`} className={$breadcrumbs.link}>
          {path.toUpperCase()}
        </Link>
      );
    }
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
