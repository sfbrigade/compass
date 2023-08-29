import { trpc } from "@/client/lib/trpc";
import React from "react";
import PersonTable from "../table/table";
import { Student, StudentHeadCell } from "../table/tableTypes";

type Iep = {
  end_date: Date;
};

type StudentWithIep = Student & Iep;

const MyStudents = () => {
  const utils = trpc.useContext();
  const { data: students, isLoading } =
    trpc.case_manager.getMyStudentsAndIepInfo.useQuery();

  const { mutate } = trpc.case_manager.addStudent.useMutation({
    onSuccess: () => utils.case_manager.getMyStudentsAndIepInfo.invalidate(),
    // TODO(tessa): In a future PR, we could change this to notification instead of browser alert
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
      grade: data.get("grade") as string,
    });
    // resetting the form this way is only necessary if the form remains visible upon adding a person. due to Materials UI, the reset form(s) will show as "touched" (TT).
    (event.target as HTMLFormElement).reset();
  };

  const headCells: StudentHeadCell[] = [
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
    {
      id: "grade",
      label: "Grade",
      hasInput: true,
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PersonTable
      people={students as StudentWithIep[]}
      onSubmit={handleSubmit}
      headCells={headCells}
      type="Student"
    />
  );
};

export default MyStudents;
