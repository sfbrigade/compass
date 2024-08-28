import { trpc } from "@/client/lib/trpc";
import Goals from "@/components/goal/Goal";
import $button from "@/components/design_system/button/Button.module.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Grid from "@mui/material/Grid";

import Stack from "@mui/material/Stack";
import Image from "next/image";
import noGoals from "../../public/img/no-goals-icon.png";
import $Image from "../../styles/Image.module.css";
import $Iep from "./Iep.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

interface IepProps {
  iep_id: string;
}

const Iep = ({ iep_id }: IepProps) => {
  const utils = trpc.useContext();

  const { data: goals, isLoading } = trpc.iep.getGoals.useQuery(
    { iep_id: iep_id },
    { enabled: Boolean(iep_id) }
  );

  const router = useRouter();

  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [addGoalInput, setAddGoalInput] = useState("");

  const goalMutation = trpc.iep.addGoal.useMutation({
    onSuccess: () => utils.iep.getGoals.invalidate(),
  });

  const handleGoalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // removing category from input options, not part of MVP
    goalMutation.mutate({
      iep_id: iep_id,
      description: data.get("description") as string,
      category: "other",
      // category: data.get("category") as string,
    });

    setAddGoalInput("");
    setShowAddGoalForm(false);
  };

  const cancelAddGoal = () => {
    setAddGoalInput("");
    setShowAddGoalForm(false);
  };

  const revealAddGoalForm = () => {
    setShowAddGoalForm(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack sx={{ width: 1 }} style={{ maxWidth: "1200px" }}>
      <Grid container justifyContent="space-between">
        <p className={$Iep.goalTab}>Goals &#40;{goals?.length ?? 0}&#41;</p>
        {!showAddGoalForm && (
          <div>
            <button onClick={revealAddGoalForm} className={$button.default}>
              Add Goal
            </button>
          </div>
        )}
      </Grid>

      {/* List of goals */}
      {((goals && goals?.length >= 1) || showAddGoalForm) && (
        <Grid container className={$Iep.goalsContainer}>
          <Grid item md={showAddGoalForm ? 5 : 12}>
            <List>
              {showAddGoalForm && (
                <ListItem
                  key="adding-goal"
                  style={{ borderBottom: "1px solid var(--outline)" }}
                >
                  <div
                    style={{
                      padding: "24px",
                      fontStyle: "italic",
                      color: "var(--grey-40)",
                    }}
                  >
                    Adding new goal...
                  </div>
                </ListItem>
              )}
              {goals?.map((goal) => (
                <ListItem
                  key={goal.goal_id}
                  style={{ padding: 0 }}
                  className={$Iep.listGoal}
                  onClick={async () => {
                    await router.push(`${router.asPath}/goals/${goal.goal_id}`);
                  }}
                >
                  <Container>
                    <Goals goal={goal} />
                  </Container>
                </ListItem>
              ))}
            </List>
          </Grid>
          {showAddGoalForm && (
            <Grid item className={$Iep.addGoalFormContainer} md={7}>
              <div className={$Iep.addGoalFormHeading}>Add IEP goal</div>
              <p>Enter the goal as it appears on the student’s IEP</p>
              <form style={{ marginTop: "1rem" }} onSubmit={handleGoalSubmit}>
                <label htmlFor="description">Student Goal</label>
                <textarea
                  value={addGoalInput}
                  name="description"
                  placeholder="Goal description"
                  onChange={(e) => {
                    setAddGoalInput(e.target.value);
                  }}
                  className={$Iep.addGoalFormTextArea}
                />
                <Grid container justifyContent="space-between" marginTop={1}>
                  <Grid item>
                    <button
                      className={$button.secondary}
                      onClick={cancelAddGoal}
                    >
                      Cancel
                    </button>
                  </Grid>
                  <Grid item>
                    <button className={$button.default} type="submit">
                      Save
                    </button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          )}
        </Grid>
      )}
      {/* No Goal in DB yet */}
      {goals?.length == 0 && !showAddGoalForm && (
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
            <button onClick={revealAddGoalForm} className={$button.default}>
              Add Goal
            </button>
          </Box>
        </Container>
      )}
    </Stack>
  );
};
export default Iep;
