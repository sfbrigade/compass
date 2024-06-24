import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import $GoalPage from "@/styles/GoalPage.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import Link from "next/link";
import { GoalHeader } from "@/components/goal-header/goal-header";
import { Typography } from "@mui/material";
import Subgoals from "@/components/subgoal/Subgoal";

enum selectionValue {
  ALL,
  ACTIVE,
  COMPLETE,
  DRAFTS,
}

interface SelectableTabProps {
  text: string;
  value: selectionValue;
  handleSelect: (e: MouseEvent) => void;
  currentlySelected: selectionValue;
}

const SelectableTab = ({
  text,
  value,
  handleSelect,
  currentlySelected,
}: SelectableTabProps) => {
  return (
    <div
      className={`${$GoalPage.benchmarksTab}
        ${value === currentlySelected ? $GoalPage.benchmarksTabSelected : ""} `}
      onClick={(e) => {
        handleSelect(e);
      }}
    >
      {text}
    </div>
  );
};

const GoalPage = () => {
  const utils = trpc.useContext();

  const router = useRouter();
  const { goal_id } = router.query;

  const [editGoal, setEditGoal] = useState(false);
  const [editGoalInput, setEditGoalInput] = useState("");

  const [activeTab, setActiveTab] = useState<selectionValue>(
    selectionValue.ACTIVE
  );

  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: goal_id as string },
    { enabled: Boolean(goal_id) }
  );

  const { data: subgoals } = trpc.iep.getSubgoals.useQuery(
    { goal_id: goal_id as string },
    { enabled: Boolean(goal_id) }
  );

  const showEditGoal = () => {
    setEditGoal(true);
    setEditGoalInput(goal?.description || "");
  };

  // TODO: modify callbacks for toast notification
  const editMutation = trpc.iep.editGoal.useMutation({
    onSuccess: () => utils.iep.getGoal.invalidate(),
    onError: (err) => console.log({ err }),
  });

  const submitEditGoal = () => {
    editMutation.mutate({
      goal_id: goal_id as string,
      description: editGoalInput,
    });
    setEditGoal(false);
    setEditGoalInput("");
  };

  const cancelEditGoal = () => {
    setEditGoal(false);
    setEditGoalInput("");
  };

  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          {goal && (
            <GoalHeader
              name="[placeholder] 1st Goal"
              description={goal.description}
              createdAt={goal.created_at}
              goalId={goal.goal_id}
            />
          )}
        </Grid>
      </Grid>

      {/* Goal Description */}
      <Container className={$GoalPage.goalDescriptionContainer}>
        {!editGoal && (
          <>
            <p>{goal?.description}</p>
            <button
              className={$button.default}
              onClick={showEditGoal}
              style={{
                margin: "auto",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              Edit Goal
            </button>
          </>
        )}
        {editGoal && (
          <form style={{ marginTop: "1rem" }} onSubmit={submitEditGoal}>
            <textarea
              value={editGoalInput}
              name="description"
              onChange={(e) => {
                setEditGoalInput(e.target.value);
              }}
              className={$GoalPage.editGoalFormTextArea}
            />
            <Grid
              container
              justifyContent="space-around"
              marginY={2}
              md={6}
              marginX="auto"
            >
              <Grid item>
                <button className={$button.secondary} onClick={cancelEditGoal}>
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
        )}
      </Container>

      <Grid container justifyContent="space-between">
        <Grid item>
          <h2>Benchmarks</h2>
        </Grid>
      </Grid>

      {/* Benchmarks */}
      <Stack sx={{ width: 1 }}>
        {/* tabs */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          <Box className={$GoalPage.benchmarksBox} justifyContent="flex-start">
            <SelectableTab
              text="All"
              value={selectionValue.ALL}
              handleSelect={() => {
                setActiveTab(selectionValue.ALL);
              }}
              currentlySelected={activeTab}
            />
            <SelectableTab
              text="Active"
              value={selectionValue.ACTIVE}
              handleSelect={() => {
                setActiveTab(selectionValue.ACTIVE);
              }}
              currentlySelected={activeTab}
            />
            <SelectableTab
              text="Completed"
              value={selectionValue.COMPLETE}
              handleSelect={() => {
                setActiveTab(selectionValue.COMPLETE);
              }}
              currentlySelected={activeTab}
            />
            <SelectableTab
              text="Drafts"
              value={selectionValue.DRAFTS}
              handleSelect={() => {
                setActiveTab(selectionValue.DRAFTS);
              }}
              currentlySelected={activeTab}
            />
          </Box>
          <br />
          <Box>
            <Link className={$button.default} href={`${router.asPath}/create`}>
              Add benchmark
            </Link>
          </Box>
        </Box>
        {/* TODO: Populate Benchmarks container */}
        <Grid container className={$GoalPage.benchmarksContainer}>
          <Grid sx={{ width: "100%", background: "white" }} item>
            {subgoals?.length === 0 ? (
              <Grid
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                item
              >
                <svg
                  width="112"
                  height="89"
                  viewBox="0 0 112 89"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M107.156 88.2206H16.0609C15.0293 88.2195 14.0403 87.8092 13.3108 87.0797C12.5814 86.3503 12.1711 85.3612 12.1699 84.3296V16.3519C12.1711 15.3203 12.5814 14.3313 13.3108 13.6019C14.0403 12.8724 15.0293 12.4621 16.0609 12.4609H107.156C108.187 12.4621 109.176 12.8724 109.906 13.6019C110.635 14.3313 111.045 15.3203 111.047 16.3519V84.3296C111.045 85.3612 110.635 86.3503 109.906 87.0797C109.176 87.8092 108.187 88.2195 107.156 88.2206ZM16.0609 12.9187C15.1507 12.9197 14.278 13.2818 13.6344 13.9254C12.9908 14.569 12.6287 15.4417 12.6277 16.3519V84.3296C12.6287 85.2399 12.9908 86.1125 13.6344 86.7562C14.278 87.3998 15.1507 87.7618 16.0609 87.7629H107.156C108.066 87.7618 108.939 87.3998 109.582 86.7562C110.226 86.1125 110.588 85.2399 110.589 84.3296V16.3519C110.588 15.4417 110.226 14.569 109.582 13.9254C108.939 13.2818 108.066 12.9197 107.156 12.9187H16.0609Z"
                    fill="#080155"
                  />
                  <path
                    d="M13.7705 26.4238C20.8493 26.4238 26.5878 20.6852 26.5878 13.6064C26.5878 6.52759 20.8493 0.789062 13.7705 0.789062C6.69165 0.789062 0.953125 6.52759 0.953125 13.6064C0.953125 20.6852 6.69165 26.4238 13.7705 26.4238Z"
                    fill="#20159E"
                  />
                  <path
                    d="M12.4971 18.498C12.2087 18.4986 11.928 18.4053 11.6973 18.2324L11.683 18.2216L8.6708 15.9154C8.5313 15.8085 8.41423 15.6752 8.32625 15.5231C8.23828 15.3709 8.18112 15.203 8.15806 15.0287C8.13499 14.8545 8.14648 14.6775 8.19184 14.5077C8.23721 14.3379 8.31557 14.1787 8.42246 14.0392C8.52934 13.8997 8.66265 13.7826 8.81478 13.6947C8.96692 13.6067 9.13489 13.5495 9.30911 13.5265C9.48333 13.5034 9.66039 13.5149 9.83017 13.5603C9.99996 13.6056 10.1591 13.684 10.2986 13.7909L12.2497 15.2869L16.8603 9.27395C16.9673 9.13448 17.1006 9.01745 17.2528 8.92952C17.405 8.8416 17.5729 8.78451 17.7472 8.76151C17.9214 8.73851 18.0984 8.75005 18.2682 8.79548C18.438 8.84091 18.5971 8.91933 18.7366 9.02627L18.7079 9.0652L18.7373 9.02684C19.0187 9.24304 19.2027 9.56202 19.2492 9.91377C19.2956 10.2655 19.2006 10.6213 18.985 10.9031L13.5618 17.9758C13.4364 18.1388 13.2751 18.2707 13.0904 18.3612C12.9058 18.4518 12.7028 18.4986 12.4971 18.498Z"
                    fill="white"
                  />
                </svg>
                <h1 style={{ fontWeight: "bold", fontSize: "18px" }}>
                  No benchmarks yet
                </h1>
                <span style={{ marginBottom: "6px" }}>
                  Create student benchmarks to start tracking their goals
                </span>
                <Box>
                  <Link
                    className={$button.default}
                    href={`${router.asPath}/create`}
                  >
                    Add benchmark
                  </Link>
                </Box>
              </Grid>
            ) : (
              <>
                {(() => {
                  const tabMapping = {
                    [selectionValue.ALL]: {
                      status: "All",
                      message: "No benchmarks",
                    },
                    [selectionValue.ACTIVE]: {
                      status: "In Progress",
                      message: "No active benchmarks",
                    },
                    //Status text must match the status in the database
                    [selectionValue.COMPLETE]: {
                      status: "Complete",
                      message: "No completed benchmarks",
                    },
                    [selectionValue.DRAFTS]: {
                      status: "Draft",
                      message: "No drafts",
                    },
                  };

                  const { status, message } = tabMapping[activeTab];

                  const filteredSubgoals =
                    (status === "All"
                      ? subgoals
                      : subgoals?.filter(
                          (subgoal) => subgoal.status === status
                        )) || [];
                  return filteredSubgoals.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      {message}
                    </Typography>
                  ) : (
                    filteredSubgoals.map((subgoal) => (
                      <Subgoals key={subgoal.subgoal_id} subgoal={subgoal} />
                    ))
                  );
                })()}
              </>
            )}
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default GoalPage;
