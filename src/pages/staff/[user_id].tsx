import { useState } from "react";
import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import $home from "@/styles/Home.module.css";
import $button from "@/styles/Button.module.css";

const ViewParaPage = () => {
  const [unassignParaPrompt, setUnassignParaPrompt] = useState(false);
  const router = useRouter();
  const { user_id } = router.query;
  const { data: me } = trpc.user.getMe.useQuery();

  const { data: para, isLoading } = trpc.para.getParaById.useQuery(
    { user_id: user_id as string },
    { enabled: Boolean(user_id) }
  );

  const unassignPara = trpc.case_manager.removePara.useMutation({
    onError: (error) => console.log(error.message),
  });

  const handleUnassignPara = async () => {
    if (!para) return;

    await unassignPara.mutateAsync({ para_id: para.user_id });
    await router.push(`/staff`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {para?.first_name} {para?.last_name}
      </h1>
      <p>
        <b>Para ID:</b> {para?.user_id}
      </p>
      <p>
        <b>Para Email:</b> {para?.email}
      </p>

      {me?.user_id !== user_id && (
        <button
          className={`${$button.default} ${$home.bold}`}
          onClick={() => setUnassignParaPrompt(true)}
        >
          Unassign Para
        </button>
      )}

      {unassignParaPrompt ? (
        <div>
          <p>
            Are you sure you want to unassign
            {para?.first_name} {para?.last_name}?
          </p>
          <button
            className={`${$button.default} ${$home.bold}`}
            onClick={() => handleUnassignPara()}
          >
            Yes
          </button>
          <button
            className={`${$button.default} ${$home.bold}`}
            onClick={() => setUnassignParaPrompt(false)}
          >
            No
          </button>
        </div>
      ) : null}

      <Link href={`/staff`}>
        <p>Return to Staff List</p>
      </Link>
    </div>
  );
};

export default ViewParaPage;
