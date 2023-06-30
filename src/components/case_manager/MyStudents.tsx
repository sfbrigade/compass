import { trpc } from "@/client/lib/trpc";
import React from "react";
import PersonTable from "./PersonTable";
import { Student, HeadCell } from "./types/table";

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

  const headCells: HeadCell[] = [
    {
      id: "first_name",
      label: "First Name",
      hasInput: true,
    },
    {
      id: "last_name",
      label: "Last Name",
      hasInput: true,
    },
    {
      id: "email",
      label: "Email",
      hasInput: true,
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PersonTable
      people={students as Student[]}
      onSubmit={handleSubmit}
      headCells={headCells}
      type="Student"
    />
  );
};

export default MyStudentsPage;
