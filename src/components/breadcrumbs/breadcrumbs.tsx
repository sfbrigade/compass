import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import { SelectableForTable } from "zapatos/schema";

const Breadcrumbs = () => {
  const router = useRouter();
  const paths = router.asPath.split("/");

  let personData:
    | SelectableForTable<"student">
    | SelectableForTable<"user">
    | undefined;

  if (paths[1] === "students" && paths[2]) {
    const { data } = trpc.student.getStudentById.useQuery(
      { student_id: paths[2] },
      { enabled: Boolean(paths[2]), retry: false }
    );
    personData = data;
  } else if (paths[1] === "staff" && paths[2]) {
    const { data } = trpc.para.getParaById.useQuery(
      { user_id: paths[2] },
      { enabled: Boolean(paths[2]), retry: false }
    );
    personData = data;
  }

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        left: "200px",
        zIndex: "1",
        padding: "1rem 0 1rem 2rem",
        width: "100vw",
        backgroundColor: "var(--grey-100)",
      }}
    >
      {paths.map((path, index) => {
        if (index === 0) return;
        if (index === 2)
          return (
            <div key={index}>
              / {personData?.first_name} {personData?.last_name}&nbsp;
            </div>
          );
        if (index % 2 === 1)
          return <div key={index}> / {path.toUpperCase()}&nbsp;</div>;
        else return <div key={index}> / {path}&nbsp;</div>;
      })}
    </div>
  );
};

export default Breadcrumbs;
