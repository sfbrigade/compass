import { trpc } from "client/lib/trpc";
import React from "react";
import styles from "../../styles/Dashboard.module.css";
import Link from "next/link";
import PersonCreationForm from "./PersonCreationForm";

const AllParasPage = () => {
  const utils = trpc.useContext();
  const { data: paras, isLoading } = trpc.para.getAllParas.useQuery();

  const assignParaToCaseManager = trpc.para.assignParaToCaseManager.useMutation(
    {
      onSuccess: () => {
        return utils.para.getAllParas.invalidate();
      },
      onError: (error) => alert(error.message),
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    assignParaToCaseManager.mutate({
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
      <PersonCreationForm title={"Add a Para"} onSubmit={handleSubmit} />

      <h2>All Paras</h2>
      <ul className={styles.listNames}>
        {paras?.map((para) => (
          <li key={para.user_id}>
            <Link href={`/paras/${para.user_id}`}>
              {para.first_name} {para.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllParasPage;
