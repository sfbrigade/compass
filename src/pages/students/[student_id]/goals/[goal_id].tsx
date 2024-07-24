import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import $GoalPage from "@/styles/GoalPage.module.css";
import BenchmarksContainer from "@/components/benchmarks/BenchmarksContainer";
import BenchmarkGoalHeader from "@/components/benchmarks/BenchmarkGoalHeader";
enum selectionValue {
  ALL,
  COMPLETE,
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
  const router = useRouter();
  const goal_id = (router.query?.goal_id as string) || "";
  const student_id = (router.query?.student_id as string) || "";
  const { data: activeIep } = trpc.student.getActiveStudentIep.useQuery(
    { student_id: student_id },
    { enabled: Boolean(student_id), retry: false }
  );
  const { data: goals = [] } = trpc.iep.getGoals.useQuery({
    iep_id: activeIep?.iep_id || "",
  });

  const {
    data: goal = {
      goal_id: "",
      iep_id: null,
      created_at: new Date(),
      description: "",
      category: "",
    },
  } = trpc.iep.getGoal.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

  const { data: subgoals } = trpc.iep.getSubgoals.useQuery(
    { goal_id: goal_id },
    { enabled: Boolean(goal_id) }
  );

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
      {/* Goal Description */}
      {/* Need to pass entire array of goals as a prop in order to properly get index */}
      <BenchmarkGoalHeader goal_id={goal_id} goal={goal} goals={goals} />
      {/* Subgoals */}
      <Grid container justifyContent="space-between">
        <Grid item>
          <h2>Benchmarks</h2>
        </Grid>
      </Grid>
      <BenchmarksContainer subgoals={subgoals || []} />
    </Stack>
  );
};

export default GoalPage;
