import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Iep.module.css";
import Goals from "@/components/Goal";
import $button from "@/styles/Button.module.css";
import $input from "@/styles/Input.module.css";

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
      category: data.get("category") as string,
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
        {goals?.map((goal) => (
          <li key={goal.goal_id}>
            <Goals goal={goal} />
          </li>
        ))}
      </ul>

      <div>
        <form onSubmit={handleGoalSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Goal description"
            className={$input.default}
            required
          />
          <select name="category">
            <option value="writing">writing</option>
            <option value="reading">reading</option>
            <option value="math">math</option>
            <option value="other">other</option>
          </select>
          <button type="submit" className={$button.default}>
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
