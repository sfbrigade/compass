import { trpc } from "@/client/lib/trpc";
import Goals from "@/components/goal/Goal";
import $button from "@/styles/Button.module.css";
import $input from "@/styles/Input.module.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Image from "next/image";
import noGoals from "../../public/img/no-goals-icon.png";
import $Iep from "./Iep.module.css";
import $Image from "../../styles/Image.module.css";

interface IepProps {
  iep_id: string;
}

const Iep = ({ iep_id }: IepProps) => {
  const utils = trpc.useContext();

  const { data: goals, isLoading } = trpc.iep.getGoals.useQuery(
    { iep_id: iep_id },
    { enabled: Boolean(iep_id) }
  );

  const goalMutation = trpc.iep.addGoal.useMutation({
    onSuccess: () => utils.iep.getGoals.invalidate(),
  });

  const handleGoalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    goalMutation.mutate({
      iep_id: iep_id,
      description: data.get("description") as string,
      category: data.get("category") as string,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Box className={$Iep.goalBox}>
          <p className={$Iep.goalTab}>Goals &#40;{goals?.length ?? 0}&#41;</p>
          {/* adding new goals // TODO: extract this content elsewhere */}
          <form
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "flex-end",
            }}
            onSubmit={handleGoalSubmit}
          >
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
        </Box>
      </Container>

      {/* List of goals */}
      {goals?.length ? (
        <Container className={$Iep.goalsContainer}>
          <ul>
            {goals.map((goal) => (
              <List key={goal.goal_id}>
                <Goals goal={goal} />
              </List>
            ))}
          </ul>
        </Container>
      ) : (
        // No Goal in DB yet
        <Container className={$Iep.goalsContainer}>
          <Box className={$Iep.noGoalBox}>
            <Image
              src={noGoals}
              alt="no goals image"
              className={$Image.fitContent}
            />
            <p className={$Iep.noGoalText}>No goals yet</p>
            <p className={$Iep.noGoalTextSmall}>
              Start adding goals to set up your student&#39;s profile
            </p>
            {/* // TODO: Modify add goal function here. */}
            <button className={`${$button.default}`}>Add goal</button>
          </Box>
        </Container>
      )}
    </>
  );
};
export default Iep;
