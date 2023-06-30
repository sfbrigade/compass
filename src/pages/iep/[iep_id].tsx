import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Goals from "../../components/Goal";

interface IepProps {
  iep_id: string | string[] | undefined;
}

const Iep: React.FC<IepProps> = ({ iep_id }) => {
  const router = useRouter();
  const utils = trpc.useContext();

  if (!iep_id) {
    iep_id = router.query.iep_id;
  }

  // TODO: When doing a full page reload ignoring cache (cmd+shift+r), two trpc calls are issued - one with empty
  // "iep_id" and a second with the param populated. Figure out how to avoid the error.
  // https://github.com/vercel/next.js/discussions/11484
  const { data: goals, isLoading } = trpc.iep.getGoals.useQuery({
    iep_id: iep_id as string,
  });

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
            placeholder="goal description"
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
