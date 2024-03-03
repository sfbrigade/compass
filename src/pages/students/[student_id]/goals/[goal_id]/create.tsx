import { trpc } from "@/client/lib/trpc";
import { GoalHeader } from "@/components/goal-header/goal-header";
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import $button from "@/components/design_system/button/Button.module.css";

const CreateBenchmarkPage = () => {
  const router = useRouter();
  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: router.query.goal_id as string },
    { enabled: Boolean(router.query.goal_id) }
  );

  return (
    <Stack component="form" bgcolor="white">
      <Box p={4}>
        {goal && (
          <GoalHeader
            name="[placeholder] 1st Goal"
            description={goal.description}
            createdAt={goal.created_at}
            goalId={goal.goal_id}
          />
        )}
      </Box>

      <Divider />

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={4}
      >
        <Stack spacing={4} p={3} pr={0}>
          <Typography variant="h4">Benchmark</Typography>
          <TextField label="Name" helperText="Maximum 30 characters" required />
          <TextField label="Description" multiline required minRows={3} />

          <Stack spacing={2}>
            <Typography variant="h4">Metrics</Typography>
            <Stack direction="row" spacing={4}>
              <Stack direction="row" alignItems="center">
                <TextField label="Target Level" required type="number" />
                <Typography ml={1}>%</Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <TextField label="Baseline Level" required type="number" />
                <Typography ml={1}>%</Typography>
              </Stack>
              <TextField label="Metric to track" />
            </Stack>
          </Stack>
        </Stack>

        <Stack spacing={4} p={3} pl={0} flexGrow={1}>
          <Typography variant="h4">Details</Typography>
          <TextField multiline label="Materials" minRows={3} />
          <TextField multiline label="Instructions" minRows={3} />
        </Stack>
      </Stack>

      <Divider />

      <Stack direction="row" spacing={2} p={4} justifyContent="space-between">
        <button
          type="reset"
          onClick={router.back}
          className={$button.secondary}
        >
          Cancel
        </button>
        <button type="submit" className={$button.default}>
          Create
        </button>
      </Stack>
    </Stack>
  );
};

export default CreateBenchmarkPage;
