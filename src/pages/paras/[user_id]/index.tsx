import { trpc } from "client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import { useState } from "react";

const ViewParaPage = () => {
  const [archive, setArchive] = useState(false);
  const router = useRouter();
  const { user_id } = router.query;

  const { data: para, isLoading } = trpc.getParaById.useQuery(
    { user_id: user_id as string },
    { enabled: Boolean(user_id) }
  );

  const { mutate } = trpc.unassignPara.useMutation();

  const archivePara = async () => {
    if (!para) {
      return;
    }
    mutate({ para_id: para.user_id });
    await router.push(`/cmDashboard`);
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
        onClick={() => setArchive(true)}
      >
        {" "}
        Archive Para
      </button>

      {archive ? (
        <div>
          <p>
            Are you sure you want to archive {para?.first_name}&nbsp;
            {para?.last_name}?
          </p>
          <button
            className={`${styles.signIn} ${styles.bold}`}
            onClick={() => archivePara()}
          >
            Yes
          </button>
          <button
            className={`${styles.signIn} ${styles.bold}`}
            onClick={() => setArchive(false)}
          >
            No
          </button>
        </div>
      ) : null}

      <div>
        <Link href={`/cmDashboard`}>Return to Case Manager Dashboard</Link>
      </div>
    </div>
  );
};

export default ViewParaPage;
