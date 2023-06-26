import { trpc } from "client/lib/trpc";
import React from "react";
// import styles from "../../styles/Dashboard.module.css";
// import Link from "next/link";
// import PersonCreationForm from "./PersonCreationForm";
import PersonTable from "./PersonTable";
import { HeadCell, Para } from "./types/table";

const AllParasPage = () => {
  const utils = trpc.useContext();
  const { data: paras, isLoading } = trpc.para.getAllParas.useQuery();
  const { mutate } = trpc.para.createPara.useMutation({
    onSuccess: () => {
      return utils.para.getAllParas.invalidate();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    mutate({
      first_name: data.get("first_name") as string,
      last_name: data.get("last_name") as string,
      email: data.get("email") as string,
      role: "staff",
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
    {
      id: "phone",
      label: "Phone number",
      hasInput: true,
    },
    {
      id: "active_benchmarks",
      label: "# Active Benchmarks",
      hasInput: false,
    },
    {
      id: "last_update",
      label: "Last Update",
      hasInput: false,
    },
    {
      id: "dateAdded",
      label: "Date Added",
      hasInput: false,
    },
  ];

  return (
    // <div>
    //   <PersonCreationForm title={"Add a Para"} onSubmit={handleSubmit} />

    //   <h2>All Paras</h2>
    //   <ul className={styles.listNames}>
    //     {paras?.map((para) => (
    //       <li key={para.user_id}>
    //         <Link href={`/paras/${para.user_id}`}>
    //           {para.first_name} {para.last_name}
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
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

export default AllParasPage;
