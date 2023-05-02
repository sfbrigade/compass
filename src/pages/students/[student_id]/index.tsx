import { trpc } from "client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";

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
        {student?.first_name} {student?.last_name}
      </h1>
      <p>
        <b>Student ID:</b> {student?.student_id}
      </p>
      <p>
        <b>Student Email:</b> {student?.email}
      </p>

      <div>
        <Link href={`/cmDashboard`}>Return to Student List</Link>
      </div>
    </div>
  );
};

export default ViewStudentPage;
