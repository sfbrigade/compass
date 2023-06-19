import { trpc } from "client/lib/trpc";
import React from "react";
import styles from "../../styles/Dashboard.module.css";
import Link from "next/link";
import PersonCreationForm from "./PersonCreationForm";

const AllParasPage = () => {
  const utils = trpc.useContext();
  const { data: paras, isLoading } = trpc.para.getMyParas.useQuery();

  const createPara = trpc.para.createPara.useMutation({
    onSuccess: () => {
      return utils.para.getMyParas.invalidate();
    },
    onError: (error) => error.message,
  });

  const assignParaToCaseManager = trpc.para.assignParaToCaseManager.useMutation(
    {
      onSuccess: () => utils.para.getMyParas.invalidate(),
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

    assignParaToCaseManager.mutate({
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
              {para.first_name} {para.last_name}&nbsp;
            </Link>
            {!para.email_verified_at ? ` - not verified` : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllParasPage;
