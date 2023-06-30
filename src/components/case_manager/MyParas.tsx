import { trpc } from "@/client/lib/trpc";
import React from "react";
import PersonTable from "./PersonTable";
import { HeadCell, Para } from "./types/table";

const MyParas = () => {
  const utils = trpc.useContext();
  const { data: paras, isLoading } = trpc.para.getMyParas.useQuery();

  const createPara = trpc.para.createPara.useMutation({
    onSuccess: () => utils.para.getMyParas.invalidate(),
    onSettled: (data, error) => {
      if (error) console.log(error.message);

      assignParaToCaseManager.mutate({
        para_id: data?.user_id as string,
      });
    },
  });

  const assignParaToCaseManager = trpc.para.assignParaToCaseManager.useMutation(
    {
      onSuccess: () => utils.para.getMyParas.invalidate(),
      onError: (error) => console.log(error.message),
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    createPara.mutate({
      first_name: data.get("first_name") as string,
      last_name: data.get("last_name") as string,
      email: data.get("email") as string,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

  return (
    <>
      <PersonTable
        people={paras as Para[]}
        onSubmit={handleSubmit}
        headCells={headCells}
        type="Staff"
      />
    </>
  );
};

export default MyParas;
