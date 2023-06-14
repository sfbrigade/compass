import { trpc } from "client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Goals from "../../components/Goal";

interface StudentIEPProps {
  first_name: string | undefined;
  last_name: string | undefined;
}

const StudentIEP: React.FC<StudentIEPProps> = ({ first_name, last_name }) => {
  const router = useRouter();
  const utils = trpc.useContext();

  const { iep_id } = router.query;

  // TODO: When doing a full page reload ignoring cache, two trpc calls are issued - one with empty
  // "iep_id" and a second with the param populated. Figure out how to avoid the error.
  // https://github.com/vercel/next.js/discussions/11484
  const { data: goals, isLoading } = trpc.student.getGoalsFromIep.useQuery({
    iep_id: iep_id as string,
  });

  const goalMutation = trpc.student.addGoal.useMutation({
    onSuccess: () => utils.student.getStudentIeps.invalidate(),
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

      <div>
        <form onSubmit={handleGoalSubmit} className={styles.createInput}>
          <input
            type="text"
            name="description"
            placeholder="description stuff"
            required
          />
          <button type="submit" className={styles.createButton}>
            Add Goal
          </button>
        </form>
      </div>

      <h3>Goals section</h3>
      {goals?.map((goal) => (
        <li key={goal.goal_id}>
          <h2>Goal</h2>
          <div>Goal ID: {goal.goal_id}</div>
          <p>{goal.description}</p>
          <Goals goal={goal} />
        </li>
      ))}

      <br />
      <Link href={`/cmDashboard`}>Back to My Students Page</Link>
    </div>
  );
};
export default StudentIEP;
