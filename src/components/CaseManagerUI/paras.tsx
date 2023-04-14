import { trpc } from "client/lib/trpc";
import Link from "next/link";
import React from "react";

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
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ border: "1px solid black", borderRadius: "5px", padding: "5px" }}
    >
      <h2>Create a Para</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          required
        />
        <input type="text" name="last_name" placeholder="Last name" required />
        <button type="submit">Create</button>
      </form>

      <h2>All Paras</h2>
      <ul>
        {paras?.map((para) => (
          <li key={para.para_id}>
            <Link href={`/paras/${para.para_id}`}>
              {para.first_name} {para.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllParasPage;
