import { trpc } from "@/client/lib/trpc";
import Goals from "@/components/goal/Goal";

import {
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

import Image from "next/image";
import noGoals from "../../public/img/no-goals-icon.png";
import $Iep from "./Iep.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

import Button from "@/components/design_system/button/Button";

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
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Goals ({goals?.length ?? 0})</Typography>
        {!showAddGoalForm && (
          <Button onClick={revealAddGoalForm}>Add Goal</Button>
        )}
      </Stack>

      <Card>
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
                      await router.push(
                        `${router.asPath}/goals/${goal.goal_id}`
                      );
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
                      <Button variant="secondary" onClick={cancelAddGoal}>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button type="submit">Save</Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            )}
          </Grid>
        )}
        {/* No Goal in DB yet */}
        {goals?.length == 0 && !showAddGoalForm && (
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <Image
                src={noGoals}
                alt="No goals image"
                style={{ maxWidth: "260px", height: "auto" }}
              />
              <Typography variant="h3">No goals yet</Typography>
              <Typography variant="body1">
                Start adding goals to set up your student&#39;s profile
              </Typography>
              <Button onClick={revealAddGoalForm}>Add Goal</Button>
            </Stack>
          </CardContent>
        )}
      </Card>
    </Stack>
  );
};

export default Iep;
