import { trpc } from "@/client/lib/trpc";
import React from "react";
import PersonTable, { Para, ParaHeadCell } from "@/components/table/table";

const Staff = () => {
  const utils = trpc.useContext();
  const { data: paras, isLoading } = trpc.case_manager.getMyParas.useQuery();

  const createPara = trpc.para.createPara.useMutation({
    onSuccess: async (data) => {
      await assignParaToCaseManager.mutateAsync({
        para_id: data?.user_id as string,
      });
    },
  });

  const assignParaToCaseManager = trpc.case_manager.addPara.useMutation({
    onSuccess: () => utils.case_manager.getMyParas.invalidate(),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await createPara.mutateAsync({
        first_name: data.get("first_name") as string,
        last_name: data.get("last_name") as string,
        email: data.get("email") as string,
      });
      // resetting the form this way is only necessary if the form remains visible upon adding a person. due to Materials UI, the reset form(s) will show as "touched" (TT).
      (event.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const headCells: ParaHeadCell[] = [
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

  return (
    <PersonTable
      people={paras as Para[]}
      onSubmit={handleSubmit}
      headCells={headCells}
      type="Staff"
    />
  );
};

export default Staff;
