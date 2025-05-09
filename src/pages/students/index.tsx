import React from "react";

import { trpc } from "@/client/lib/trpc";
import PersonTable, {
  StudentWithIep,
  StudentWithIepHeadcell,
} from "@/components/table/table";

const Students = () => {
  const utils = trpc.useContext();
  const { data: students, isLoading } =
    trpc.case_manager.getMyStudentsAndIepInfo.useQuery();

  const createStudent = trpc.case_manager.addStudent.useMutation({
    onSuccess: () => utils.case_manager.getMyStudentsAndIepInfo.invalidate(),
    // TODO(tessa): In a future PR, we could change this to notification instead of browser alert
    onError: (err) => {
      // err allows one to access validation, code, message, and path
      // JSON.parse is utilized because err.message is a string
      try {
        const formattedErr = JSON.parse(err.message) as {
          validation: string;
          code: string;
          message: string;
          path: string[];
        }[];

        if (formattedErr[0].message == "Invalid email") {
          alert("The provided email is in the incorrect format- please edit.");
        }
        //  can later insert other error messages here, as needed
        else {
          alert("An error has occurred.");
        }
      } catch {
        alert(
          `This student is already assigned to a case manager. Please check your roster if the student is already there. Otherwise, this student is with another case manager.`
        );
      }
    },
  });

  // create editStudent

  // make a separate handleEdit??

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await createStudent.mutateAsync({
        first_name: data.get("first_name") as string,
        last_name: data.get("last_name") as string,
        email: data.get("email") as string,
        grade: Number(data.get("grade")),
      });
      // resetting the form this way is only necessary if the form remains visible upon adding a person. due to Materials UI, the reset form(s) will show as "touched" (TT).
      (event.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
    }
  };

  const headCells: StudentWithIepHeadcell[] = [
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
    {
      id: "end_date",
      label: "IEP End Date",
      hasInput: false,
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
      type="Students"
    />
  );
};

export default Students;
