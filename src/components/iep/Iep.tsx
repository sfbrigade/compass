import { trpc } from "@/client/lib/trpc";
import Goals from "@/components/goal/Goal";
import $button from "@/styles/Button.module.css";
import $input from "@/styles/Input.module.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import noGoals from "../../public/img/no-goals-icon.png";
import $Image from "../../styles/Image.module.css";
import $Iep from "./Iep.module.css";
import { useRef } from "react";

interface IepProps {
  iep_id: string;
}

const Iep = ({ iep_id }: IepProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
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

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const description = formData.get("description") as string;
      const category = formData.get("category") as string;

      goalMutation.mutate({
        iep_id,
        description,
        category,
      });

      (
        formRef.current.elements.namedItem("description") as HTMLInputElement
      ).value = "";
      (
        formRef.current.elements.namedItem("category") as HTMLInputElement
      ).value = "writing";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack sx={{ width: 1 }}>
      <Container>
        <Box className={$Iep.goalBox}>
          <p className={$Iep.goalTab}>Goals &#40;{goals?.length ?? 0}&#41;</p>
          {/* adding new goals // TODO: extract this content elsewhere */}
          <form
            ref={formRef}
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
    </Stack>
  );
};
export default Iep;
