import { trpc } from "@/client/lib/trpc";
import Goal from "@/components/goal/Goal";
import $button from "@/styles/Button.module.css";
import $input from "@/styles/Input.module.css";
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

interface IepProps {
  iep_id: string;
}

const Iep = ({ iep_id }: IepProps) => {
  const utils = trpc.useContext();

  const { data: goals, isLoading } = trpc.iep.getGoals.useQuery(
    { iep_id: iep_id },
    { enabled: Boolean(iep_id) }
  );

  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [addGoalInput, setAddGoalInput] = useState("");

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
    <Stack sx={{ width: 1 }}>
      <Container>
        <Box className={$Iep.goalBox}>
          <p className={$Iep.goalTab}>Goals &#40;{goals?.length ?? 0}&#41;</p>
          {/* adding new goals // TODO: extract this content elsewhere */}
          {/* <form
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
            
            <button type="submit" className={$Iep.addGoalButton}>
              Add Goal
            </button>
          </form> */}
          {!showAddGoalForm && (
            <button onClick={revealAddGoalForm} className={$Iep.addGoalButton}>
              Add Goal
            </button>
          )}
        </Box>
      </Container>

      {/* List of goals */}
      {(goals || showAddGoalForm) && (
        <Grid container className={$Iep.goalsContainer}>
          <Grid item md={showAddGoalForm ? 5 : 12}>
            <List>
              {goals?.map((goal) => (
                <ListItem key={goal.goal_id}>
                  <Goal goal={goal} />
                </ListItem>
              ))}
            </List>
          </Grid>
          {showAddGoalForm && (
            <Grid item className={$Iep.addGoalFormContainer} md={7}>
              <div className={$Iep.addGoalFormHeading}>Add IEP goal</div>
              <p>Enter the goal as it appears on the student’s IEP</p>
              <form onSubmit={handleGoalSubmit}>
                <label>Student Goal</label>
                <textarea
                  value={addGoalInput}
                  onChange={(e) => {
                    setAddGoalInput(e.target.value);
                  }}
                  className={$Iep.addGoalFormTextArea}
                />
                <button onClick={cancelAddGoal}>Cancel</button>
                <button
                  onClick={() => {
                    console.log(addGoalInput);
                  }}
                >
                  Save
                </button>
              </form>
            </Grid>
          )}
        </Grid>
      )}
      {/* No Goal in DB yet */}
      {!goals && !showAddGoalForm && (
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
