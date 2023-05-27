import { trpc } from "client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";

const ViewParaPage = () => {
  const router = useRouter();
  const { user_id } = router.query;

  const { data: para, isLoading } = trpc.getParaById.useQuery(
    { user_id: user_id as string },
    { enabled: Boolean(user_id) }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.person}>
      <Link href={`/cmDashboard`}>
        <p>CM Dashboard</p>
      </Link>
      <h1>Para {para?.user_id}</h1>
      <p>
        {para?.first_name} {para?.last_name}
      </p>
    </div>
  );
};

export default ViewParaPage;
