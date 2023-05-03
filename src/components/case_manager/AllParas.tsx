import { trpc } from "client/lib/trpc";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Dashboard.module.css";
import { Input, handleSubmit } from "../studentParaForm";

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

  return (
    <div>
      <>
        <Input />
      </>

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

/*     {/* <div className={styles.createContainer}>
        <h2 className={styles.createTitle}>Create a Para</h2>

        <form onSubmit={handleSubmit} className={styles.createInput}>
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            required
          />
          <input type="email" name="email" placeholder="Email" required />
          <button type="submit" className={styles.createButton}>
            Create
          </button>
        </form>
      </div> */
