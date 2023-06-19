import { trpc } from "client/lib/trpc";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Dashboard.module.css";
import PersonCreationForm from "./PersonCreationForm";
import PersonTable from "./PersonTable";

const MyStudentsPage = () => {
  const utils = trpc.useContext();
  const { data: students, isLoading } = trpc.student.getMyStudents.useQuery();

  const { mutate } = trpc.student.createStudentOrAssignManager.useMutation({
    onSuccess: () => utils.student.getMyStudents.invalidate(),
    //in future PR, we could change this to notification instead of browser alert [tessa]
    onError: () =>
      alert(
        `This student is already assigned to a case manager. Please check your roster if the student is already there. Otherwise, this student is with another case manager.`
      ),
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
    // <div>
    //   {/* <PersonCreationForm title={"Add a Student"} onSubmit={handleSubmit} />

    //   <h2>My students</h2>
    //   <ul className={styles.listNames}>
    //     {students?.map((student) => (
    //       <li key={student.student_id}>
    //         <Link href={`/students/${student.student_id}`}>
    //           {student.first_name} {student.last_name}
    //         </Link>
    //       </li>
    //     ))}
    //   </ul> */}
    //   <div>
    //     <PersonTable />
    //   </div>
    // </div>
    <PersonTable />
  );
};

export default MyStudentsPage;
