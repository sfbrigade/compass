import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Iep.module.css";
import Goals from "@/components/Goal";

const Iep = () => {
  const router = useRouter();
  const utils = trpc.useContext();

  const { iep_id } = router.query;

  const { data: goals, isLoading } = trpc.iep.getGoals.useQuery(
    {
      iep_id: iep_id as string,
    },
    {
      enabled: Boolean(iep_id),
    }
  );

  const goalMutation = trpc.iep.addGoal.useMutation({
    onSuccess: () => utils.iep.getGoals.invalidate(),
  });

  const handleGoalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    goalMutation.mutate({
      iep_id: iep_id as string,
      description: data.get("description") as string,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>IEP ID: {iep_id}</h1>

      <h2>Goals</h2>
      <ul>
        {goals?.map((goal, idx) => (
          <li key={goal.goal_id}>
            <h3>Goal {idx + 1}</h3>
            <div>Goal ID: {goal.goal_id}</div>
            <p>{goal.description}</p>
            <Goals goal={goal} />
            <br />
          </li>
        ))}
      </ul>

      <div>
        <form onSubmit={handleGoalSubmit} className={styles.createInput}>
          <input
            type="text"
            name="description"
            placeholder="Goal description"
            required
          />
          <button type="submit" className={styles.createButton}>
            Add Goal
          </button>
        </form>
      </div>

      <br />
      <Link href={`/cmDashboard`}>Back to My Students Page</Link>
    </div>
  );
};
export default Iep;
