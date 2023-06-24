import { useState } from "react";
import { trpc } from "client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

const ViewParaPage = () => {
  const [unassignParaPrompt, setUnassignParaPrompt] = useState(false);
  const router = useRouter();
  const { user_id } = router.query;

  const { data: para, isLoading } = trpc.para.getParaById.useQuery(
    { user_id: user_id as string },
    { enabled: Boolean(user_id) }
  );

  const unassignPara = trpc.para.unassignPara.useMutation({
    onSuccess: () => router.push(`/cmDashboard`),
    onError: (error) => console.log(error.message),
  });

  const handleUnassignPara = () => {
    if (!para) return;

    unassignPara.mutate({ para_id: para.user_id });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.person}>
      <h1>
        {para?.first_name} {para?.last_name}
      </h1>
      <p>
        <b>Para ID:</b> {para?.user_id}
      </p>
      <p>
        <b>Para Email:</b> {para?.email}
      </p>

      <button
        className={`${styles.signIn} ${styles.bold}`}
        onClick={() => setUnassignParaPrompt(true)}
      >
        Unassign Para
      </button>

      {unassignParaPrompt ? (
        <div>
          <p>
            Are you sure you want to unassign {para?.first_name}{" "}
            {para?.last_name}?
          </p>
          <button
            className={`${styles.signIn} ${styles.bold}`}
            onClick={() => handleUnassignPara()}
          >
            Yes
          </button>
          <button
            className={`${styles.signIn} ${styles.bold}`}
            onClick={() => setUnassignParaPrompt(false)}
          >
            No
          </button>
        </div>
      ) : null}

      <Link href={`/cmDashboard`}>
        <p>CM Dashboard</p>
      </Link>
    </div>
  );
};

export default ViewParaPage;
