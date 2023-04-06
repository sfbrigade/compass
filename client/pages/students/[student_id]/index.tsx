import { trpc } from "@/lib/trpc";
import Link from "next/link";
import { useRouter } from "next/router";

const ViewStudentPage = () => {
  const router = useRouter();
  const { student_id } = router.query;

  const { data: student, isLoading } = trpc.getStudentById.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        Name: {student?.first_name} {student?.last_name}
      </h1>
      <h3>Student ID: {student?.student_id}</h3>
      <h3>Student email: {student?.email}</h3>

      <div>
        <Link href={"/students"}>Return to Student List</Link>
      </div>
    </div>
  );
};

export default ViewStudentPage;
