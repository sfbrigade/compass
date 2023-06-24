import { trpc } from "@/client/lib/trpc";
import Link from "next/link";
import React from "react";
import styles from "@/styles/Dashboard.module.css";
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

  const headCells = [
    {
      id: "first_name",
      label: "First Name",
    },
    {
      id: "last_name",
      label: "Last Name",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "dateAdded",
      label: "Date Added",
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PersonTable
      people={students}
      onSubmit={handleSubmit}
      headCells={headCells}
    />
  );
};

export default MyStudentsPage;
