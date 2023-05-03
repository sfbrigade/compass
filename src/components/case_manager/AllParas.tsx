import { trpc } from "client/lib/trpc";
import React from "react";
import StudentParaForm from "./StudentParaForm";

const AllParasPage = () => {
  const utils = trpc.useContext();
  const { data: paras, isLoading } = trpc.getAllParas.useQuery();
  const { mutate } = trpc.createPara.useMutation({
    onSuccess: () => utils.getAllParas.invalidate(),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    mutate({
      first_name: data.get("first_name") as string,
      last_name: data.get("last_name") as string,
      email: data.get("email") as string,
      role: "para",
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  //this works to pass in the para form, and return the data from the form, but typescript is not happy with it even though it works.
  return (
    <StudentParaForm
      title={"Create a Para"}
      endpoint={"/paras/"}
      handleSubmit={handleSubmit}
      listTitle={"All Paras"}
      entities={paras}
    />
  );
};

export default AllParasPage;
