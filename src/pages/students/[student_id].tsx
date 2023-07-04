import { useState } from "react";
import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

const ViewStudentPage = () => {
  const [archive, setArchive] = useState(false);
  const utils = trpc.useContext();

  const router = useRouter();
  const { student_id } = router.query;

  const { data: student, isLoading } = trpc.student.getStudentById.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

  const { data: ieps } = trpc.student.getIeps.useQuery(
    {
      student_id: student_id as string,
    },
    {
      enabled: Boolean(student_id),
    }
  );

  const archiveMutation = trpc.student.unassignStudent.useMutation();
  const archiveStudent = async () => {
    if (!student) {
      return;
    }
    await archiveMutation.mutateAsync({ student_id: student.student_id });
    await router.push(`/cmDashboard`);
  };

  const iepMutation = trpc.student.addIep.useMutation({
    onSuccess: () => utils.student.getIeps.invalidate(),
  });
  const handleIepSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!student) {
      return; // TODO: improve error handling
    }
    iepMutation.mutate({
      student_id: student.student_id,
      start_date: new Date(data.get("start_date") as string),
      end_date: new Date(data.get("end_date") as string),
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

      <div>Create IEP:</div>
      <div>
        <form onSubmit={handleIepSubmit} className={styles.createInput}>
          <input
            type="date"
            name="start_date"
            placeholder="IEP start date"
            required
          />
          <input
            type="date"
            name="end_date"
            placeholder="IEP end date"
            required
          />
          <button type="submit" className={styles.createButton}>
            Create IEP
          </button>
        </form>
      </div>

      <br />
      <ul className={styles.listNames}>
        {ieps?.map((iep) => (
          <li key={iep.iep_id}>
            <Link href={`/iep/${iep.iep_id}`}>IEP</Link>
            <p>IEP ID: {iep.iep_id}</p>- Start Date:{" "}
            {new Date(iep.start_date ?? "").toLocaleDateString()} <br />- End
            Date: {new Date(iep.end_date ?? "").toLocaleDateString()} <br />-
            CM: {iep.case_manager_id} <br />
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
