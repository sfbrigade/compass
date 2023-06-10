import { useState } from "react";
import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import StudentIEP from "./iep";
import styles from "@/styles/Home.module.css";

const ViewStudentPage = () => {
  const [archive, setArchive] = useState(false);

  const router = useRouter();
  const { student_id } = router.query;

  const { data: student, isLoading } = trpc.student.getStudentById.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

  const { data: ieps } = trpc.getStudentIeps.useQuery({
    student_id: student_id as string,
  });

  const archiveStudent = async () => {
    if (!student) {
      return;
    }
    trpc.unassignStudent
      .useMutation()
      .mutate({ student_id: student.student_id });
    await router.push(`/cmDashboard`);
  };

  const handleIepSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!student) {
      return; // TODO: improve error handling
    }
    trpc.createIep.useMutation().mutate({
      student_id: student.student_id,
      start_date: data.get("start_date") as string,
      end_date: data.get("end_date") as string,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.person}>
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
        Create {student?.first_name} {student?.last_name} IEP:
      </div>
      <div>
        <form onSubmit={handleIepSubmit} className={styles.createInput}>
          <input
            type="text"
            name="start_date"
            placeholder="IEP start date"
            required
          />
          <input
            type="text"
            name="end_date"
            placeholder="IEP end date"
            required
          />
          <button type="submit" className={styles.createButton}>
            Create IEP
          </button>
        </form>
      </div>

      <ul className={styles.listNames}>
        {ieps?.map((iep) => (
          <li key={iep.iep_id}>
            {/* <StudentIEP
              start_date={iep.start_date}
              end_date={iep.end_date}
            /> */}
            <p>IEP ID: {iep.iep_id}</p>
            <p>Start Date: {iep.start_date}</p>
            <p>End Date: {iep.end_date}</p>
            <p>case manager ID: {iep.case_manager_id}</p>
            <br />
          </li>
        ))}
      </ul>

      <div>
        <Link href={`/cmDashboard`}>Return to Student List</Link>
      </div>
    </div>
  );
};

export default ViewStudentPage;
