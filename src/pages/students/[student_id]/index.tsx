import { useState } from "react";
import { trpc } from "client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";

const ViewStudentPage = () => {
  const [archive, setArchive] = useState(false);

  const router = useRouter();
  const { student_id } = router.query;

  const { data: student, isLoading } = trpc.getStudentById.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

  const { mutate } = trpc.archiveStudent.useMutation();

  const archiveStudent = async () => {
    mutate({
      student_id: student?.student_id || "",
    });

    await router.push(`/cmDashboard`);
  };

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
      <button
        className={`${styles.signIn} ${styles.bold}`}
        onClick={() => setArchive(true)}
      >
        Archive Student
      </button>

      {archive ? (
        <div>
          <p>
            Are you sure you want to archive {student?.first_name}{" "}
            {student?.last_name}?
          </p>
          <button
            className={`${styles.signIn} ${styles.bold}`}
            onClick={() => archiveStudent()}
          >
            Yes
          </button>
          <button
            className={`${styles.signIn} ${styles.bold}`}
            onClick={() => setArchive(false)}
          >
            No
          </button>
        </div>
      ) : null}

      <div>
        <Link href={`/cmDashboard`}>Return to Student List</Link>
      </div>
    </div>
  );
};

export default ViewStudentPage;
