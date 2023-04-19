import { trpc } from "client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";

const ViewParaPage = () => {
  const router = useRouter();
  const { user_id } = router.query;

  const { data: para, isLoading } = trpc.getParaById.useQuery(
    { user_id: user_id as string },
    { enabled: Boolean(user_id) }
  );

  const utils = trpc.useContext();
  const { mutate } = trpc.deletePara.useMutation({
    onSuccess: () => utils.getAllParas.invalidate(),
  });

  //removes Para and redirects to CM Dashboard
  const handleRemovePara = (paraId?: string) => {
    if (paraId) {
      mutate({
        user_id: paraId,
      });
    }
    router.push("../cmDashboard").catch((err) => console.log(err));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href={`/cmDashboard`}>
        <p>CM Dashboard</p>
      </Link>
      <h1>Para {para?.user_id}</h1>
      <button
        type="button"
        onClick={() => {
          handleRemovePara(para?.user_id);
        }}
        style={{
          backgroundColor: "#5347D7",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Remove Para
      </button>
      <p>
        {para?.first_name} {para?.last_name}
      </p>
    </div>
  );
};

export default ViewParaPage;
