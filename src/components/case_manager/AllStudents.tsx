import { trpc } from "client/lib/trpc";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Dashboard.module.css";
import PersonCreationForm from "./PersonCreationForm";

const AllStudentsPage = () => {
  const utils = trpc.useContext();
  const { data: students, isLoading } = trpc.getMyStudents.useQuery();

  const { mutate } = trpc.createStudentOrAssignManager.useMutation({
    onSuccess: () => utils.getMyStudents.invalidate(),
    //in future PR, we could change this to notification instead of browser alert [tessa]
    onError: (error) => alert(error.message),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    mutate({
      first_name: data.get("first_name") as string,
      last_name: data.get("last_name") as string,
      email: data.get("email") as string,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PersonCreationForm title={"Create a Student"} onSubmit={handleSubmit} />

      <h2>All students</h2>
      <ul className={styles.listNames}>
        {students?.map((student) => (
          <li key={student.student_id}>
            <Link href={`/students/${student.student_id}`}>
              {student.first_name} {student.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllStudentsPage;
